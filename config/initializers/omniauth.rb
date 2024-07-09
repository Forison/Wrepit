# frozen_string_literal: true

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :developer unless Rails.env.production?
  provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET'], {
    scope: 'email, profile',
    image_aspect_ratio: 'square',
    image_size: 50,
    provider_ignores_state: true,
    prompt: 'select_account consent',
    callback_path: '/auth/google_oauth2/callback'
  }
end
