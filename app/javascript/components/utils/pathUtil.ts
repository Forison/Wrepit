import { useLocation } from "react-router-dom"

export const isProfilePage = (): boolean => {
  if (window.location.href.includes('/profile')) {
    return true
  }
  return false
}

export const isSignUpPage = (): boolean => {
  if (window.location.href.includes('/register')) {
    return true
  }
  return false
}

export const getToken = (): string => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const token = params.get('token')
  return token
}

export const clearUrl = (): void => {
  const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname
  window.history.replaceState({ path: newUrl }, '', newUrl)
}

export const routeMiddleware = (userStatus: boolean): void => {
  if (!userStatus) window.location.replace('log_in')
}
