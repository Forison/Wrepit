# frozen_string_literal: true

module Authentication
  class UnlockUserAccountMailer < ApplicationMailer
    def unlock
      @user = params[:user]
      @account_unlock_url = authentication_url(email_type: 'unlock_account', token: @user.unlock_token)
      mail(
        to:      @user.email,
        subject: 'Unlock Account',
        date:    Time.zone.now
      )
    end
  end
end
