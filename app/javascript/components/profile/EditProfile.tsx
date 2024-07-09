import React, { useState } from 'react'
import { Formik } from 'formik'
import { useMutation } from '@apollo/client'
import { User } from '../interface/index'
import EditUserForm from '../forms/EditUserForm'
import { UserUpdateSchema } from '../schema'
import Banner from '../shared/Banner'
import { UPDATE_USER } from '../api/mutations'

interface Props {
  user: User
  showAuth: boolean
}

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

export default function EditProfile({ user }): JSX.Element {
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState(null)
  const [mutate] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      if (!!data) {
        setSeverity('success')
        setMessage('Account was successfully updated, a confirmation link was sent to your email')
      }
    },
    onError: () => {
      setSeverity('error')
      setMessage('Sorry, account update was unsuccessful')
    }
  })

  const handleSubmit = (event: User) => {
    mutate({
      variables: {
        firstName: event.firstName,
        lastName: event.lastName,
        image: event.imageUrl,
        email: event.email,
        phone: event.phone,
      }
    })
  }

  return (
    <>
      {message && <Banner severity={severity} message={message} />}
      <br />
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={initial}
        validationSchema={UserUpdateSchema}
      >
        <EditUserForm initialValues={user} />
      </Formik>
    </>
  )
}
