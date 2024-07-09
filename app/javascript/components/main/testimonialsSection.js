import React from "react";
import styled from "styled-components";

const TestimonialsContainer = styled.section`
  padding: 50px 200px;
`;

const Header = styled.div`
  padding-bottom: 50px;
  font-size: 50px;
  font-weight: bold;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Testimonial = styled.div`
  width: 25%;
  gap: 10%;
`;

const TestimonialsSection = () => {
  return (
    <TestimonialsContainer id="about">
      <Header> Satisfied Customers </Header>
      <Body>
        <Testimonial>
          Qahwah House ​ Expanding Concept which used Wrepit to ease the cash
          flow of multiple openings. They chose to give themselves a 5 month
          payback on their equipment package while opening two locations. They
          are now looking to include their monthly supplies which they currently
          pay at the time of purchase.
        </Testimonial>
        <Testimonial>
          Byrd's Hot Chicken Chose to include sign, general contractor, and
          fryer repair costs into an extended term payback while renovating a
          previous restaurant space.
        </Testimonial>
        <Testimonial>
          Food Hero New refrigeration for the coming season with extended terms
          which provided them flexibility to buy supplies they need for each
          season. Has since inquired about a monthly credit line to enhance
          their buying power.
        </Testimonial>
      </Body>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;
