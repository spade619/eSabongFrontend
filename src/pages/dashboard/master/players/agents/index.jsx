import { MDBContainer } from "mdb-react-ui-kit";
import React from "react";
// import PlayersAgentHeader from "../../../../../components/dashboard/cards/players/header/agent";
import GoldListHeader from "../../../../../components/dashboard/cards/agent-gold-list-header"
// import PlayerAgentsTable from "../../../../../components/dashboard/cards/players/tables/agent";
import GoldAgentsLists from "../../../../../components/dashboard/cards/tables/agent-gold-list";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

const MasterAgents = () => {
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="PLAYERS / Agents" />
      <MDBContainer fluid className="px-0 mt-2">
        {/* <PlayersAgentHeader /> */}
        {/* <PlayerAgentsTable /> */}
        <GoldListHeader/>
        <GoldAgentsLists/>

      </MDBContainer>
    </MDBContainer>
  );
};

export default MasterAgents;
