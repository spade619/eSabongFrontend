// ** React
import { useEffect } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";
import TransferPointsForm from "./form";
import TransferPointsLogsTable from "./table";

// ** Redux
import { useDispatch } from "react-redux";
import { FIND } from "../../../../../redux/slices/users";

const TransferPoints = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FIND());
  }, []);

  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="SUPER ADMIN / Transfer Points" />
      <MDBContainer fluid className="px-0 mt-2">
        <MDBRow className="mx-0">
          <MDBCol xxl={5} xl={5} lg={6}>
            <TransferPointsForm />
          </MDBCol>
          <MDBCol xxl={7} xl={7} lg={6}>
            <TransferPointsLogsTable />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
};

export default TransferPoints;
