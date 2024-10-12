import React from 'react'
import { useState } from 'react';
import { putRequest } from '../../../../../configs/axiosClient';
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
 

const AgentChangePassword = ({data}) => {
  console.log('changepass', data)
    
    // current user
    // const auth = JSON.parse(localStorage.getItem("auth"));

    // states

    const [centredModal, setCentredModal] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
   
   

    const toggleShow = (e) => {
        e.preventDefault()
      setCentredModal(!centredModal);
      

    };
    const toggleConfirmation = (e) => {
        e.preventDefault()
        setConfirmationModal(!confirmationModal);
  
      };

      const handleSubmit = async (e) => {
        const toastId = toast.loading("Loading...");
        e.preventDefault()
        const { password1, password2 } = e.target;
      
        if(password1.value === password2.value){
          const changeAgentPasswrd123 = await putRequest("users/" + data.id, {
            password: password2.value
          })
  
          if(changeAgentPasswrd123){
             
              toast.success("password changed successfully", {
                id: toastId,
          });
          }else{
           
            toast.error(" somethings wrong", {
               id: toastId,
         });
          }
        }else{
          console.log('test')
                 toast.error(" Password Did no Match!", {
                    id: toastId,
              });
        }
        
        setConfirmationModal(!confirmationModal)
        setCentredModal(!centredModal)
      }

        // const changeAgentPassword = async (auth) => {
        //     const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "users/64194dff6a07b42b504b1f75", {
        //         method: "PUT",
        //         headers: {'Authorization': `Bearer ${auth.jwt}`},

        //           body: JSON.stringify({

                    
            
        //             password: 'test123'
                
        //        })
                
        //     })

        //     const json = await response.json()
        //             console.log('alniltesting', json)
        //     if(response.ok){
        //         console.log('test', json)
        //         toast.success(" password successfully changed", {
        //             id: toastId,
        //           });
        //     }else{
        //         toast.error(" something went wrong changed", {
        //             id: toastId,
        //           });
        //     }
        // }

    
       

      // }

      // changeAgentPassword(auth)

          
    

  return (
    <div>
          <Toaster />
        <MDBBtn className="ms-0 afl-btn afl-btn-1" onClick={toggleShow}>
        <i className="fas fa-user-cog me-2"></i> Change Agent Password
        </MDBBtn >

    <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
    <MDBModalDialog centered size="lg">
      <MDBModalContent className="coreq-modal-body py-2">
        
        <MDBTypography
          tag="h4"
          className="text-center  pt-4 coreq-modal-title mb-0"
        >
         <MDBIcon fas icon="cogs" className="pe-3"/>Change Agent Password <br/> for
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
            
              <form  autoComplete="off" onSubmit={handleSubmit}>
                <h2 className='mb-3 text-warning'>{data.username}</h2>
                <div className="aep-form-panel-container">
                      <div className="aep-form-panel-title">
                         Enter new password for this Agent...
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={<span className="text-white">Enter New Password</span>}
                          className="aep-input"
                          id="password1"
                          name="password11"
                          type="password"
                        />
                      </div>
                      <div className="px-3 mb-4">
                        <MDBInput
                          label={
                            <span className="text-white">Confirm New Password</span>
                          }
                          className="aep-input"
                          id="password2"
                          name="password22"
                          type="password"
                        />
                        
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between px-3 mt-3">
                      <MDBBtn color="warning" className="fw-bold w-100" onClick = {toggleConfirmation} >
                        <MDBIcon far icon="save"/>
                        &nbsp;&nbsp;Change Password
                      </MDBBtn>
                    </div>

                    {/* <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr> */}


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
              You Are About To Change this Users Password
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

   
 
  </div>
  )
}

export default AgentChangePassword