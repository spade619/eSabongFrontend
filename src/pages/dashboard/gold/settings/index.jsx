import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import CreateUser from "../../../../components/dashboard/cards/create-user";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";

const GoldSettings = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="SETTINGS" />
      <CreateUser />
    </MDBContainer>
  );
};

export default GoldSettings;
