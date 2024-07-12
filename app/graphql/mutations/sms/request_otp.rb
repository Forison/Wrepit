module Mutations
  module Sms
    class RequestOtp < BaseMutation
      argument :phone, String, required: true

      field :success, Boolean, null: false

      def resolve(phone)
        otp_service = ::Sms::OtpService.new(phone)
        code = otp_service.send_otp
        expires_at = Time.current + 3.hours

        Otp.create(user_id: context[:current_user].id, code:, expires_at:) if code
        { success: true }
      rescue StandardError
        { success: false }
      end
    end
  end
end
