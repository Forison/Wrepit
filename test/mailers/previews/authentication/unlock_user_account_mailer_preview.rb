# frozen_string_literal: true

require 'factory_bot_rails'

# preview email: http://localhost:5000/rails/test/mailers/previews/authentication/confirm_user_account_preview/unlock
module Authentication
  class UnlockUserAccountMailerPreview < ActionMailer::Preview
    include FactoryBot::Syntax::Methods

    def unlock
      user = create(:user, :with_unlock_user_token)
      Authentication::UnlockUserAccountMailer.with(user:).unlock
    end
  end
end
