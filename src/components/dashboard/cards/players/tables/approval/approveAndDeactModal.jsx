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


const ApproveAndDeactModal = (item) => {
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

  const handleSubmit = async (type) => {

    const toastId = toast.loading("Approving This Player Please Wait...");
   

    if (type === "approve") {
      if(commissionChosen < auth.user.CommissionRate && commissionChosen !== 0){
        
        try {
          const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `users/${item.data.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${auth.jwt}` 
            },
            body: JSON.stringify({CommissionRate: commissionChosen}),
          });
    
          const json = await response.json()
          if(response.ok) {
            console.log('roundNumberUpdated', json)
           
             toast.success(`Player Successfully Approved!`, {
              id: toastId,
              duration: 4000,
            })

            const data = {
              id: item.data.id,
              status: "active",
            };
      
             dispatch(updateUser(data));
             dispatch(FIND(`?referrer=${auth.user.id}`));
      
             setTimeout(function() {
              window.location.reload();
            }, 2000);
           
          }

          // Handle response
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }else if(commissionChosen === 0){
        toast.error(`Sorry The Commission Rate Chosen is Not allowed To Be Approved!.`, {
          id: toastId,
          duration: 4000,
        })
      }else{
        toast.error(`Sorry The Commission Rate Chosen is Not allowed To Be Approved!.`, {
          id: toastId,
          duration: 4000,
        })
      }
     
      
    } else {
      const data = {
        id: item.data.id,
        status: "deactivated",
      };

      await dispatch(updateUser(data));
      await dispatch(FIND(`?referrer=${auth.user.id}`));
    }
  }



  
  const handleChange = (event) =>{
        setCommissionChosen(event.target.value)
  }

  useEffect(() => {
   
    if(commissionChosen >= auth.user.CommissionRate){
    
      setTextColorChange("text-danger")
      setConfirmMessage('WARNING!!! YOU MUST GIVE A COMMISSION RATE HIGHER THAN YOUR CURRENT COMMISSION RATE.')
}else{
  setTextColorChange("text-success")
 
  setConfirmMessage('THIS COMMISSION RATE IS ALLOWED. CLICK APPROVE TO PROCEED.')
}

  }, [confirmMessage, commissionChosen])
  

 

  console.log('CurrentCommissionChosen', commissionChosen)


  return (
    
    <>
    <Toaster />
      <MDBBtn
        color="success"
        className="pat3r-btn me-2"
        onClick={toggleShowApprove}
      >
        <MDBIcon far icon="check-circle" />
        &nbsp;&nbsp;APPROVE
      </MDBBtn>

      <MDBBtn
        color="danger"
        className="pat3r-btn me-2"
        onClick={toggleShowReject}
      >
        <MDBIcon far icon="times-circle" />
        &nbsp;&nbsp;REJECT
      </MDBBtn>

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
              <MDBIcon fas icon="cogs" /> APPROVING USER
             
            </MDBTypography>
            <h5 className="mt-4">YOUR CURRENT COMMISSION RATE IS:</h5>
                <h5  className="text-warning">{auth.user.CommissionRate}%</h5>

            <h5 className="mt-4">CURRENT AVAILABLE COMMISSION RATE TO BE GIVEN MUST BE</h5>
                <h5  className="text-success">{auth.user.CommissionRate - .1}%</h5>
                <h5 className="mt-0">AND BELOW</h5>
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
                  <MDBTypography tag="h4" className="text-success">{item.data.username}</MDBTypography>

                  {/* Agent Commission Rate Setup */}

                  <div className="d-flex flex-wrap my-3" >
           
           <div className="flex-grow-1 mx-1 mb-3" >
             <label className="text-white">Please Enter The Commission Rate for This Agent</label>
             <select className="form-select  cua-input-select-2" name="commissionrate"  required onChange={handleChange}>
             <option selected disabled value="">
               Enter Commission Rate
               </option>
               <option value={6}>6%</option>
               <option value={5.9}>5.9%</option>
               <option value={5.8}>5.8%</option>
               <option value={5.7}>5.7%</option>
               <option value={5.6}>5.6%</option>
               <option value={5.5}>5.5%</option>
               <option value={5.4}>5.4%</option>
               <option value={5.3}>5.3%</option>
               <option value={5.2}>5.2%</option>
               <option value={5.1}>5.1%</option>
               <option value={5}>5%</option>
               <option value={4.9}>4.9%</option>
               <option value={4.8}>4.8%</option>
               <option value={4.7}>4.7%</option>
               <option value={4.6}>4.6%</option>
               <option value={4.5}>4.5%</option>
               <option value={4.4}>4.4%</option>
               <option value={4.3}>4.3%</option>
               <option value={4.2}>4.2%</option>
               <option value={4.1}>4.1%</option>
               <option value={4}>4%</option>
               <option value={3.9}>3.9%</option>
               <option value={3.8}>3.8%</option>
               <option value={3.7}>3.7%</option>
               <option value={3.6}>3.6%</option>
               <option value={3.5}>3.5%</option>
               <option value={3.4}>3.4%</option>
               <option value={3.3}>3.3%</option>
               <option value={3.2}>3.2%</option>
               <option value={3.1}>3.1%</option>
               <option value={3}>3%</option>
               <option value={2.9}>2.9%</option>
               <option value={2.8}>2.8%</option>
               <option value={2.7}>2.7%</option>
               <option value={2.6}>2.6%</option>
               <option value={2.5}>2.5%</option>
               <option value={2.4}>2.4%</option>
               <option value={2.3}>2.3%</option>
               <option value={2.2}>2.2%</option>
               <option value={2.1}>2.1%</option>
               <option value={2}>2%</option>
               <option value={1.9}>1.9%</option>
               <option value={1.8}>1.8%</option>
               <option value={1.7}>1.7%</option>
               <option value={1.6}>1.6%</option>
               <option value={1.5}>1.5%</option>
               <option value={1.4}>1.4%</option>
               <option value={1.3}>1.3%</option>
               <option value={1.2}>1.2%</option>
               <option value={1.1}>1.1%</option>
               <option value={1}>1%</option>
             </select>        
           </div>
         </div>

          <p hidden={commissionChosen == 0} className={textColorChange}>{confirmMessage}</p>

                </MDBContainer>
                
                <div className="pat3-modal-warning d-flex align-items-center justify-content-center">
                  <div className="pat3-modal-warning-icon m-0">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="pat3-modal-warning-label">
                    {`Are you sure you want to Approve ${item.data.username}?`}
                   
                  </div>
                  
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  className="pat3-modal-approve"
                  onClick={() => handleSubmit("approve")}
                >
                  <MDBIcon fas icon="check" /> APPROVE
                </MDBBtn>
                <MDBBtn
                  className="pat3-modal-default"
                  onClick={toggleShowApprove}
                >
                  <MDBIcon fas icon="times" /> NO
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
                <MDBBtn
                  className="pat3-modal-deny"
                  onClick={() => handleSubmit("reject")}
                >
                  <MDBIcon fas icon="check" /> REJECT
                </MDBBtn>
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

export default ApproveAndDeactModal;
