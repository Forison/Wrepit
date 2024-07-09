# frozen_string_literal: true

module AuthenticationHelper
  def authentication_url(email_type:, token:)
    "http://localhost:5000/#{email_type}/?token=#{token}"
  end
end
