// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Component
import CopyToClipboardButton from "../copy-to-clipboard-button";

const AgentReferralCard = () => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  return (
    <MDBCol className="arg-wrapper">
      <MDBContainer fluid className="px-0 arg-container">
        <MDBContainer
          fluid
          className="p-3 arg-header d-flex align-items-center"
        >
          <MDBIcon fas icon="exclamation-triangle" size="2x" className="me-3" />
          <div className="flex-grow-1 px-3 py-2">
            Please take notes of your referral link below, All players that will
            register under this link will automatically be under your account.
          </div>
        </MDBContainer>
        <MDBContainer fluid className="px-0 arg-body">
          <MDBContainer fluid className="py-3">
            <MDBRow className="mx-0">
              <MDBCol xxl={2} xl={3} lg={4} md={5} className="mb-3">
                <span className="arg-body-title">
                  <MDBIcon fas icon="user-friends" />
                  &nbsp;&nbsp;REFERRAL LINK
                </span>
              </MDBCol>
              <MDBCol xxl={10} xl={9} lg={8} md={7}>
                <MDBContainer className="arg-body-link mb-3 py-2 text-truncate">
                  {`${window.location.origin}/registration?uid=${auth.user.id}`}
                </MDBContainer>
                <MDBContainer className="text-center">
                  <CopyToClipboardButton
                    text={`${window.location.origin}/registration?uid=${auth.user.id}`}
                    successText="Text copied!"
                    buttonText="COPY LINK"
                  />
                  {/* <MDBBtn>
                    <MDBIcon far icon="copy" />
                    &nbsp;&nbsp;Copy Link
                  </MDBBtn> */}
                </MDBContainer>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentReferralCard;
