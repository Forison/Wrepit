# frozen_string_literal: true

module Types
  class OtpType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, Integer, null: false
    field :code, String
    field :expires_at, GraphQL::Types::ISO8601DateTime
  end
end
