# frozen_string_literal: true

module Mutations
  module Authentication
    class ConfirmUser < BaseMutation
      argument :confirmation_token, String, required: true

      field :success, Boolean, null: false
      def resolve(confirmation_token:)
        email = Jwt::Decoder.new(confirmation_token).call[:result]

        user = User.find_by(unconfirmed_email: email)

        raise GraphQL::ExecutionError, 'Email not found' if user.nil?

        context[:session][:user_id] = user.id
        user.update(
          email:,
          confirmed_at: Time.zone.now
        )
        { success: true }
      rescue StandardError
        { success: false }
      end
    end
  end
end
