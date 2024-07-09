# frozen_string_literal: true

module Mutations
  module Authentication
    class ResetPassword < BaseMutation
      argument :reset_password_token, String, required: true
      argument :password, String, required: true

      field :success, Boolean, null: false
      def resolve(reset_password_token:, password:)
        email = Jwt::Decoder.new(reset_password_token).call[:result]

        user = User.find_by(email:)

        raise GraphQL::ExecutionError, 'Email not found' if user.nil?

        context[:session][:user_id] = user.id
        user.update(
          password:,
          reset_password_token:  '',
          allow_password_change: false,
          failed_attempts:       0
        )
        { success: true }
      rescue StandardError
        { success: false }
      end
    end
  end
end
