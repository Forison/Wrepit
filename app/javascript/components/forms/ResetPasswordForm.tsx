import React, { useState } from 'react'
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
import { ResetPasswordSchema } from '../schema'
import { RESET_PASSWORD } from '../api/mutations'
import { useMutation } from '@apollo/client'
import { clearUrl, getToken } from '../utils/pathUtil'
import Banner from '../shared/Banner'

interface PasswordProp {
  password: string
  passwordConfirmation: string
}
const initialValues = {
  password: '',
  PasswordConfirmation: ''
}

export default function ResetPasswordForm(): JSX.Element {
  const [level, setLevel] = useState({ color: '', label: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
  const [message, setMessage] = useState<string>()
  const [severity, setSeverity] = useState(null)
  const token = getToken()
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted: (data) => {
      if (!!data) {
        setSeverity('success')
        setMessage('Your Password was successfully reset, enjoy your WREPIT experience')
      }
    },
    onError: () => {
      console.log("hello world")
      setSeverity('error')
      setMessage('Sorry, password reset failed, please try again')
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation)
  }

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setLevel(strengthColor(temp))
  }

  const handleSubmit = (event) => {
    resetPassword({
      variables: {
        password: event.password,
        resetPasswordToken: token
      }
    })

    if (severity === 'success') {
      setTimeout(() => {
        window.location.replace('/home')
      }, 2000)
    }
  }

  clearUrl()
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={ResetPasswordSchema}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <>
          {message && (<Banner severity={severity} message={message} withCloseIcon />)}
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='password-Reset'>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    onBlur={handleBlur}
                    placeholder='Enter password'
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
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='password-confirmation'>Comfirm Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                    id='passwordConfirmation'
                    type={showPasswordConfirmation ? 'text' : 'password'}
                    value={values.passwordConfirmation}
                    name='passwordConfirmation'
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPasswordConfirmation}
                          edge='end'
                          color='secondary'
                        >
                          {showPasswordConfirmation ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder='Enter password Confirmation'
                  />
                </Stack>
                {touched.passwordConfirmation && typeof errors.passwordConfirmation === 'string' && (
                  <FormHelperText error id='helper-text-passwordConfirmation-signup'>
                    {errors.passwordConfirmation}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  disableElevation
                  disabled={loading}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  sx={{
                    background: '#5bbff1',
                    color: '#FFF'
                  }}
                >
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Formik>
  )
}
