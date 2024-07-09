import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Stack, Typography } from '@mui/material'
import AuthWrapper from '../shared/AuthWrapper'
import LoginForm from '../forms/LoginForm'

export default function Login(): JSX.Element {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h6'>Login</Typography>
            <Typography component={Link} to='/register' variant='body1' sx={{ textDecoration: 'none' }} color='primary'>
              Don't have an account?
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <LoginForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}
