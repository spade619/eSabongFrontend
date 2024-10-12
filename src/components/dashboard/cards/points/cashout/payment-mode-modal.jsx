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
import React, { useState } from "react";
import toast from "react-hot-toast";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { saveUserDetails } from "../../../../../redux/slices/users";

const PaymentModeModal = () => {
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const storeUsers = useSelector((state) => state.users);

   // are you sure modal
   const [centredModalSavePayMode, setCentredModalSavePayMode] = useState(false);
   const toggleShowSavePayMode = (e) => {
         e.preventDefault()
       setCentredModalSavePayMode(!centredModalSavePayMode)
  }

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  const toggleShow = () => setCentredModal(!centredModal);

  const handleSubmit = async (e) => {
    setCentredModalSavePayMode(!centredModalSavePayMode)
    const toastId = toast.loading("Loading...");
    e.preventDefault();

    const { payment_mode, account_name, account_number, additional_details } =
      e.target;

    try {
      const response = await dispatch(
        saveUserDetails({
          user_id: auth.user.id,
          payment_mode: payment_mode.value,
          account_name: account_name.value,
          account_number: account_number.value,
          additional_account_details: additional_details.value,
        })
      );

      if (response.type === "auth/saveUserDetails/fulfilled") {
        toast.success(`Payment Mode Created`, {
          id: toastId,
          duration: 4000,
        });
        document.getElementById("myForm").reset();
        setCentredModal(false);
      } else {
        toast.error("Payment Mode Failed To Create", {
          id: toastId,
          duration: 4000,
        });
        document.getElementById("myForm").reset();
        setCentredModal(false);
      }
    } catch (err) {
      console.log(err);
      document.getElementById("myForm").reset();
      toast.error("Payment Mode Failed To Create", {
        id: toastId,
        duration: 4000,
      });
    }
  };

  return (
    <>
      <span className="text-primary fw-bold" onClick={toggleShow} role="button">
        Click Here
      </span>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBContainer fluid className="px-3 py-3 pmf-header">
              <div className="pmf-title">
                <MDBIcon fas icon="plus" />
                &nbsp;&nbsp;EDIT PAYMENT MODE
              </div>
              <div className="pmf-sub">
                Edit your wallet details htmlFor a faster cashout request, you
                can enter a maximum of 5 wallet account.
              </div>
            </MDBContainer>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer fluid className="p-0 ">
                  <MDBContainer fluid className="p-3 pmf-body">
                    <form
                      id="myForm"
                      onSubmit={handleSubmit}
                      autoComplete="off"
                    >
                      <div className="mb-4 position-relative">
                        <MDBIcon fas icon="wallet" className="pmf-input-icon" />
                        <input
                          type="text"
                          className="form-control pmf-input pmf-input-text shadow-0"
                          name="payment_mode"
                          defaultValue={storeUsers.findUserDetails.paymentMode}
                          placeholder="Enter Your Payment Mode"
                        />
                        {/* <select
                          className="form-select pmf-input pmf-input-select shadow-0"
                          name="payment_mode"
                        >
                          <option defaultValue="" selected disabled>
                            Select Payment Mode
                          </option>
                          {paymentModeOptions.map((_, i) =>
                            storeUsers.findUserDetails.paymentMode ===
                            _.value ? (
                              <option key={i} value={_.value} selected>
                                {_.label}
                              </option>
                            ) : (
                              <option key={i} value={_.value}>
                                {_.label}
                              </option>
                            )
                          )}
                        </select> */}
                      </div>
                      <div className="mb-4 position-relative">
                        <MDBIcon
                          fas
                          icon="user-alt"
                          className="pmf-input-icon"
                        />
                        <input
                          type="text"
                          className="form-control pmf-input pmf-input-text shadow-0"
                          name="account_name"
                          defaultValue={storeUsers.findUserDetails.accountName}
                          placeholder="Account Name"
                        />
                      </div>
                      <div className="mb-4 position-relative">
                        <MDBIcon
                          fas
                          icon="university"
                          className="pmf-input-icon"
                        />
                        <input
                          type="text"
                          className="form-control pmf-input pmf-input-text shadow-0"
                          placeholder="Account Number"
                          name="account_number"
                          defaultValue={
                            storeUsers.findUserDetails.accountNumber
                          }
                        />
                      </div>
                      <div className="mb-4 position-relative">
                        <MDBIcon
                          fas
                          icon="file-signature"
                          className="pmf-input-icon"
                        />
                        <textarea
                          className="form-control pmf-input pmf-input-textarea shadow-0"
                          rows="3"
                          placeholder="Additional Details (Optional)"
                          defaultValue={
                            storeUsers.findUserDetails.additionalAccountDetails
                          }
                          name="additional_details"
                        ></textarea>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <MDBBtn color="warning" className="fw-bold"
                          onClick={toggleShowSavePayMode }
                        >
                          <MDBIcon far icon="save" />
                          &nbsp;&nbsp;SAVE PAYMENT MODE
                        </MDBBtn>

                        
                           {/* cofirmation modal */}
       <MDBModal tabIndex='-1' show={centredModalSavePayMode} setShow={setCentredModalSavePayMode}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle id='confirmSave'> <MDBIcon fas icon="cogs" className="pe-3"/> Are you sure you want to save changes?</MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleShowSavePayMode }></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4'>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleShowSavePayMode }>No</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      {/* ------------------------------------------------------------------------------------- */}

                      </div>
                    </form>
                  </MDBContainer>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PaymentModeModal;
