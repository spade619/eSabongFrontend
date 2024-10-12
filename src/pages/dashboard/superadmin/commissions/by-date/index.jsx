// ** Third Party Components
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";

// ** React
import { useEffect } from "react";

// ** Utils
import { sumArray } from "../../../../../utility/utils";

// ** Components
import CommsByDateCard from "../../../../../components/dashboard/cards/comms-by-date";
import CommsByDateHeader from "../../../../../components/dashboard/cards/comms-by-date-header";
import CommsByDateTable from "../../../../../components/dashboard/cards/tables/comms-by-date";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  agentCommission,
  regularCommission,
  grossCommision,
  companyCommissions,
  drawCommission,
} from "../../../../../redux/slices/commissionHistory";
import { findAdmin } from "../../../../../redux/slices/users";

const CommssionByDate = () => {
  const dispatch = useDispatch();

  // ** States
  const storeCommissionHistory = useSelector(
    (state) => state.commissionHistory
  );
  const storeUser = useSelector((state) => state.users);

  // ** Counts
  const agentComms = storeCommissionHistory?.agentCommission?.map((e) =>
    Number(e.commision)
  );

  const regularComms = storeCommissionHistory?.regularCommission?.map((e) =>
    Number(e.commision)
  );

  const grossComms = storeCommissionHistory?.grossCommision?.map((e) =>
    Number(e.commision)
  );

  const drawComms = storeCommissionHistory?.drawCommission?.map((e) =>
    Number(e.commision)
  );

  useEffect(() => {
    dispatch(findAdmin());

    if (storeUser.findAdmin.id) {
      dispatch(agentCommission(storeUser.findAdmin.id));
      dispatch(regularCommission(storeUser.findAdmin.id));
      dispatch(grossCommision(storeUser.findAdmin.id));
      dispatch(companyCommissions(storeUser.findAdmin.id));
      dispatch(drawCommission(storeUser.findAdmin.id));
    }
  }, [storeUser.findAdmin.length]);

  console.log(storeUser.findAdmin);
  return (
    <MDBContainer fluid className="px-0 pb-3 dashboard-bg">
      <DashboardTopNavigation title="COMMISSIONS / Commission By Date" />
      <MDBRow className="mx-0">
        <CommsByDateCard
          xxl={6}
          xl={6}
          lg={8}
          md={8}
          sm={12}
          size={12}
          title="Company Commissions"
          sub="Net Company Commission"
          icon="building"
          value={(
            Math.round(
              (storeCommissionHistory.companyCommissions?.commision || 0) * 100
            ) / 100
          ).toFixed(2)}
        />

        <CommsByDateCard
          title="Regular Commissions"
          sub="This is the Commission Earned from Meron / Wala Bets"
          icon="box"
          value={(Math.round(sumArray(regularComms) * 100) / 100).toFixed(2)}
        />
        <CommsByDateCard
          title="Draw Commissions"
          sub="This is Commission Earned from Draw Bets"
          icon="box-open"
          value={(Math.round(sumArray(drawComms) * 100) / 100).toFixed(2)}
        />
        <CommsByDateCard
          title="Gross Commissions"
          sub="This is the sum of Regular and Draw Commission"
          icon="gem"
          value={(Math.round(sumArray(grossComms) * 100) / 100).toFixed(2)}
        />

        <CommsByDateCard
          title="Agent Commissions"
          sub="Agent Commission from Player Bets"
          icon="user-tie"
          value={(Math.round(sumArray(agentComms) * 100) / 100).toFixed(2)}
        />
      </MDBRow>
      <CommsByDateHeader />
      <CommsByDateTable />
    </MDBContainer>
  );
};

export default CommssionByDate;
