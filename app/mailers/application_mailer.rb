# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  include AuthenticationHelper
  default from: 'forison6205@gmail.com'
  layout 'mailer'
end
