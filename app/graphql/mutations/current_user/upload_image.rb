# frozen_string_literal: true

module Mutations
  module CurrentUser
    class UploadImage < BaseMutation
      argument :image, ApolloUploadServer::Upload, required: true

      field :success, Boolean, null: false

      def resolve(image:)
        blob = ActiveStorage::Blob.create_and_upload!(
          io:           image,
          filename:     image.original_filename,
          content_type: image.content_type
        )
        context[:current_user].image.attach(blob)
        { success: true }
      rescue StandardError
        { success: false }
      end
    end
  end
end
