import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState } from "react";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { findUserDetails } from "../../../../../../redux/slices/users";

const PlayerProfileModal = (item) => {
 console.log('modal', item.data.data.username)
  // ** Vars
  const dispatch = useDispatch();
  const storeUsers = useSelector((state) => state.users);

  // ** States
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => {
    if (!centredModal) {
      dispatch(findUserDetails(item.data.data.id));
    }
    setCentredModal(!centredModal);
  };

  return (
    <>
      {/* <MDBBtn className="afl-btn afl-btn-1" onClick={toggleShow} role="button">
        <MDBIcon fas icon="user-tie" /> 
      </MDBBtn> */}
        <MDBBtn className="text-warning pat2r-btn shadow-0 me-2" onClick={toggleShow}>
           <MDBIcon fas icon="user-alt" size="xl" />
         </MDBBtn> 

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              Player PROFILE
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBIcon fas icon="user-circle" size="7x" />
              <MDBTypography tag="h1" className="mt-2 mb-1">
                {item.data.data.username}{" "}
              </MDBTypography>
              <p className="mb-4">{item.data.data.email}</p>
              <div className="d-flex justify-content-center mb-5">
                {/* {item.data.data.isActive ? (
                  <div className="afl-status-active m-1">
                    <MDBIcon fas icon="check-circle" />
                    &nbsp;&nbsp;Active
                  </div>
                ) : (
                  <div className="afl-status-blocked m-1">
                    <MDBIcon fas icon="minus-circle" />
                    &nbsp;&nbsp;Blocked
                  </div>
                )}
                {storeUsers.findUserDetails.length !== 0 ? (
                  <div className="afl-verification-verified m-1">
                    <MDBIcon fas icon="check" />
                    &nbsp;&nbsp;Verified
                  </div>
                ) : (
                  <div className="afl-verification-unverified m-1">
                    <MDBIcon fas icon="times" />
                    &nbsp;&nbsp;Unverified
                  </div>
                )} */}
                <div className="clt-assigned m-1">
                  <MDBIcon fas icon="user-alt" /> {item.data.data.role.name && item.data.data.role.name}
                </div>
              </div>

              <div className="row mb-4 justify-content-center">
                <div className="col-6">
                  <h6>
                    Points:{" "}
                    <small className="ml-2 small text-success">
                      {item.data.data.points}
                    </small>
                  </h6>
                </div>
                {/* <div className="col-6">
                  <h6>
                    Commision:{" "}
                    <small className="ml-2 small text-success">
                      {item.data.data.commision}
                    </small>
                  </h6>
                </div> */}
              </div>
              <hr className="hr" style={{ backgroundColor: "#fff" }} />
              <h6 className="text-muted">DETAILS</h6>
              <MDBContainer fluid className="p-3 variance-body w-50">
                <div className="variance-items">
                  <span>Mobile Number:</span>
                  <span>{item.data.data.phoneNumber}</span>
                </div>
                <div className="variance-items">
                  <span>Referrer:</span>
                  <span>{item.data.data.referrer?.username}</span>
                </div>
                <div className="variance-items">
                  <span>Country:</span>
                  <span>{item.data.data.country}</span>
                </div>
                <h6 className="text-muted my-1">PAYMENT MODE DETAILS</h6>
                {!storeUsers.isLoading ? (
                  <>
                    {storeUsers.findUserDetails.length !== 0 ? (
                      <>
                        <div className="variance-items">
                          <span>Payment Mode:</span>
                          <span>
                            {" "}
                            {storeUsers.findUserDetails.paymentMode ||
                              "---"}{" "}
                          </span>
                        </div>
                        <div className="variance-items">
                          <span>Account Name:</span>
                          <span>
                            {" "}
                            <span>
                              {" "}
                              {storeUsers.findUserDetails.accountName ||
                                "---"}{" "}
                            </span>
                          </span>
                        </div>
                        <div className="variance-items">
                          <span>Account Number:</span>
                          <span>
                            {" "}
                            <span>
                              {" "}
                              {storeUsers.findUserDetails.accountNumber ||
                                "---"}{" "}
                            </span>
                          </span>
                        </div>
                        <div className="variance-items">
                          <span>Account Addtional Details:</span>
                          <span>
                            {" "}
                            <span>
                              {" "}
                              {storeUsers.findUserDetails
                                .additionalAccountDetails || "---"}{" "}
                            </span>
                          </span>
                        </div>
                      </>
                    ) : (
                      <span className="mx-5">
                        <small>Payment mode is not setup.</small>
                      </span>
                    )}
                  </>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-grow" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PlayerProfileModal;
