# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # User related queries
    field :current_user, Types::UserType, resolver: Queries::User::CurrentUser
  end
end
