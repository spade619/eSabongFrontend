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
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

// ** Redux 
import { useDispatch } from "react-redux";
import { updateUser, FIND } from "../../../../../../redux/slices/users";


const PlayerDeactivate  = (item) => {
  console.log('the Data', item)
  // ** Vars
  const dispatch = useDispatch();
  const [approveModal, setCentredApproveModal] = useState(false);
  const [rejectModal, setCentredRejectModal] = useState(false);

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));

  // all users data
  const [allUsers, setAllUsers] = useState([])
  const [commissionChosen, setCommissionChosen] = useState(0)
  const [confirmMessage, setConfirmMessage] = useState('')
  const [textColorChange, setTextColorChange] = useState('')


  useEffect(() => {
    
    const fetchAllUsers = async(user) => {  

      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `users`, {
        headers: {'Authorization': `Bearer ${user.jwt}`},

        
    })
  
      const json = await response.json()
        
       
    

        if(response.ok) {
         
          setAllUsers(json)
         
        }
  
    }
    
    fetchAllUsers(auth)
   
  }, [])
  // console.log('allUsers',allUsers)
  



  

  const toggleShowApprove = () => setCentredApproveModal(!approveModal);
  const toggleShowReject = () => setCentredRejectModal(!rejectModal);

  // const handleSubmit = async (type) => {

  //   const toastId = toast.loading("Approving This Player Please Wait...");
   

  //   if (type === "approve") {
      
           
  //            toast.success(`Player Successfully Approved!`, {
  //             id: toastId,
  //             duration: 4000,
  //           })

  //           const data = {
  //             id: item.data.id,
  //             status: "active",
  //           };
      
  //            dispatch(updateUser(data));
  //            dispatch(FIND(`?referrer=${auth.user.id}`));
      
  //            setTimeout(function() {
  //             window.location.reload();
  //           }, 2000);
           
      
     
      
  //   } else {
  //     const data = {
  //       id: item.data.id,
  //       status: "deactivated",
  //     };

  //     await dispatch(updateUser(data));
  //     await dispatch(FIND(`?referrer=${auth.user.id}`));
  //   }
  // }
       //   }


      //  }

        const handleBan = async () => {
          console.log('thisTriggered')
          const toastId = toast.loading("Deactivating This Player Please Wait...");
          
        try {
          const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `users/${item.data.data.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${auth.user.jwt}` 
            },
            body: JSON.stringify({status: "deactivated"})
          });
    
          const json = await response.json()
          if(response.ok) {
            console.log('User Banned Successfully', json)
           
             toast.success(`User Banned Successfully page will now refresh`, {
              id: toastId,
              duration: 4000,
            })
            window.location.reload();
          }
          // Handle response
          console.log(response);
        } catch (error) {
          console.log(error);
        }

        }

          console.log('debugtest', item.data.data.id)

  return (
    
    <>
    <Toaster />

    <MDBBtn className="text-warning pat2r-btn shadow-0 me-2" onClick={toggleShowApprove}>
           <MDBIcon fas icon="lock" size="xl" />
         </MDBBtn>
{/* 
      <MDBBtn
        color="success"
        className="pat3r-btn me-2"
        onClick={toggleShowApprove}
      >
        <MDBIcon far icon="check-circle" />
        &nbsp;&nbsp;APPROVE
      </MDBBtn> */}

      {/* <MDBBtn
        color="danger"
        className="pat3r-btn me-2"
         onClick={toggleShowReject}
      >
        <MDBIcon far icon="times-circle" />
        &nbsp;&nbsp;REJECT
      </MDBBtn> */}

      <MDBModal
        tabIndex="-1"
        show={approveModal}
        setShow={setCentredApproveModal}
      >
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="pat3-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 pat3-modal-title-approved"
            >
              <MDBIcon fas icon="cogs" /> Ban User
             
            </MDBTypography>

            {/* <h5 className="mt-4">YOUR CURRENT COMMISSION RATE IS:</h5>
                <h5  className="text-warning">{auth.user.CommissionRate}%</h5>

            <h5 className="mt-4">CURRENT AVAILABLE COMMISSION RATE TO BE GIVEN MUST BE</h5>
                <h5  className="text-success">{auth.user.CommissionRate - .1}%</h5>
                <h5 className="mt-0">AND BELOW</h5> */}
            <MDBBtn
              color="tranparent"
              onClick={toggleShowApprove}
              className="pat3-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="pt-3 pb-5 pat3-modal-panel">
               
           
         

                </MDBContainer>
                
                <div className="pat3-modal-warning d-flex align-items-center justify-content-center">
                  <div className="pat3-modal-warning-icon m-0">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="pat3-modal-warning-label">
                    {`Are you sure you want to Ban ${item.data.data.username}?`}
                   
                  </div>
                  
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  className="pat3-modal-approve"
                  onClick={handleBan}
                >
                  <MDBIcon fas icon="check" /> Ban This User
                </MDBBtn>

                <MDBBtn
                  className="pat3-modal-default"
                  onClick={toggleShowApprove}
                >
                  <MDBIcon fas icon="times" /> CANCEL
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <MDBModal
        tabIndex="-1"
        show={rejectModal}
        setShow={setCentredRejectModal}
      >
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="pat3-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 pat3-modal-title-deny"
            >
              <MDBIcon fas icon="cogs" /> REJECTING USER
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShowReject}
              className="pat3-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
                <MDBContainer className="pt-3 pb-5 pat3-modal-panel">
                  <MDBTypography tag="h4">{item.data.username}</MDBTypography>
                </MDBContainer>
                <div className="pat3-modal-warning d-flex align-items-center justify-content-center">
                  <div className="pat3-modal-warning-icon m-0">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="pat3-modal-warning-label">
                    {`Are you sure you want to Reject ${item.data.username}?`}
                  </div>
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                {/* <MDBBtn
                  className="pat3-modal-deny"
                  onClick={() => handleSubmit("reject")}
                >
                  <MDBIcon fas icon="check" /> REJECT
                </MDBBtn> */}
                <MDBBtn
                  className="pat3-modal-default"
                  onClick={toggleShowReject}
                >
                  <MDBIcon fas icon="times" /> NO
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default PlayerDeactivate;
