import React, { useState } from 'react'
import { Formik } from 'formik'
import Banner from '../shared/Banner'
import { Box, Modal } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { PhoneNumberVerificationSchema } from '../schema'
import { SEND_VERIFICATION_CODE, VERIFY_CODE } from '../api/mutations'
import VerifyPhoneNumberForm from '../forms/VerifyPhoneForm'
import { CURRENT_USER } from '../api/queries'
import Loading from '../shared/Loading'
import SendPhoneVerificationForm from '../forms/SendPhoneVerificationForm'


interface VerificationProp {
  code: string
}

const initialValues = {
  code: ''
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '5px solid #5bbff1',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
}


export default function PhoneVerification(): JSX.Element {
  const [view, setView] = useState<string>('sendOtp')
  const [_, setOpen] = useState(false)
  const [message, setMessage] = useState<string>()
  const { data, loading } = useQuery(CURRENT_USER)
  const [severity, setSeverity] = useState(null)
  const [verifyCode] = useMutation(VERIFY_CODE, {
    onCompleted: (data) => {
      if (!!data) {
        setSeverity('success')
        setMessage('Phone verification was successful, enjoy your WREPIT experience')
        setTimeout(() => {
          setView('')
          setOpen(false)
        }, 5000)
      }
    },
    onError: () => {
      setSeverity('error')
      setMessage('Sorry, phone verification was unsuccessful')
    }
  })

  const [sendVerificationCode] = useMutation(SEND_VERIFICATION_CODE, {
    onCompleted: (data) => {
      if (!!data) {
        setSeverity('success')
        setMessage('A code has been sent to your number, use the code to verify your phone number')
        setTimeout(() => {
          setView('verifyPhone')
        }, 5000)
      }
    },
    onError: () => {
      setSeverity('error')
      setMessage('Sorry, OTP request failed, please try again')
    }
  })

  const requestOtp = () => {
    sendVerificationCode({ variables: { phone: data.currentUser.phone } })
  }

  const verifyOtp = (event: VerificationProp) => {
    verifyCode({ variables: { email: event.code } })
  }

  if (loading) return <Loading />

  return (
    <Modal
      open={data.currentUser.verified ? false : true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {message && <Banner severity={severity} message={message} />}
        <br />
        {view === 'sendOtp' ?
          <Formik
            onSubmit={requestOtp}
            initialValues={initialValues}
          >
            <SendPhoneVerificationForm phone={data.currentUser.phone} />
          </Formik >
          :
          <Formik
            onSubmit={verifyOtp}
            validationSchema={PhoneNumberVerificationSchema}
            initialValues={initialValues}
          >
            <VerifyPhoneNumberForm />
          </Formik >
        }
      </Box>
    </Modal>
  )
}
