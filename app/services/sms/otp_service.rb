module Sms
  class OtpService
    def initialize(phone)
      @phone = phone
      @client = Twilio::REST::Client.new
    end

    def send_otp
      otp_code = generate_otp
      @client.messages.create(
        from: ENV['TWILIO_PHONE_NUMBER'],
        to:   @phone[:phone],
        body: "Your OTP code is #{otp_code}, This token will expire after 3 hours"
      )
      otp_code
    end

    private

    def generate_otp
      rand(100_000..999_999).to_s
    end
  end
end
