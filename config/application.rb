# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Wrepit
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1
    if Rails.env.development? || Rails.env.test?
      Dotenv::Railtie.load
    end
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    # config.action_cable.mount_path = '/cable'
    # config.middleware.use ApolloUploadServer::Middleware
    # TODO: CSRF token fails when set to true even when set at the controller level. Further investigations needed for this
    config.action_controller.allow_forgery_protection = false
  end
end
