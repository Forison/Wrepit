import { gql } from '@apollo/client'

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(input: {email: $email}){
      success
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $email: String,
    $phone: String,
    $firstName: String,
    $lastName: String,
  ) {
    updateUser(
      input: {
        email: $email,
        phone: $phone,
        lastName: $lastName,
        firstName: $firstName,
      }
    ){
      success
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SigninUser(
    $email: String!,
    $password: String!,
  ) {
    signinUser(
      input: {
        email: $email,
        password: $password,
      }
    ){
      success
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!,
    $password: String!,
    $phone: String!,
    $firstName: String!,
    $lastName: String!,
  ) {
    registerUser(
      input: {
        email: $email,
        password: $password,
        phone: $phone,
        lastName: $lastName,
        firstName: $firstName,
      }
    ){
      success
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser($email: String!) {
    logoutUser(input: {email: $email}){
      success
    }
  }
`;

export const CONFIRM_USER = gql`
  mutation ConfirmUser($confirmationToken: String!) {
    confirmUser(
      input: {
        confirmationToken: $confirmationToken,
      }
    ){
      success
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $resetPasswordToken: String!,
    $password: String!
  ) {
      resetPassword(input: {
        resetPasswordToken: $resetPasswordToken,
        password: $password
      }){
        success
      }
    }
`;

export const SEND_VERIFICATION_CODE = gql`
  mutation RequestOtp($phone: String!) {
    requestOtp(input: {phone: $phone}){
      success
    }
  }
`;

export const VERIFY_CODE = gql`
 mutation VerifyOtp($code: String!) {
    verifyOtp(input: {code: $otpCode}){
      success
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($image: Upload!) {
    uploadImage(input: {image: $image}){
      success
    }
  }
`;
