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
import toast from "react-hot-toast";

// ** React
import { useState } from "react";

// ** Redux
import { useDispatch } from "react-redux";
import {
  processCommissionRequest,
  commissionRequests,
} from "../../../../../redux/slices/commissionRequest";
// import { allCashoutRequest } from "../../../../../redux/slices/cashout";

const CashoutRequestModal = ({
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  // ** Vars
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));
  const filterByAdmin =
    auth.user.role.type === "superadmin" || auth.user.role.type === "csr"
      ? ""
      : `&user_id.referrer=${auth.user.id}`;

  const toggleShow = () => setCentredModal(!centredModal);

  const processCashoutHandle = async (type) => {
    // const toastId = toast.loading("Loading...");
    // setDisabledButton(true);

    // if (type === "approve") {
    //   const approvedData = {
    //     request_id: data.id,
    //     approver_id: auth.user.id,
    //     reciever_id: data.user_id.id,
    //     status: "Approved",
    //     amount: data.amount,
    //   };

    //   const response = await dispatch(processCommissionRequest(approvedData));

    //   if (
    //     response.type ===
    //     "commission-requests/processCommissionRequest/fulfilled"
    //   ) {
    //     await toast.success(`Request Approved`, {
    //       id: toastId,
    //       duration: 4000,
    //     });
    //     setDisabledButton(false);
    //     setCurrentPage(1);
    //     dispatch(
    //       commissionRequests(
    //         `?_start=${
    //           (currentPage - 1) * itemsPerPage
    //         }&_limit=${itemsPerPage}&_status=Pending${filterByAdmin}`
    //       )
    //     );
    //   } else {
    //     setDisabledButton(false);
    //     await toast.error(`Something went wrong`, {
    //       id: toastId,
    //       duration: 4000,
    //     });
    //   }
    // } else {
    //   const deniedData = {
    //     request_id: data.id,
    //     approver_id: auth.user.id,
    //     reciever_id: data.user_id.id,
    //     status: "Rejected",
    //     amount: data.amount,
    //   };

    //   const response = await dispatch(processCommissionRequest(deniedData));

    //   if (
    //     response.type ===
    //     "commission-requests/processCommissionRequest/fulfilled"
    //   ) {
    //     await toast.success(`Request Approved`, {
    //       id: toastId,
    //       duration: 4000,
    //     });
    //     setDisabledButton(false);
    //     setCurrentPage(1);
    //     dispatch(
    //       commissionRequests(
    //         `?_start=${
    //           (currentPage - 1) * itemsPerPage
    //         }&_limit=${itemsPerPage}&_status=Pending${filterByAdmin}`
    //       )
    //     );
    //   } else {
    //     setDisabledButton(false);
    //     await toast.error(`Something went wrong`, {
    //       id: toastId,
    //       duration: 4000,
    //     });
    //   }
    // }


    // -----------------------------------------------------------------------

    // SetApprovalStatus(type)
    const toastId = toast.loading("Loading...");
    setDisabledButton(true);

    //checks the approval status on the backend
    if(type === 'approve'){

      const CheckApprovalStatus = async(auth) => {

        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "commission-requests/" +data.id, {
          headers: {'Authorization': `Bearer ${auth.jwt}`},
  
          
      })
    
        const json = await response.json()
          
         
        if(response.ok) {
          
          if(json.status === 'Pending'){
              // setApprovalStatusChecker('approve')
              const approvedParams = {
                request_id: data.id,
                approver_id: auth.user.id,
                reciever_id: data.user_id.id,
                status: "Approved",
                amount: data.amount,
              }
                const response = await dispatch(processCommissionRequest(approvedParams));
          
                if (response.type === "commission-requests/processCommissionRequest/fulfilled") {
                  await toast.success(`Request Approved`, {
                    id: toastId,
                    duration: 4000,
                  });
                  setDisabledButton(false);
                  setCurrentPage(1);
                  dispatch(
                    commissionRequests(
                      `?_start=${
                        (currentPage - 1) * itemsPerPage
                      }&_limit=${itemsPerPage}&_status=Pending${filterByAdmin}`
                    )
                  );
                  window.location.reload()
                } else {
                  setDisabledButton(false);
                  await toast.error(`Something went wrong`, {
                    id: toastId,
                    duration: 4000,
                  });
                }
          }else if(json.status ==='Approved'){
            toast.error(`this request has already been approved`, {
              id: toastId,
              duration: 4000,
      
            });
            setCentredModal(!centredModal)
            window.location.reload()
          }else if(json.status === 'Rejected'){
            toast.error(`this request was already been declined`, {
              id: toastId,
              duration: 4000,
            });
            setCentredModal(!centredModal)
            window.location.reload()
          }
        } 
    
      }
      
     CheckApprovalStatus(auth)


    }else{

      const CheckApprovalStatus = async(auth) => {
        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "commission-requests/" +data.id, {
          headers: {'Authorization': `Bearer ${auth.jwt}`},

         
          
      })

      const json = await response.json()

      if(response.ok) {
          
        if(json.status === 'Pending'){
            // setApprovalStatusChecker('approve')

            const rejectedParams = {
              request_id: data.id,
              approver_id: auth.user.id,
              reciever_id: data.user_id.id,
              status: "Rejected",
              amount: data.amount,
            };
      
            const response = await dispatch(processCommissionRequest(rejectedParams));
      
            if (response.type === "commission-requests/processCommissionRequest/fulfilled") {
              setDisabledButton(false);
              await toast.success(`Request Denied`, {
                id: toastId,
                duration: 4000,
              });
              setCurrentPage(1);
              dispatch(
                commissionRequests(
                  `?_start=${
                    (currentPage - 1) * itemsPerPage
                  }&_limit=${itemsPerPage}&_status=Pending${filterByAdmin}`
      
                )
              );
            } 
           
        }else if(json.status ==='Approved'){
          toast.error(`this request has already been approved`, {
            id: toastId,
            duration: 4000,
    
          });
          setCentredModal(!centredModal)
          window.location.reload()
        }else if(json.status === 'Rejected'){
          toast.error(`this request was already been declined`, {
            id: toastId,
            duration: 4000,
          });
          setCentredModal(!centredModal)
          window.location.reload()
        }
      }


      }

      CheckApprovalStatus(auth)
      // ----------------------------------------------------

    }

    
  }
    
  

  return (
    <>
      <div
        onClick={toggleShow}
        className="coreq-process text-truncate"
        role="button"
      >
        <MDBIcon fas icon="cogs" /> PROCESS
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="coreq-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 coreq-modal-title"
            >
              <MDBIcon fas icon="cogs" /> PROCESS COMMISSION
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
                <MDBContainer className="pt-3 pb-5 coreq-modal-panel">
                  <MDBTypography tag="h4">
                    {data.user_id.username}
                  </MDBTypography>
                  <MDBTypography tag="h3">{data.amount}</MDBTypography>
                </MDBContainer>
                <div className="coreq-modal-warning d-flex align-items-center justify-content-center">
                  <div className="coreq-modal-warning-icon">
                    <MDBIcon fas icon="exclamation-triangle" size="2xl" />
                  </div>
                  <div className="coreq-modal-warning-label">
                    {`Approving this request will automatically generate a
                    WITHDRAW transaction for ${data.user_id.username}`}
                  </div>
                </div>
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  className="coreq-modal-approve"
                  onClick={() => processCashoutHandle("approve")}
                >
                  <MDBIcon fas icon="check" /> APPROVE
                </MDBBtn>
                <MDBBtn
                  className="coreq-modal-deny"
                  onClick={() => processCashoutHandle("deny")}
                >
                  <MDBIcon fas icon="times" /> DENY
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CashoutRequestModal;
