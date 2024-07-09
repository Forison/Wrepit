export interface Strength {
  label: string
  color: string
}

export interface User {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  passwordConfirmation?: string
  imageUrl?: string
  verified?: boolean
}