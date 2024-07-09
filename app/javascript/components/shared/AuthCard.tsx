import React from 'react'
import Box from '@mui/material/Box'
import MainCard from './MainCard'

interface Props {
  children: JSX.Element
  // TODO: Remove any type from interface
  other?: any
}
export default function AuthCard({ children, ...other }: Props): JSX.Element {
  return (
    <MainCard
      sx={{ maxWidth: { xs: 400, lg: 475 }, margin: { xs: 2.5, md: 3 }, '& > *': { flexGrow: 1, flexBasis: '50%' } }}
      content={false}
      {...other}
      border={false}
      boxShadow
      shadow={(theme) => theme.customShadows.z1}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  )
}
