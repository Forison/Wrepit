import React, { useState } from 'react'
import { Link as RouterLink, redirect } from 'react-router-dom'
import { Formik } from 'formik'
import EyeOutlined from '@ant-design/icons/EyeOutlined'
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined'
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material'
import Omniauth from '../shared/OmniAuth'
import { LoginSchema } from '../schema'
import { useMutation } from '@apollo/client'
import Banner from '../shared/Banner'
import { SIGNIN_USER } from '../api/mutations'


const initialValues = {
  email: '',
  password: ''
}

interface SignInProps {
  email: string
  password: string
}


export default function LoginForm(): JSX.Element {
  const [checked, setChecked] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState(null)
  const [login, { loading }] = useMutation(SIGNIN_USER, {
    onCompleted: () => {
      window.location.replace('/home')
    },
    onError: () => {
      setTimeout(() => {
        setSeverity('error')
        setMessage('Sorry, login was unsuccessful, please try again')
      }, 20000);
    }
  })


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const handleSubmit = (event: SignInProps) => {

    try {
      login({
        variables: {
          email: event.email,
          password: event.password,
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={LoginSchema}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <>{message && <Banner severity={severity} message={message} />}
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='email'>Email Address</InputLabel>
                  <OutlinedInput
                    id='email'
                    type='email'
                    value={values.email}
                    name='email'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Enter email'
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                </Stack>
                {touched.email && typeof errors.email === 'string' && (
                  <FormHelperText error id='standard-weight-helper-text-email'>
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                {touched.password && typeof errors.password === 'string' && (
                  <FormHelperText error id='standard-weight-helper-text-password'>
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name='checked'
                        color='primary'
                        size='small'
                      />
                    }
                    label={<Typography>Keep me sign in</Typography>}
                  />
                  <Typography component={RouterLink} to='/forgot_password' variant='body2' sx={{ textDecoration: 'none' }} color='primary'>
                    Forgot Password?
                  </Typography>
                </Stack>
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
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Omniauth title="Login with" />
              </Grid>
            </Grid>
          </form>
        </>
      )}
    </Formik>
  )
}
