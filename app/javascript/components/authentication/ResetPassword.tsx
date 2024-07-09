import React, { useState } from 'react'
import { Grid, Stack, Typography } from '@mui/material'
import AuthWrapper from '../shared/AuthWrapper'
import ResetPasswordForm from '../forms/ResetPasswordForm'

export default function ResetPassword(): JSX.Element {

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='space-between' alignItems='baseline' sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant='h6'>Reset Password</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ResetPasswordForm />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}
