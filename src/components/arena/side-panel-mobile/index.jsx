// ** React
import React from "react";

// ** Third Party Components
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";

// ** Components
import SidePanelPayoutMobile from "./payout";
import SidePanelBetsMobile from "./bets";
import ArenaBalanceAmount from "../status/balance";

// ** Redux
// import { useSelector } from "react-redux";

const ArenaSidePanelMobile = () => {
  // ** Redux States
  // const storeUsers = useSelector((state) => state.users);


  return (
    <MDBCol className="arena-panel-wrapper">
      <MDBContainer fluid className="py-1 px-3 arena-panel-container">
        <SidePanelPayoutMobile />
       
        <SidePanelBetsMobile />
        <ArenaBalanceAmount  />
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaSidePanelMobile;
