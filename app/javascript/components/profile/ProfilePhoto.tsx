import React from 'react'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import { Box, Grid, Typography } from '@mui/material'
import ImageOrInitial from '../shared/ImageOrInitial'
import ImageUploadModal from './ImageUploadModal'

interface Props {
  imageUrl?: string
  firstName: string
  fullName: string
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export default function ProfilePhoto({ imageUrl, firstName, fullName }: Props): JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Box sx={{ marginTop: '20px' }}>
          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <ImageOrInitial
                name={firstName}
                imageUrl={imageUrl}
                sx={{ bgcolor: '#5bbff1', width: '180px', height: '180px' }}
              />
            </StyledBadge>
          </Stack>
          <Typography
            sx={{
              marginTop: '40px',
              margin: '40px 0 0 35px',
              fontSize: '20px',
              color: '#FFF'
            }}
          >
            {fullName}
          </Typography>
          <ImageUploadModal />
        </Box>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  )
}
