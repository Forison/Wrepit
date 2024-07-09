import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import GlobalStyles from './styles/GlobalStyles'
import Header from './header'
import HeroSection from './heroSection'
import FeaturesSection from './featureSection'
import HowItWorksSection from './howItWorkSection'
import TestimonialsSection from './testimonialsSection'
import ContactSection from './contactSection'
import Support from './support'
import Footer from './footer'
import { clearUrl, getToken } from '../utils/pathUtil'
import { CONFIRM_USER } from '../api/mutations'
import Banner from '../shared/Banner'
import PhoneVerification from '../main/PhoneVerification'

// import { Amplify } from 'aws-amplify'
// import { Authenticator } from '@aws-amplify/ui-react'
// import '@aws-amplify/ui-react/styles.css'
// import awsExports from './aws-exports'
// Amplify.configure({ ...awsExports, ssr: true })
// <Authenticator socialProviders={['google']}>
// </Authenticator>

export default function HomePage(): JSX.Element {
  const [message, setMessage] = useState<string>()
  const [severity, setSeverity] = useState(null)
  const [confirmUser] = useMutation(CONFIRM_USER, {
    onCompleted: (data) => {
      if (!!data) {
        setSeverity('success')
        setMessage('Your account has been confirmed, enjoy your WREPIT experience')
      }
    },
    onError: () => {
      setSeverity('error')
      setMessage('Sorry, account confirmation failed, please try again')
    }
  })


  if (getToken()) {
    confirmUser({
      variables: {
        confirmationToken: getToken()
      }
    })
    clearUrl()
  }

  return (
    <>
      {message &&
        <Banner
          severity={severity}
          message={message}
          sx={{ position: 'absolute', top: '11.5%', left: '30%' }}
          withCloseIcon
        />}
      <GlobalStyles />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Support />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />

      <PhoneVerification />
    </>
  )
}

