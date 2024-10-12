// ** React
import { useEffect } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { ME, findUserDetails } from "../../../../../redux/slices/users";
import { Toaster } from "react-hot-toast";

// ** Components
import PaymentModeModal from "./payment-mode-modal";
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
    <MDBCol className="arc-wrapper p-2 mb-3">
      <Toaster />
      <MDBContainer fluid className="p-3 arc-container">
        <MDBContainer fluid className="px-0 arc-header pt-2 pb-3">
          <span>
            <MDBIcon fas icon="print" />
            &nbsp;&nbsp;REQUEST CASHOUT
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 arc-body">
          <MDBContainer className="px-0 text-center arc-body-panel py-4 my-3">
            <span>
              Your Wallet Balance <br /> {storeUsers.me.points}
            </span>
          </MDBContainer>
          <div>
            {/* <MDBBtn className="arc-button px-5 mb-3" block>
              Request Cashout
            </MDBBtn> */}
            <RequestCashoutModal
              disabled={storeUsers.findUserDetails.length !== 0 ? false : true}
            />
          </div>

          <div className="arc-body-text">
            Edit your payment mode.
            <PaymentModeModal />
          </div>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentRequestCashout;
