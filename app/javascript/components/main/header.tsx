import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'
import AccountMenu from './AccountMenu'
import { isProfilePage, routeMiddleware } from '../utils/pathUtil'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT_USER } from '../api/mutations'

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

const Header = () => {
  const [logout] = useMutation(LOGOUT_USER, { onCompleted: () => { window.location.replace('/log_in') } })
  return (
    <HeaderContainer>
      <img src={require('../images/logo.png')} alt='Wrepit Company Logo' />
      <Nav>
        {isProfilePage() ?
          <NavLink onClick={() => logout(({ variables: { email: logoutEmail } }))}>
            Logout
          </NavLink> : (
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
              <AccountMenu />
            </>
          )}
      </Nav>
    </HeaderContainer >
  )
}

export default Header
