module Mutations
  module Sms
    class RequestOtp < BaseMutation
      argument :phone_number, String, required: true

      field :success, Boolean, null: false

      def resolve(phone_number:)
        otp_service = ::Sms::OtpService.new(phone_number:)
        code = otp_service.send_otp
        expires_at = Time.current + 3.hours
        context[:current_user].otp.create(code:, expires_at:) if code
        { success: true }
      rescue StandardError
        { success: false }
      end
    end
  end
end
