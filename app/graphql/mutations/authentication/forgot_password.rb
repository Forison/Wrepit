# frozen_string_literal: true

module Mutations
  module Authentication
    class ForgotPassword < BaseMutation
      argument :email, String, required: true

      field :success, Boolean, null: false
      def resolve(email:)
        user = User.find_by(email:)
        raise GraphQL::ExecutionError, 'Email not found' if user.nil?

        user.update(
          reset_password_token:   Jwt::Encoder.new(email:).call,
          reset_password_sent_at: Time.zone.now,
          allow_password_change:  true
        )
        ::Authentication::ForgotPasswordMailer.with(user:).change_password_request.deliver_later
        { success: true }
      rescue StandardError
        { success: false }
      end
    end
  end
end
