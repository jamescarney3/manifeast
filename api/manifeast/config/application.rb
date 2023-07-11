require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true

    # not thrilled that I can't seem to handle this in the "session_store"
    # initializer because ...it doesn't work, or seem to do much of anything
    # really - need to look into further because this almost defintiely
    # belongs in an initializer
    # see: https://github.com/waiting-for-dev/devise-jwt/issues/235
    # update: this is why - https://guides.rubyonrails.org/api_app.html#using-session-middlewares
    # config.session_store :cookie_store, key: '_manifeast_session'
    # config.action_dispatch.cookies_same_site_protection = :none
    # config.middleware.use ActionDispatch::Cookies
    # config.middleware.use ActionDispatch::Session::CookieStore
    # config.middleware.use config.session_store, config.session_options

    # for https in development, god willing
    # config.force_ssl=true
  end
end
