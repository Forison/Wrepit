import React from "react";
import styled from "styled-components";

const FeaturesContainer = styled.section`
  padding: 100px 200px;
  background-color: #f5f5f5;
  display: flex;
  background-color: #5bbff1;
  justify-content: space-between;
`;

const Feature = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  width: 40%;
`;

const FeatureRight = styled(Feature)`
  background-color: white;
  padding: 30px;
`;

const FeaturesSection = () => {
  return (
    <FeaturesContainer id="features">
      <Feature>
        <h3>Pay on Your Terms, Wrepit</h3>
        <ul>
          <li>Unexpected Service Bill?</li>
          <li>Refreshing your tabletop?</li>
          <li>Choose to pay your food provider monthly instead of weekly?</li>
          <li>Wrap all your vendor expenses into one monthly invoice?</li>
          <li>Realize an instant ROI on new equipment?</li>
        </ul>
      </Feature>
      <FeatureRight>
        <h3>Foodservice Veterans</h3>
        <p>Wrepit seeks to democratize lending...</p>
      </FeatureRight>
    </FeaturesContainer>
  );
};

export default FeaturesSection;
