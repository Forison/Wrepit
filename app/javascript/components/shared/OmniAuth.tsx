import React from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import {
  Grid,
  Divider,
  Typography,
  Button,
} from '@mui/material'

interface Prop {
  title: String
}


function OmniAuth({ title }: Prop): JSX.Element {

  const handleLogin = () => {
    fetch(`${process.env.BASE_URL}/auth/google_oauth2`, {
      method: 'POST',
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
      },
      body: ''
    })
  }

  const onError = (error) => { console.error('Hello I an error from Omniauth', error) }

  return (
    <Grid item xs={12}>
      <Divider>
        <Typography variant='caption'>{title}</Typography>
      </Divider>
      <Button fullWidth>
        <GoogleLogin
          text={'continue_with'}
          width={'100%'}
          size='large'
          onSuccess={handleLogin}
          onError={() => onError}
        />
      </Button>
    </Grid>
  )
}


export default function OmniAuthWrapper({ title }: Prop): JSX.Element {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <OmniAuth title={title} />
    </GoogleOAuthProvider>
  )
}