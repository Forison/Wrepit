# frozen_string_literal: true

module Queries
  module User
    class CurrentUser < Queries::BaseQuery
      def resolve
        context[:current_user]
      end
    end
  end
end
