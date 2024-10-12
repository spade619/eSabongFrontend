import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import AgentSubListHeader from "../../../../../components/dashboard/cards/agent-sub-list-header";
import AgentSubListTable from "../../../../../components/dashboard/cards/tables/agent-sub-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const FinMasterAgent = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="AGENTS / Master Agent" />
      <AgentSubListHeader />
      <AgentSubListTable />
    </MDBContainer>
  );
};

export default FinMasterAgent;
