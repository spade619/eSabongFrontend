// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";

// ** Components
// import ArenaBettingTime from "./timer";
import SidePanelPayout from "./payout";
import SidePanelBets from "./bets";

const ArenaSidePanel = () => {
  return (
    <MDBCol className="arena-panel-wrapper">
      <MDBContainer fluid className="py-4 px-3 arena-panel-container">
        {/* <ArenaBettingTime /> */}
        <MDBContainer fluid className="px-0 text-center">
          {/* <MDBBtn color="success" className="fs-5 px-5 py-1 mb-2">
            OPEN
          </MDBBtn> */}
        </MDBContainer>
        <SidePanelPayout />
        <SidePanelBets />
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaSidePanel;
