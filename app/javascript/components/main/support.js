import React from "react";
import styled from "styled-components";

const SupportDiv = styled.div`
  background-color: black;
  color: white;
  display: flex;
`;

const SupportHeader = styled(SupportDiv)`
  padding: 100px 200px;
  flex-direction: column;
`;

const SupportHeaderTitle = styled(SupportDiv)`
  font-size: 50px;
  font-weight: bold;
`;

const SupportHeaderContent = styled(SupportDiv)`
  font-size: 16px;
`;

const SupoortContent = styled(SupportDiv)`
  padding: 50px 200px;
  gap: 50px;
  justify-content: space-between;
`;

const Content = styled(SupportDiv)`
  padding-right: 50px;
  width: 15%;
`;

const Support = () => {
  return (
    <>
      <SupportHeader id="support">
        <SupportHeaderTitle> Security and Support </SupportHeaderTitle>
        <SupportHeaderContent>
          {" "}
          We along with our lending partner use the latest and most secure
          technology to ensure your data is not compromised.{" "}
        </SupportHeaderContent>
      </SupportHeader>
      <SupoortContent>
        <Content>
          <p>
            Wrepit provides fast and secure lending services to foodservice
            businesses. With our app, you can get your re payment flexibility
            from your regular vendors, cash and carry distributors, food
            providers, equipment repair services, and signage in just a few
            clicks.
          </p>
        </Content>
        <Content>
          <p>
            Our customer support team is available 24/7 to assist you with any
            questions or concerns you may have. We are committed to providing
            the best support to our customers.
          </p>
        </Content>
        <Content>
          <p>
            Wrepit uses bank-level security measures to protect your sensitive
            information. We take security seriously and are committed to
            providing a safe and secure platform for our customers.
          </p>
        </Content>
      </SupoortContent>
    </>
  );
};

export default Support;
