import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { findUserDetails } from "../../../../../redux/slices/users";

const RequestDetailsModal = (item) => {
  // ** Vars
  const dispatch = useDispatch();
  const storeUsers = useSelector((state) => state.users);

  // ** States
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => {
    if (!centredModal) {
      dispatch(findUserDetails(item.data.user_id.id));
    }
    setCentredModal(!centredModal);
  };

  return (
    <>
      {/* <div
        onClick={toggleShow}
        className="coreq-process text-truncate"
        role="button"
      >
        <MDBIcon fas icon="cogs" /> PROCESS
      </div> */}

      <div className="coreq-view" role="button" onClick={toggleShow}>
        <MDBIcon fas icon="eye" className="text-white" />{" "}
        <span className="text-dark">VIEW</span>
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> REQUEST DETAILS
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="py-4 coreq-modal-panel">
                  {!storeUsers.isLoading ? (
                    <>
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Username:</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">{item.data.user_id.username}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Status</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">{item.data.status}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Amount</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">{item.data.amount}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Processed By</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">Unassigned</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Payment Mode</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">
                            {" "}
                            {storeUsers.findUserDetails.paymentMode}{" "}
                          </p>
                        </div>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Account Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">
                            {" "}
                            {storeUsers.findUserDetails.accountName}{" "}
                          </p>
                        </div>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Account Number</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">
                            {" "}
                            {storeUsers.findUserDetails.accountNumber}{" "}
                          </p>
                        </div>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">
                            Account <br></br>Addtional Details
                          </p>
                        </div>
                        <div className="col-sm-9">
                          <p className="mb-0">
                            {" "}
                            {
                              storeUsers.findUserDetails
                                .additionalAccountDetails
                            }{" "}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default RequestDetailsModal;
