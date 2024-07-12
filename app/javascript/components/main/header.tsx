import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'
import AccountMenu from './AccountMenu'
import { isProfilePage } from '../utils/pathUtil'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT_USER } from '../api/mutations'
import HomeIcon from '../shared/HomeIcon'

// TODO: FIND A WORK AROUND TO DO THIS WITHOUT ARGUMENT TO RESOLVER
const logoutEmail = 'foo@yahoo.com'

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 30px 0px;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:last-child{
    padding-right: 20px;
  }
  &:hover {
    color: pink;
  }
`;

interface Prop {
  showAccountMenu?: boolean
}

const Header = ({ showAccountMenu = false }: Prop) => {
  const [logout] = useMutation(LOGOUT_USER, { onCompleted: () => { window.location.replace('/log_in') } })
  return (
    <HeaderContainer>
      <img src={require('../images/logo.png')} alt='Wrepit Company Logo' />
      <Nav>
        {isProfilePage() ?
          <>
            <NavLink onClick={() => window.location.replace('/')}><HomeIcon /></NavLink>
            <NavLink onClick={() => logout(({ variables: { email: logoutEmail } }))}>
              Logout
            </NavLink>
          </>
          : (
            <>
              <NavLink to='home' smooth={true} duration={1000}>
                Home
              </NavLink>
              <NavLink to='features' smooth={true} duration={1000}>
                About Us
              </NavLink>
              <NavLink to='support' smooth={true} duration={1000}>
                Features
              </NavLink>
              <NavLink to='examples' smooth={true} duration={1000}>
                Examples
              </NavLink>
              <NavLink to='contact' smooth={true} duration={1000}>
                Contact
              </NavLink>
              {showAccountMenu ? <AccountMenu /> : <NavLink onClick={() => window.location.replace('log_in')}>Sign In </NavLink>}
            </>
          )}
      </Nav>
    </HeaderContainer >
  )
}

export default Header
