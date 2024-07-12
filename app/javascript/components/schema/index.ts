import * as Yup from 'yup'

export const SignUpSchema =
  Yup.object().shape({
    firstName: Yup.string().max(15).required('First Name is required'),
    lastName: Yup.string().max(15).required('Last Name is required'),
    phone: Yup.string().max(15).required('Phone number is required'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().min(6, 'password is too short').max(255).required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password mismatch')
  })

export const UserUpdateSchema =
  Yup.object().shape({
    firstName: Yup.string().max(150).required('First Name is required'),
    lastName: Yup.string().max(150).required('Last Name is required'),
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  })

export const LoginSchema =
  Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().min(6, 'password is too short').max(255).required('Password is required'),
  })


export const ResetPasswordSchema =
  Yup.object().shape({
    password: Yup.string().min(6, 'password is too short').max(25).required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords mismatch')
  })


export const forgotPasswordSchema =
  Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
  })

export const PhoneNumberVerificationSchema =
  Yup.object().shape({
    code: Yup.string().min(4, 'code length does must more than four').max(6).required('Verification code is required'),
  })

