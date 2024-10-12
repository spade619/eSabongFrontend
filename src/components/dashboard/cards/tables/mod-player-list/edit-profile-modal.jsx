// ** React
import { useState } from "react";

// ** Third Party Components
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBContainer,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBTypography,
  MDBInput,
} from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";

// ** Redux
import { useDispatch } from "react-redux";
import { updateUser, findPlayerUser } from "../../../../../redux/slices/users";

// ** Images
import d from "../../../../../assets/images/superadmin/a.png";

const PlayerProfileEdit = (item) => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const [centredModal, setCentredModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);

  const toggleShow = () => {
    setCentredModal(!centredModal);
  };

  const toggleConfirmation = (e) => {
    e.preventDefault()
    setConfirmationModal(!confirmationModal);

  };

  const handleSubmit = async (e) => {
    setConfirmationModal(!confirmationModal)
    setCentredModal(!centredModal);
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    const { username, fullName, phoneNumber, email, password1, password2 } =
      e.target;

    const withPasswordData = {
      id: item.data.id,
      username: username.value,
      fullName: fullName.value,
      email: email.value,
      password: password1.value,
      phoneNumber: phoneNumber.value,
    };

    const withoutPasswordData = {
      id: item.data.id,
      username: username.value,
      fullName: fullName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
    };

    if (password1.value || password2.value) {
      if (password1.value === password2.value) {
        const response = await dispatch(updateUser(withPasswordData));
         
        if (response.type === "users/updateUser/fulfilled") {
          toast.success(`User Update Success`, {
            id: toastId,
          });
          toggleShow();
          dispatch(findPlayerUser());
        } else {
          toast.error(`User Update Failed`, {
            id: toastId,
          });
        }
      } else {
        toast.error(`Password does not match.`, {
          id: toastId,
        });
      }
    } else {
      const response = await dispatch(updateUser(withoutPasswordData));

      if (response.type === "users/updateUser/fulfilled") {
        toast.success(`User Update Success`, {
          id: toastId,
        });
        toggleShow();
        dispatch(findPlayerUser());
      } else {
        toast.error(`User Update Failed`, {
          id: toastId,
        });
      }
    }
  };

  return (
    <>
      <Toaster/>
      <MDBBtn className="mal-btn" onClick={toggleShow} role="button">
        <img src={d} alt="btn" className="img-fluid mal-btn-img" />
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              USER EDIT PROFILE
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer fluid className="p-0 ">
                <MDBContainer fluid className="px-0 py-3 aep-body">
                  <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="aep-form-panel-container">
                      <div className="aep-form-panel-title">
                        Basic Information
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={<span className="text-white">Username</span>}
                          className="aep-input-text"
                          defaultValue={item.data.username}
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={<span className="text-white">Full Name</span>}
                          className="aep-input-text"
                          defaultValue={item.data.fullName}
                          id="fullName"
                          name="fullName"
                          type="text"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <div className="aep-form-panel-container">
                      <div className="aep-form-panel-title">
                        Contact Information
                      </div>
                      <div className="mx-3 mb-4 position-relative">
                        <MDBIcon
                          far
                          icon="envelope"
                          className="aep-input-icon"
                        />
                        <MDBInput
                          label={
                            <span className="text-white">Email Address</span>
                          }
                          className="aep-input"
                          defaultValue={item.data.email}
                          id="email"
                          name="email"
                          type="text"
                          autoComplete="new-password"
                        />
                      </div>
                      <div className="mx-3 mb-4 position-relative">
                        <MDBIcon fas icon="phone" className="aep-input-icon" />
                        <MDBInput
                          label={
                            <span className="text-white">Contact Number</span>
                          }
                          className="aep-input"
                          defaultValue={item.data.phoneNumber}
                          id="phoneNumber"
                          name="phoneNumber"
                          max="10"
                          type="text"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>

                    <div className="aep-form-panel-container">
                      <div className="aep-form-panel-title">
                        Change Password
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={<span className="text-white">Password</span>}
                          className="aep-input"
                          id="password1"
                          name="password1"
                          type="password"
                        />
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={
                            <span className="text-white">Confirm Password</span>
                          }
                          className="aep-input"
                          id="password2"
                          name="password2"
                          type="password"
                        />
                        <span className="aep-form-panel-note">
                          Leave blank if you don't want to change your password.
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between px-3 mt-3">
                      <MDBBtn color="warning" className="fw-bold w-100" onClick = {toggleConfirmation}>
                        <MDBIcon far icon="save" />
                        &nbsp;&nbsp;EDIT PROFILE
                      </MDBBtn>
                    </div>

                        {/* ----------------------------Change password confirmation modal ------------------------------------ */}
  <MDBModal tabIndex="-1" show={confirmationModal} setShow={setConfirmationModal}>
        <MDBModalDialog centered size="md">
          <MDBModalContent >
            
            
            
            <MDBBtn
              color="tranparent"
              onClick={toggleConfirmation }
              className="coreq-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" className='mb-3'/>
            </MDBBtn>

            <MDBTypography
              tag="h6"
              className="text-danger text-center  pt-4 coreq-modal-title"
            >
              You Are About To Edit this Users Profile
            </MDBTypography>

            <MDBTypography
              tag="h3"
              className="text-center text-danger  coreq-modal-title"
            >
              ARE YOU SURE?
            </MDBTypography>

            <MDBModalBody >
              <MDBContainer fluid className=" d-inline-flex  p-0 ">
                <MDBContainer >
                <MDBBtn className='px-5'>
                    YES
                </MDBBtn>

               
                </MDBContainer>
                <MDBContainer> 
                <MDBBtn className='px-5' onClick={toggleConfirmation}>
                    NO
                </MDBBtn>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
                  </form>
                </MDBContainer>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PlayerProfileEdit;
