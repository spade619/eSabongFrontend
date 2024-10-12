// ** React
import React, { useState } from "react";

// ** Third Party Components
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  cashoutRequest,
  myCashoutRequest,
} from "../../../../../redux/slices/cashout";
import { ME } from "../../../../../redux/slices/users";

const RequestCashoutModal = (data) => {
  const dispatch = useDispatch();
  const storeCashout = useSelector((state) => state.cashout);
  const [centredModal, setCentredModal] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);

  // are you sure modal
  const [centredModalSure, setCentredModalSure] = useState(false);
  const toggleShowSure = (e) => {
    e.preventDefault();
    setCentredModalSure(!centredModalSure);
  };

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleSubmit = async (e) => {
    setCentredModalSure(!centredModalSure);
    const toastId = toast.loading("Loading...");
    setDisableButton(true);
    e.preventDefault();

    const { amount } = e.target;
    if (amount.value) {
      const data = {
        status: "Pending",
        amount: amount.value,
        user_id: auth.user.id,
      };

      const response = await dispatch(cashoutRequest(data));

      dispatch(myCashoutRequest(auth.user.id));
      if (response.type === "cashout/cashoutRequest/fulfilled") {
        toast.success(`Cashout Successfully Request`, {
          id: toastId,
          duration: 4000,
        });
        dispatch(ME(auth.user.id));
        document.getElementById("myForm").reset();
        setCentredModal(false);
        setDisableButton(false);
      } else {
        toast.error("Cashout Failed To Request", {
          id: toastId,
          duration: 4000,
        });
        document.getElementById("myForm").reset();
        setCentredModal(false);
        setDisableButton(false);
      }
    } else {
      toast.error("Please enter your amount", {
        id: toastId,
        duration: 4000,
      });
      setDisableButton(false);
    }
  };

  return (
    <>
      <MDBBtn
        onClick={toggleShow}
        className="arc-button px-5 mb-3"
        disabled={data.disabled}
        block
      >
        Request Cashout
      </MDBBtn>
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="commswc-modal-body">
            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-5 d-flex align-items-center justify-content-between mt-3 mb-4"
              >
                <div className="commswc-modal-title">ENTER AMOUNT</div>
                <MDBIcon
                  onClick={toggleShow}
                  fas
                  icon="times"
                  className="text-warning commswc-modal-exit"
                  role="button"
                  size="2x"
                />
              </MDBContainer>
              <form id="myForm" onSubmit={handleSubmit} autoComplete="off">
                <div className="d-flex align-items-center commswc-form-container p-2 mx-5">
                  <div className="flex-grow-1">
                    <input
                      type="number"
                      name="amount"
                      step="any"
                      min="0"
                      className="form-control commswc-modal-input shadow-0"
                    />
                  </div>
                  {/* <MDBBtn className="commswc-modal-clear">
                    <MDBIcon fas icon="window-close" size="3x" />
                  </MDBBtn> */}
                </div>
                <MDBContainer fluid className="px-5 mt-4 text-center">
                  <MDBBtn
                    className="commswc-confirm-btn px-5"
                    onClick={toggleShowSure}
                    disabled={storeCashout.isLoading || disableButton}
                  >
                    <MDBIcon fas icon="check" />
                    &nbsp;&nbsp;CONFIRM
                  </MDBBtn>

                  {/* cofirmation modal */}
                  <MDBModal
                    tabIndex="-1"
                    show={centredModalSure}
                    setShow={setCentredModalSure}
                  >
                    <MDBModalDialog centered>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>
                            {" "}
                            <MDBIcon fas icon="cogs" className="pe-3" /> Are you
                            sure?
                          </MDBModalTitle>
                          <MDBBtn
                            type="button"
                            className="btn-close"
                            color="none"
                            onClick={toggleShowSure}
                          ></MDBBtn>
                        </MDBModalHeader>

                        <MDBModalFooter className="justify-content-center text-center pe-5">
                          <MDBBtn className="pe-5 ps-5 me-4">Yes</MDBBtn>
                          <MDBBtn
                            className="pe-5 ps-5 ms-4"
                            onClick={toggleShowSure}
                          >
                            No
                          </MDBBtn>
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>

                  {/* ------------------------------------------------------------------------------------- */}
                </MDBContainer>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default RequestCashoutModal;
