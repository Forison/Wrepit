# frozen_string_literal: true

module Mutations
  module CurrentUser
    class UpdateUser < BaseMutation
      argument :email, String, required: false
      argument :password, String, required: false
      argument :last_name, String, required: false
      argument :first_name, String, required: false
      argument :phone, String, required: false
      argument :image, String, required: false

      field :success, Boolean, null: false
      def resolve(args)
        context[:current_user].update(args)
        { success: true }
      rescue StandardError
        { success: false }
      end
    end
  end
end
