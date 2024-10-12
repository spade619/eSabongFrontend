import { MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect } from "react";

// ** Components
import TopPointsTable from "../../../../../components/dashboard/cards/tables/top-points";
import TopPointsHeader from "../../../../../components/dashboard/cards/top-points-header";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { FIND as USERS } from "../../../../../redux/slices/users";

const TopPoints = () => {
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(USERS("?_sort=points:DESC"));
  }, []);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="MONITORING / Top Points" />
      <TopPointsHeader />
      <TopPointsTable data={storeUsers.users} loading={storeUsers.isLoading} />
    </MDBContainer>
  );
};

export default TopPoints;
