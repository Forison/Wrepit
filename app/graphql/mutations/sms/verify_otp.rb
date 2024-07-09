module Mutations
  module Sms
    class VerifyOtp < BaseMutation
      argument :otp_code, String, required: true

      field :success, Boolean, null: false

      def resolve(otp_code:)
        otp = context[:current_user].otp.where(code: otp_code).last
        expires_at = Time.current - 2.days

        if otp && !otp.expired?
          user.update(verified: true)
          otp.update(expires_at:)
          { success: true }
        else
          { success: false }
        end
      end
    end
  end
end
