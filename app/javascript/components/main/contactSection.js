import React from "react";
import styled from "styled-components";

const ContactContainer = styled.section`
  padding: 50px;
  background-color: black;
  color: white;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 300px;
`;

const TextArea = styled.textarea`
  margin: 10px;
  padding: 10px;
  width: 300px;
  height: 100px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ContactSection = () => {
  return (
    <ContactContainer id="contact">
      <h2>For Any Assistance Required Please Reach Out</h2>
      <ContactForm>
        <Input type="text" placeholder="First Name" required />
        <Input type="text" placeholder="Last Name" required />
        <Input type="email" placeholder="Email" required />
        <TextArea placeholder="Leave us a message" required />
        <Button type="submit">Submit</Button>
      </ContactForm>
    </ContactContainer>
  );
};

export default ContactSection
