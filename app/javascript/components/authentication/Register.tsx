import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Stack, Typography } from '@mui/material'
import AuthWrapper from '../shared/AuthWrapper'
import RegisterForm from '../forms/RegisterForm'

export default function Register(): JSX.Element {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h6'>Sign up</Typography>
            <Typography component={Link} to='/log_in' sx={{ textDecoration: 'none', marginTop: '1rem' }} color='primary'>
              Already have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <RegisterForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}
