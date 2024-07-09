

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import HomePage from '../main/HomePage'
import ProfileWrapper from '../profile/ProfileWrapper'
import Login from '../authentication/Login'
import Register from '../authentication/Register'
import ResetPassword from '../authentication/ResetPassword'
import ForgotPassword from '../authentication/ForgotPassword'
import { CURRENT_USER } from '../api/queries'
import Loading from '../shared/Loading'

export default function Index(): JSX.Element {
  const { data, loading } = useQuery(CURRENT_USER)
  if (loading) return <Loading />
  const isAuthenticated = !!data.currentUser
  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/unlock_account/?token=:token' element={<ResetPassword />} />
          <Route path='/unlock_account' element={<ResetPassword />} />
          <Route path='/reset_password/reset/?token=:token' element={<ResetPassword />} />
          <Route path='/reset_password' element={<ResetPassword />} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/log_in' element={<Login />} />
          {/* protected routes */}
          <Route path='/home/?token=:token' element={<HomePage />} />
          <Route path='/home' element={!isAuthenticated ? <Login /> : <HomePage />} />
          <Route path='/Profile' element={!isAuthenticated ? <Login /> : <ProfileWrapper />} />
        </Routes>
      </Router>
    </>
  )
}
