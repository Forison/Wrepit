import React from 'react'
import { Grid, Box } from '@mui/material'
import AuthCard from './AuthCard'
import Footer from './CopyRight'
import styled from 'styled-components'

interface Props {
  children: JSX.Element
}

const ImageContainer = styled.image`
  margin: 0 auto;
  position: absolute;
  left: 45%;
  top: 15px;
`;

export default function AuthWrapper({ children }: Props): JSX.Element {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid container direction='column' justifyContent='flex-end' sx={{ minHeight: '100vh' }}>
        <ImageContainer>
          <img
            src={require("../images/logo.png")}
          />
        </ImageContainer>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent='center'
            alignItems='center'
            sx={{ minHeight: { xs: 'calc(100vh - 210px)', sm: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
          >
            <Grid item>
              <AuthCard>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  )
}
