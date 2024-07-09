import { gql } from '@apollo/client'

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser{
      email
      firstName
      lastName
      phone
      imageUrl
      fullName
      verified
    }
  }
`;
