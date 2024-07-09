# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # Authentication related mutations
    field :register_user, Boolean, null: false, mutation: Mutations::Authentication::RegisterUser
    field :signin_user, Boolean, null: false, mutation: Mutations::Authentication::SigninUser
    field :confirm_user, Boolean, null: false, mutation: Mutations::Authentication::ConfirmUser
    field :reset_password, Boolean, null: false, mutation: Mutations::Authentication::ResetPassword
    field :forgot_password, Boolean, null: false, mutation: Mutations::Authentication::ForgotPassword
    field :logout_user, Boolean, null: false, mutation: Mutations::Authentication::LogoutUser

    # Logged-in User related mutations
    field :update_user, Boolean, null: false, mutation: Mutations::CurrentUser::UpdateUser
    field :upload_image, Boolean, null: false, mutation: Mutations::CurrentUser::UploadImage

    # sms related mutations
    field :request_otp, Boolean, null: false, mutation: Mutations::Sms::RequestOtp
    field :verify_otp, Boolean, null: false, mutation: Mutations::Sms::VerifyOtp
  end
end
