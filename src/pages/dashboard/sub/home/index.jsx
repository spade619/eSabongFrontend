import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect } from "react";

// ** Components
import AmountTableList from "../../../../components/dashboard/cards/agents/amount-list-table";
import CommissionWalletCard from "../../../../components/dashboard/cards/agents/commission-wallet-card";
import CurrentWalletCard from "../../../../components/dashboard/cards/agents/current-wallet-card";
import AgentReferralCard from "../../../../components/dashboard/cards/agents/referral-card";
import AgentReferralCardPlayer from "../../../../components/dashboard/cards/agents/referral-card-player";
import DashboardTopNavigation from "../../../../components/dashboard/topnav";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { ME } from "../../../../redux/slices/users";

const SubDashboard = () => {
  const dispatch = useDispatch();

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));
  const storeUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(ME(auth.user.id));
  }, []);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="DASHBOARD" />
      <MDBContainer fluid className="mt-2">
        <AgentReferralCard />
        <AgentReferralCardPlayer />
        <MDBRow className="mt-3">
          <CurrentWalletCard
            title="Current Wallet"
            points={storeUsers.me?.points || 0}
            icon="wallet"
          />
          <CommissionWalletCard
            title="Commission Wallet"
            points={storeUsers.me?.commision || 0}
            icon="percent"
          />
        </MDBRow>
        <AmountTableList />
      </MDBContainer>
    </MDBContainer>
  );
};

export default SubDashboard;
