module Mutations
  module Sms
    class VerifyOtp < BaseMutation
      argument :code, String, required: true

      field :success, Boolean, null: false

      def resolve(code:)
        otp = Otp.where(code:, user_id: context[:current_user].id).last
        expires_at = Time.current - 2.days

        if otp && !otp.expired?
          context[:current_user].update(verified: true)
          otp.update(expires_at:)
          { success: true }
        else
          { success: false }
        end
      end
    end
  end
end
