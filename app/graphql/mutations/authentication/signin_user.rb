# frozen_string_literal: true

module Mutations
  module Authentication
    class SigninUser < BaseMutation
      argument :email, String, required: true
      argument :password, String, required: true

      field :success, Boolean, null: false
      def resolve(email:, password:)
        user = User.find_by(email:)
        raise GraphQL::ExecutionError, 'Please create or confirm account' unless user

        lock_user(user) if user.reached_max_attempts_limit?

        if user&.authenticate(password) && !user.reached_max_attempts_limit?
          reset_login_attempt(user)
          context[:session][:user_id] = user.id
          { success: true }
        else
          user.update!(failed_attempts: user.failed_attempts += 1)
        end
      rescue StandardError
        { success: false }
      end

      private

      def lock_user(user)
        user.update(
          reset_password_token: Jwt::Encoder.new(user.email).call,
          locked_at:            Time.zone.now
        )

        ::Authentication::UserAccountMailer.with(user:).unlock_account.deliver_later
        raise GraphQL::ExecutionError,
              'Account has been block, a message has been sent to your email for recovery of account'
      end

      def unlock_lock_email(reset_password_token:)
        email = Jwt::Decoder.new(reset_password_token).call[:result]
        user = User.find_by(email:)
        raise GraphQL::ExecutionError, 'Invalid email' if user.nil?

        user.update(failed_attempts: 0, unlock_token: nil)
        user
      end

      def reset_login_attempt(user)
        return unless user.failed_attempts.positive?

        user.update!(failed_attempts: 0)
      end
    end
  end
end
