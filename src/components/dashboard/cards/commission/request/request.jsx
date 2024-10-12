// ** React
import { useEffect } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { ME, findUserDetails } from "../../../../../redux/slices/users";
import { Toaster } from "react-hot-toast";

// ** Components
import RequestCashoutModal from "./request-cashout-modal";

const AgentRequestCashout = () => {
  const dispatch = useDispatch();

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));
  const storeUsers = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(ME(auth.user.id));
    dispatch(findUserDetails(auth.user.id));
  }, []);

  return (
    <MDBCol className="comms-req-wrapper p-2 mb-3">
      <Toaster />
      <MDBContainer fluid className="p-3 comms-req-container">
        <MDBContainer fluid className="px-0 comms-req-header pt-2 pb-3">
          <span>
            <MDBIcon fas icon="print" />
            &nbsp;&nbsp;REQUEST COMMISSION
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 comms-req-body">
          <MDBContainer className="px-0 text-center comms-req-body-panel py-4 my-3">
            <span>
              Your Commission Balance <br /> {storeUsers.me.commision}
            </span>
          </MDBContainer>
          <div>
            {/* <MDBBtn className="comms-req-button px-5 mb-3" block>
              Request Cashout
            </MDBBtn> */}
            <RequestCashoutModal
              disabled={storeUsers.findUserDetails.length !== 0 ? false : true}
            />
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentRequestCashout;
