import React, {useState} from 'react'
import {MDBContainer, MDBRow, MDBBtn, MDBIcon,  MDBModalBody,
  MDBModalContent, MDBModalDialog, MDBModal, MDBTypography} from "mdb-react-ui-kit"
  import toast, { Toaster } from "react-hot-toast";

const DeleteModal = ({data}) => {

  const [centredModal, setCentredModal] = useState(false);
  const [modalUrl, setModalUrl] = useState(data.media.url)
  const auth = JSON.parse(localStorage.getItem("auth"));

  if(data.media?.formats?.small?.url){

  }
console.log('dataRecievedDelete', data)

  const toggleShow = () => {
  

  
    setCentredModal(!centredModal);
  };

  const handleDelete = async(dataId) =>{
        console.log('this is the id to be deleted', dataId)


    
        const toastId = toast.loading("Deleting Your Announcement...");

      try {
        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `admin-announcements/${dataId}`, {
               method: 'DELETE',
            headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${auth.jwt}`,
               },
        });
  
        const json = await response.json()
  
        if (response.ok) {
  
          // console.log('posted successfully', response);
          // console.log('this is the json response', json)
          setCentredModal(!centredModal);
          toast.success(
            `Your Announcement has Been DELETED Successfully`,
            {
              id: toastId,
              duration: 4000,
            }
          );
          setTimeout(function() {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(`Password Does Not Match.`, {
            id: toastId,
            duration: 4000,
          });
          console.error('post  failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  
  }
  return (
    <>
     <Toaster />
        <MDBBtn className="bg-danger text-dark ms-0 afl-btn afl-btn-1" onClick={toggleShow}>
        <MDBIcon far icon="trash-alt" />
        </MDBBtn >


        <MDBModal
        tabIndex="-1"
        show={centredModal} setShow={setCentredModal}
      >
        <MDBModalDialog centered size="lg" scrollable>
          <MDBModalContent className="pat3-modal-body py-2">
            <MDBTypography
              tag="h5"
              className="text-start ms-5 pt-4 pat3-modal-title-deny"
            >
              <MDBIcon fas icon="cogs" /> DELETE THIS ANNOUNCEMENT?
            </MDBTypography>
            <MDBBtn
              color="tranparent"
              onClick={toggleShow}
              className="pat3-modal-close-btn shadow-0"
            >
              <MDBIcon fas icon="times" size="2x" />
            </MDBBtn>

            <MDBModalBody>
              <MDBContainer className="position-relative">
              <MDBTypography tag="h4" className='mt-5 text-warning'>{data.title}</MDBTypography>
              <div className='mt-5' >
                {data && (
      <img src={`https://sgliveapi-6lrkg.ondigitalocean.app${modalUrl}`} alt="Selected" style={{ maxWidth: '150px', maxHeight: '300px', borderRadius: '15px'}} />
      
    )}     
                </div>
                <MDBContainer className="pt-3 mb-5 mt-5 pb-5 pat3-modal-panel">
                <MDBTypography tag="h4" className='text-secondary'>{data.message}</MDBTypography>    
                </MDBContainer>
         
              </MDBContainer>
              <MDBContainer className="d-flex align-items-center justify-content-between">
                <MDBBtn
                  className="pat3-modal-deny"
                  onClick={() => handleDelete(data.id)}
                >
                  <MDBIcon fas icon="check" />  YES
                </MDBBtn>
                <MDBBtn
                  className="pat3-modal-default"
                  onClick={toggleShow}
                >
                  <MDBIcon fas icon="times" /> NO
                </MDBBtn>
              </MDBContainer>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}

export default DeleteModal