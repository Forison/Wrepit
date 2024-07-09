import React, { SyntheticEvent, useState } from 'react'
import { Tabs, Tab, Box, Typography, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import EditProfile from './EditProfile'
import ProfilePhoto from './ProfilePhoto'
import Header from '../main/header'
import PrivacyAndSecirity from './PrivacyAndSecurity'
import TermsAndCondition from './TermsAndConditions'
import Loading from '../shared/Loading'
import { CURRENT_USER } from '../api/queries'
import { isProfilePage, routeMiddleware } from '../utils/pathUtil'
import PhoneVerification from '../main/PhoneVerification'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default function ProfileWrapper(): JSX.Element {
  const [value, setValue] = useState(0)
  const { data, loading } = useQuery(CURRENT_USER, {
    pollInterval: isProfilePage() ? 500 : 0
  })
  routeMiddleware(!!data.currentUser)
  const handleChange = (event: SyntheticEvent, newValue: number) => setValue(newValue)

  if (loading) return <Loading />
  // TODO: NEED A better 

  return (
    <>
      <Box sx={{ marginTop: '100px' }}>
        <Grid container spacing={2}>
          <Header />
          <Grid
            item xs={12}
            sm={3}
            md={5}
            sx={{
              height: '100vh',
              backgroundColor: '#000'
            }}>
            <ProfilePhoto
              imageUrl={data?.currentUser.imageUrl}
              firstName={data?.currentUser.firstName}
              fullName={data?.currentUser.fullName}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={7}>
            <Box sx={{ width: '100%' }}>
              <Box>
                <Tabs value={value} onChange={handleChange}>
                  <Tab label='Profile' />
                  <Tab label='Privacy & Security' />
                  <Tab label='Terms & Condition' />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <EditProfile user={data?.currentUser} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <PrivacyAndSecirity />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <TermsAndCondition />
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box >
      <PhoneVerification />
    </>
  )
}
