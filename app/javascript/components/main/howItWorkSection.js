import React from "react";
import styled from "styled-components";
import heading from "../images/heading.jpg"

const HowItWorksContainer = styled.section`
  padding: 50px 100px;
  background-color: #fff;
`;

const HowItWorks = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 100px 0;
`;

const WorkNote = styled.div`
  padding: 0 100px;
`;
const WorkNoteHeader = styled.p`
  font-size: 50px;
`;
const WorkNoteSemi = styled.p`
  font-size: 20px;
`;
const WorkNoteContent = styled.p``;
const Ads = styled.img`
  padding: 0 100px;
`;

const HowItWorksSection = () => {
  return (
    <HowItWorksContainer id="examples">
      <HowItWorks>
        <WorkNote>
          <WorkNoteHeader>How Wrepit Works</WorkNoteHeader>
          <WorkNoteSemi>Flexible Terms</WorkNoteSemi>
          <WorkNoteContent>
            Your bank account will be linked to the lender for repayment. The
            amount will be split equally every 30 days for the term chosen.
            There is no fee or balloon payment at the end of each month or term
            if payment is late. ​ ****All Payments will be made direct to the
            lender, Alternative.****
          </WorkNoteContent>
        </WorkNote>
        <Ads src={heading} alt="" />
      </HowItWorks>

      <HowItWorks>
        <Ads src={heading} alt="" />
        <WorkNote>
          <WorkNoteHeader>How Wrepit Works</WorkNoteHeader>
          <WorkNoteSemi>Flexible Terms</WorkNoteSemi>
          <WorkNoteContent>
            Your bank account will be linked to the lender for repayment. The
            amount will be split equally every 30 days for the term chosen.
            There is no fee or balloon payment at the end of each month or term
            if payment is late. ​ ****All Payments will be made direct to the
            lender, Alternative.****
          </WorkNoteContent>
        </WorkNote>
      </HowItWorks>
    </HowItWorksContainer>
  );
};

export default HowItWorksSection;
