import React, {useState} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBIcon,  MDBModalBody,
  MDBModalContent, MDBModalDialog, MDBModal, MDBTypography,MDBInput, MDBFile, MDBTextArea  } from "mdb-react-ui-kit"

const viewModal = ({data}) => {
  const [centredModal, setCentredModal] = useState(false);

  console.log('data', data)
  const toggleShow = () => {
    setCentredModal(!centredModal);
  };
  return (
    <>
        <MDBBtn className="bg-primary text-dark ms-0 afl-btn afl-btn-1" onClick={toggleShow}>
        <MDBIcon far icon="eye" />
        </MDBBtn >

        <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className="coreq-modal-body py-2">
          <h3 className='text-success'> ADMIN ANNOUNCEMENT</h3>
          <MDBTypography
            tag="h1"
            className="text-center coreq-modal-title"
          >
          "{data.title}"
          </MDBTypography>
          <hr className="hr"/>
          {/* <MDBBtn
            color="tranparent"
            onClick={toggleShow}
            className="coreq-modal-close-btn shadow-0"
          >
            <MDBIcon fas icon="times" size="4x" />
          </MDBBtn> */}

          <MDBModalBody className="text-center">


          <div className="mt-3">
          {data && (
      <img src={`https://sgliveapi-6lrkg.ondigitalocean.app${data.media.url}`} alt="Selected" style={{ maxWidth: '400px', borderRadius: '15px'}} />
      
    )}
    </div>

    
    <MDBTypography
            tag="h5"
            className="text-center text-secondary"
          >
         Created On:  {new Date(data.createdAt).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </MDBTypography>

{/* <div className="text-center bg-light pt-2 mt-5 square bg-primary rounded-pill" style={{width: '150px', marginLeft: '310px'}}>
<MDBFile  label='Upload Image' size='sm' id='formFileSm'
style={{display: 'none'}} onChange={handleImageUpload} name="media" required/> 
  </div>
  */}



            <hr className="hr" style={{ backgroundColor: "#fff" }} />
            <h3 className="text-warning">Message Description</h3>
            <MDBContainer fluid className="p-3 variance-body w-100">
           {/* <div>
           <MDBTextArea className="text-light square border border-light" id='formWhite' contrast rows={6}  size="lg" name="message" required/>
           </div> */}

             <p  style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>{data.message}</p>

           
            </MDBContainer>
            <hr className="hr"/>
            <MDBContainer className="text-end">
              <div className='text-center'> 
                
              <MDBBtn className="ms-3 bg-danger" onClick={toggleShow}>CLOSE</MDBBtn>
              </div>
             
            </MDBContainer>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    </>
  )
}

export default viewModal