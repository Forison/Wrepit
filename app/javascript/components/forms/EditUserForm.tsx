import React, { useEffect } from 'react'
import { useFormikContext } from 'formik'
import PhoneInput from 'react-phone-input-2'
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material'
import 'react-phone-input-2/lib/style.css'
import { User } from '../interface/index'


export default function EditUserForm({ initialValues }): JSX.Element {
  const {
    setValues,
    setFieldValue,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    isSubmitting
  } = useFormikContext<User>()

  useEffect(() => {
    // this step is neccessary to provide good user experience 
    setValues(initialValues)
  }, [])

  return (
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
              onChange={(e) => { setFieldValue('firstName', e.target.value) }}
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <InputLabel htmlFor='email'>Phone*</InputLabel>
            <PhoneInput
              country={'us'}
              regions={['north-america']}
              value={values.phone}
              onChange={handleChange}
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
          <Button
            disableElevation
            fullWidth
            disabled={isSubmitting}
            size='large'
            type='submit'
            variant='contained'
            sx={{
              background: '#5bbff1',
              color: '#FFF'
            }}
          >
            Update Account
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
