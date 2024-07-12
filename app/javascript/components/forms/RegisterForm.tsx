import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Formik } from 'formik'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Box,
} from '@mui/material'
import { strengthColor, strengthIndicator } from '../utils/passwordStrength'
import { SignUpSchema } from '../schema'
import Banner from '../shared/Banner'
import Omniauth from '../shared/OmniAuth'
import { User } from '../interface/index'
import { REGISTER_USER } from '../api/mutations'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  passwordConfirmation: ''
}

export default function UserForm(): JSX.Element {
  const [level, setLevel] = useState({ color: '', label: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState(null)
  const [register, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      if (!!data) {
        setSeverity('success')
        setMessage('Account was created successfully, a confirmation link was sent to your email')
      }
    },
    onError: () => {
      setSeverity('error')
      setMessage('Sorry, account creation was unsuccessful')
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const changePassword = (value: string): void => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  const handleSubmit = (event: User): void => {
    register({
      variables: {
        firstName: event.firstName,
        lastName: event.lastName,
        email: event.email,
        phone: event.phone,
        password: event.password,
      }
    })
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={SignUpSchema}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <>
          {message && <Banner severity={severity} message={message} />}
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='firstname'>First Name*</InputLabel>
                  <OutlinedInput
                    id='firstName'
                    type='firstName'
                    value={values.firstName}
                    name='firstName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={Boolean(touched.firstName && errors.firstName)}
                    placeholder='First Name'
                  />
                </Stack>
                {touched.firstName && typeof errors.firstName === 'string' && (
                  <FormHelperText error id='helper-text-firstname-signup'>{errors.firstName}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='lastName'>Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastName && errors.lastName)}
                    id='lastName'
                    type='lastName'
                    value={values.lastName}
                    name='lastName'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Last Name'
                  />
                </Stack>
                {touched.lastName && typeof errors.lastName === 'string' && (
                  <FormHelperText error id='helper-text-lastname-signup'>
                    {errors.lastName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='email'>Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id='email'
                    type='email'
                    value={values.email}
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Email'
                  />
                </Stack>
                {touched.email && typeof errors.email === 'string' && (
                  <FormHelperText error id='helper-text-email-signup'>
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='email'>Phone*</InputLabel>
                  <PhoneInput
                    country={'us'}
                    regions={['north-america']}
                    value={values.phone}
                    onChange={(phone) => setFieldValue('phone', phone)}
                    containerStyle={{ flex: 1 }}
                    inputStyle={{ width: '100%', height: '56px' }}
                    onBlur={handleBlur}
                    isValid={!Boolean(touched.phone && errors.phone)}
                    inputProps={{
                      name: 'phone',
                      id: 'phone',
                      require: true
                    }}
                  />
                </Stack>
                {touched.phone && typeof errors.phone === 'string' && (
                  <FormHelperText error id='helper-text-phone-signup'>
                    {errors.phone}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='password'>Password*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e)
                      changePassword(e.target.value)
                    }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          edge='end'
                          color='secondary'
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder='Enter password'
                  />
                </Stack>
                {values.password && (
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item>
                        <Box sx={{ bgcolor: level?.color, width: 200, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle1' fontSize='0.75rem'>
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </FormControl>

                )}
                {!values.password && touched.password && typeof errors.password === 'string' && (
                  <FormHelperText error id='helper-text-password-signup'>
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='password-confirmation'>Comfirm Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                    id='passwordConfirmation'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={values.passwordConfirmation}
                    name='passwordConfirmation'
                    onBlur={handleBlur}
                    onChange={(e) => { handleChange(e) }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowConfirmPassword}
                          edge='end'
                          color='secondary'
                        >
                          {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder='Enter password confirmation'
                  />
                </Stack>
                {touched.passwordConfirmation && typeof errors.passwordConfirmation === 'string' && (
                  <FormHelperText error id='helper-text-password-signup'>
                    {errors.passwordConfirmation}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  disableElevation
                  fullWidth
                  disabled={loading}
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{
                    background: '#5bbff1',
                    color: '#FFF'
                  }}
                >
                  Create Account
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Omniauth title="Sign up with" />
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Formik>
  )
}
