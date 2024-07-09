# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :password_digest, String, null: false
    field :reset_password_token, String
    field :reset_password_sent_at, GraphQL::Types::ISO8601DateTime
    field :allow_password_change, Boolean
    field :confirmation_token, String
    field :confirmed_at, GraphQL::Types::ISO8601DateTime
    field :confirmation_sent_at, GraphQL::Types::ISO8601DateTime
    field :unconfirmed_email, String
    field :failed_attempts, Integer, null: false
    field :unlock_token, String
    field :locked_at, GraphQL::Types::ISO8601DateTime
    field :last_name, String
    field :first_name, String
    field :email, String
    field :role, Integer, null: false
    field :tokens, GraphQL::Types::JSON
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :discarded, Boolean
    field :phone, String
    field :provider, String
    field :uid, String
    field :image_url, String, null: true
    field :full_name, String, null: true
    field :verified, Boolean, null: false

    def image_url
      return unless object.image.attached?

      Rails.application.routes.url_helpers.rails_blob_url(object.image, only_path: true)
    end

    delegate :full_name, to: :object
  end
end
