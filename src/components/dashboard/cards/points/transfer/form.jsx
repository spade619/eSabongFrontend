// ** React
import { useEffect, useState } from "react";
import Select from 'react-select'

// ** Third Party Components
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBTypography,
  MDBBtn,
  MDBSpinner,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";

// ** Style
import "./index.css";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { ME, FIND, findOne } from "../../../../../redux/slices/users";
import {
  transferUserPoints,
  myHistory,
} from "../../../../../redux/slices/transferPoints";

const AgentsTransferPointsForm = () => {
  const dispatch = useDispatch();
  // transfer modal pop up confirmation
  // const [transferAmount, setTransferAMount] = useState(false);
  const [transferData, setTransferData] = useState(false);
  const [centredModalTransfer, setCentredModalTransfer] = useState(false);
  const [selectedReciever, setSelectedReciever] = useState('')




 




  const toggleShowTransfer = (e) => {
    e.preventDefault(e);

    const { amount, receiver } = e.target;

    if (amount.value === "") {
      toast.error("Please enter your amount.");
      setTransferDisabled(false);
      return false;
    }

    // if (receiver.value === "") {
    //   toast.error("Please a select user.");
    //   setTransferDisabled(false);
    //   return false;
    // }

    if (selectedReciever === "") {
      toast.error("Please a select user.");
      setTransferDisabled(false);
      return false;
    }

    const isCSR = auth.user.role.type === "csr" ? "superadmin" : "agent";

    // const data = {
    //   amount: amount.value,
    //   sender_id: auth.user.id,
    //   receiver_id: receiver.value,
    //   credited_at: isCSR,
    // };

    const data = {
      amount: amount.value,
      sender_id: auth.user.id,
      receiver_id: selectedReciever.value,
      credited_at: isCSR,
    };

    setTransferData(data);
    setCentredModalTransfer(!centredModalTransfer);
  };

  // -------------------------------------------

  // React States
  const [transferDisabled, setTransferDisabled] = useState(false);

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  const storeUsers = useSelector((state) => state.users);

  const options = storeUsers.users.map((item) => ({
    value: item.id,
    label: item.username,
  }));


  
  const handleReciever = (selectedOption) => {
    setSelectedReciever(selectedOption)
    dispatch(findOne(selectedReciever || ""));
  }
 
  // const userToBeTransfered = (e) => {
  //   const { value } = e?.target;
  //   dispatch(findOne(value || ""));
  // };

  const handleTransfer = async (e) => {
   console.log('this is the reciever', selectedReciever)
    const toastId = toast.loading("Loading...");
    setTransferDisabled(true);
    // e.preventDefault();

    // const { amount, receiver } = e.target;

    if (transferData.amount === "") {
      toast.error("Please enter your amount.", {
        id: toastId,
      });
      setTransferDisabled(false);
      return false;
    }

    if (transferData.receiver_id === "") {
      toast.error("Please a select user.", {
        id: toastId,
      });
      setTransferDisabled(false);
      return false;
    }

    // const isCSR = auth.user.role.type === "csr" ? "superadmin" : "agent";

    // const data = {
    //   amount: amount.value,
    //   sender_id: auth.user.id,
    //   receiver_id: receiver.value,
    //   credited_at: isCSR,
    // };

    try {
      const result = await dispatch(transferUserPoints(transferData));
      if (result.type === "transferPoints/fulfilled") {
        toast.success(`Transfer Success`, {
          id: toastId,
          duration: 4000,
        });
        document.getElementById("myForm").reset();
        setTransferDisabled(false);
        setCentredModalTransfer(!centredModalTransfer);
        dispatch(findOne(""));
        dispatch(ME(auth.user.id));
        dispatch(myHistory(auth.user.id));
      } else {
        toast.error("Transfer failed", {
          id: toastId,
          duration: 4000,
        });
        setTransferDisabled(false);
        setCentredModalTransfer(!centredModalTransfer);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isAdmin =
    auth.user.role.type === "superadmin" || auth.user.role.type === "csr"
      ? ""
      : `?referrer=${auth.user.id}`;

  useEffect(() => {
    dispatch(ME(auth.user.id));
    dispatch(myHistory(auth.user.id));
    dispatch(FIND(isAdmin));
  }, []);



  return (
    <MDBCol className="atp-wrapper p-2 mb-3">
      <Toaster />
      <MDBContainer fluid className="p-0 atp-container">
        <MDBContainer fluid className="px-3 atp-header py-2">
          <span>
            <MDBIcon fas icon="exchange-alt" />
            &nbsp;&nbsp;TRANSFER POINTS FORM
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-0 atp-body">
          <div className="d-flex align-items-center justify-content-between px-3">
            <div className="atp-panel">
              <MDBTypography tag="p" className="m-0">
                Your Points
                <br />
                {storeUsers.meLoader ? (
                  <MDBSpinner grow role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  storeUsers.me.points || 0
                )}
              </MDBTypography>
            </div>
            <div className="atp-panel-arrow">
              <MDBIcon fas icon="arrow-right" size="2x" />
            </div>
            <div className="atp-panel">
              <MDBTypography tag="p" className="m-0">
                {storeUsers.findOne.username
                  ? storeUsers.findOne.username
                  : "Select A User"}{" "}
                <br />
                {storeUsers.findOneLoader ? (
                  <MDBSpinner grow role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  storeUsers.findOne.points || 0
                )}
              </MDBTypography>
            </div>
          </div>
          <form onSubmit={toggleShowTransfer} autoComplete="off" id="myForm">
            <div className="d-flex align-items-end mt-3 atp-footer pt-3 pb-4 px-3">
              <div className="flex-grow-1 me-2">
                {/* <small className="text-muted">What do you want to do?</small> */}
                {/* <select className="form-select atp-footer-select">
                <option value="">Send Points</option>
              </select> */}

                <small className="text-muted">
                  Enter Points To Be Transferred
                </small>
                <input
                  type="number"
                  placeholder="Amount"
                  name="amount"
                  step="any"
                  min="0"
                  className="form-control atp-footer-input"
                />
              </div>
              <div className="flex-grow-1">
                {/* <select
                  name="receiver"
                  className="form-select atp-footer-select"
                  onChange={userToBeTransfered}
                  disabled={storeUsers.isLoading}
                >
                  <option value="">Select User To Be Transferred</option>
                  {storeUsers.users.map(
                    (i, k) =>
                      auth.user.id !== i.id && (
                        <option key={k} value={i.id}>
                          {i.username}
                        </option>
                      )
                  )}
                </select> */}
                <Select className="text-dark" options={options} placeholder="Please Select User"  value={selectedReciever} onChange={handleReciever}/>
              </div>
            </div>
            <div className="d-flex align-items-center pb-4 px-3 text-center">
              <div className="flex-grow-1 ">
                {storeUsers.isLoading || transferDisabled ? (
                  <MDBBtn disabled className="atp-button">
                    <MDBSpinner
                      size="sm"
                      role="status"
                      tag="span"
                      className="me-2"
                    />
                    Loading...
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    className="atp-button px-5"
                    disabled={storeUsers.isLoading}
                  >
                    Transfer
                  </MDBBtn>
                )}
              </div>
            </div>
          </form>

          {/* Transfer Button cofirmation modal */}

          <MDBModal
            tabIndex="-1"
            show={centredModalTransfer}
            setShow={setCentredModalTransfer}
          >
            <MDBModalDialog centered size="lg">
              <MDBModalContent className="coreq-modal-body py-2">
                <MDBTypography
                  tag="h5"
                  className="text-start ms-5 pt-4 coreq-modal-title"
                >
                  <MDBIcon fas icon="cogs" /> ARE YOU SURE YOU WANT TO TRANSFER
                  FUNDS?
                </MDBTypography>
                <MDBBtn
                  color="tranparent"
                  onClick={() => setCentredModalTransfer(!centredModalTransfer)}
                  className="coreq-modal-close-btn shadow-0"
                >
                  <MDBIcon fas icon="times" size="2x" />
                </MDBBtn>

                <MDBModalBody>
                  <MDBContainer className="position-relative">
                    <MDBContainer className="pt-3 pb-5 coreq-modal-panel text-center">
                      <MDBTypography tag="h4">
                        {storeUsers.findOne?.username}
                      </MDBTypography>
                      <MDBTypography tag="h3">
                        {transferData?.amount}
                      </MDBTypography>
                    </MDBContainer>
                    <div className="coreq-modal-warning d-flex align-items-center justify-content-center">
                      <div className="coreq-modal-warning-icon">
                        <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                      </div>
                      <div className="coreq-modal-warning-label">
                        {`Approving this request will automatically generate a
                    WITHDRAW transaction for ${storeUsers.findOne?.username}
                    `}
                      </div>
                    </div>
                  </MDBContainer>
                  <MDBContainer className="d-flex align-items-center justify-content-between">
                    <MDBBtn
                      className="coreq-modal-approve"
                      onClick={() => handleTransfer()}
                    >
                      <MDBIcon fas icon="check" /> APPROVE
                    </MDBBtn>
                    <MDBBtn
                      className="coreq-modal-deny"
                      onClick={() =>
                        setCentredModalTransfer(!centredModalTransfer)
                      }
                    >
                      <MDBIcon fas icon="times" /> DENY
                    </MDBBtn>
                  </MDBContainer>
                </MDBModalBody>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
          {/* <MDBModal
            tabIndex="-1"
            show={centredModalTransfer}
            setShow={setCentredModalTransfer}
          >
            <MDBModalDialog centered>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>
                    {" "}
                    <MDBIcon
                      fas
                      icon="cogs"
                      className="pe-3 textConfirmation"
                    />{" "}
                    <h3 className="textConfirmation">
                      ARE YOU SURE YOU WANT TO TRANSFER FUNDS?
                    </h3>
                  </MDBModalTitle>
                  <MDBBtn
                    type="button"
                    className="btn-close"
                    color="none"
                    onClick={toggleShowTransfer}
                  ></MDBBtn>
                </MDBModalHeader>

                <MDBModalFooter className="justify-content-center text-center pe-5">
                  <MDBBtn className="pe-5 ps-5 me-4">Yes</MDBBtn>
                  <MDBBtn
                    className="pe-5 ps-5 ms-4"
                    onClick={toggleShowTransfer}
                  >
                    No
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal> */}
          {/* ------------------------------------------------------------ */}
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentsTransferPointsForm;
