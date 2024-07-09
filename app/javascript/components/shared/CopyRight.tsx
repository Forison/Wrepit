import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
`;

const Footer = (): JSX.Element => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Wrepit. All Rights Reserved.</p>
    </FooterContainer>
  )
}

export default Footer