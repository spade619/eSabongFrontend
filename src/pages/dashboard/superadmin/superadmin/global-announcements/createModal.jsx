import React, {useState} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBIcon,  MDBModalBody,
  MDBModalContent, MDBModalDialog, MDBModal, MDBTypography,MDBInput, MDBFile, MDBTextArea  } from "mdb-react-ui-kit"
  import toast, { Toaster } from "react-hot-toast";

const CreateModal = () => {
  const [centredModal, setCentredModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [messageDescription, setMessageDescription] = useState('')

  const auth = JSON.parse(localStorage.getItem("auth"));
  
console.log('this is the picture', selectedImage)
 
  const toggleShow = () => {
    setCentredModal(!centredModal);
  };


  const handleSubmit = async (event) =>{
    event.preventDefault()
    const toastId = toast.loading("Creating Your Announcement...");
   
    console.log('testRan')
    const {
      media,
      message,
      title,
    } = event.target

    // console.log('title is', title.value)
    // console.log('media is', media.value)
    // console.log('message is', message.value)

    const data ={
      
      message: message.value,
      title: title.value,    
    }

    console.log('this is the data to be sent', media.files[0])
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
   
    formData.append('files.media', media.files[0]);
   
    try {
      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `admin-announcements`, {
        method: 'POST',
        headers: {
         
          Authorization: `Bearer ${auth.jwt}`,
        },
      
      
      body: formData,
      });

      const json = await response.json()

      if (response.ok) {

        // console.log('posted successfully', response);
        // console.log('this is the json response', json)
        setCentredModal(!centredModal);
        toast.success(
          `Your Announcement has Been Posted Successfully`,
          {
            id: toastId,
            duration: 4000,
          }
        );
        setTimeout(function() {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(`error.`, {
          id: toastId,
          duration: 4000,
        });
        console.error('post  failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }




    console.log('formdata', formData)

    

  }


 

  const handleImageUpload = (event) => {
   
    const file = event.target.files[0];

    // Read the file and convert it to a data URL
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    if(file){ reader.readAsDataURL(file);}
   

  }
  return (
    <>
      <Toaster />
        <MDBBtn className="bg-light text-dark  afl-btn afl-btn-1 mt-1" onClick={toggleShow}>
    <MDBIcon far icon="plus-square" /> Create Announcement
    </MDBBtn>

      <form id="myForm" autoComplete="off" onSubmit={handleSubmit}>

    <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className="coreq-modal-body py-2">
          <MDBTypography
            tag="h5"
            className="text-start ms-5 pt-4 coreq-modal-title"
          >
           Create Announcement
          </MDBTypography>
          <hr className="hr"/>
          <MDBBtn
            color="tranparent"
            onClick={toggleShow}
            className="coreq-modal-close-btn shadow-0"
          >
            <MDBIcon fas icon="times" size="4x" />
          </MDBBtn>

          <MDBModalBody className="text-center">

          <MDBInput className="text-light dashboard-bg" label='Announcement Title'
           id='formWhite' contrast type='text' name="title" required/>
 

          <div className="mt-5">
          {selectedImage && (
      <img src={selectedImage} alt="Selected" style={{ maxWidth: '400px', borderRadius: '15px'}} />
      
    )}
    </div>

<div className="text-center bg-light pt-2 mt-5 square bg-primary rounded-pill" style={{width: '150px', marginLeft: '310px'}}>
<MDBFile  label='Upload Image' size='sm' id='formFileSm'
style={{display: 'none'}} onChange={handleImageUpload} name="media" required/> 
  </div>
 



            <hr className="hr" style={{ backgroundColor: "#fff" }} />
            <h6 className="text-light">Message Description</h6>
            <MDBContainer fluid className="p-3 variance-body w-100">
           <div>
           <MDBTextArea className="text-light square border border-light" id='formWhite' contrast rows={6}  size="lg" name="message" required/>
           </div>

         

           
            </MDBContainer>
            <hr className="hr"/>
            <MDBContainer className="text-end">
              <div> 
                <MDBBtn className="bg-success">submit</MDBBtn>
              <MDBBtn className="ms-3 bg-danger" onClick={toggleShow}>cancel</MDBBtn>
              </div>
             
            </MDBContainer>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
    </form>
    </>

  )
}

export default CreateModal