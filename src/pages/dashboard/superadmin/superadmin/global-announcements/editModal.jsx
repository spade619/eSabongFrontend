import React, {useState, useRef } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBIcon,  MDBModalBody,
  MDBModalContent, MDBModalDialog, MDBModal, MDBTypography,MDBInput, MDBFile, MDBTextArea  } from "mdb-react-ui-kit"
  import toast, { Toaster } from "react-hot-toast";

const EditModal = ({data}) => {
  const [centredModal, setCentredModal] = useState(false);
  const [editTitleButton, setEditTitleButton] = useState(false)
  const [editImageButton, setEditImageButton] = useState(false)
  const [editTextArea, setEditTextArea] = useState(false)
  const [unlockSubmit, setUnlockSubmit]= useState(false)
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [submitEnabler, setSubmitEnabler]=useState(false)

  const auth = JSON.parse(localStorage.getItem("auth"));

  const toggleShow = () => {
    // formRef.current.reset();
    setEditTitleButton(false)
    setEditImageButton(false)
    setEditTextArea(false)
    setUnlockSubmit(false)
    setSelectedImage1(null)
    setCentredModal(!centredModal);

  };


  const handleSubmit = async (event) =>{
    setSubmitEnabler(false)

    const toastId = toast.loading("Updating Your Announcement please Wait...");
    event.preventDefault()
    
    const defaultTitle=data.title
    const defaultMessage=data.message
    const announceID = data.id
    console.log('the id', announceID)
      const {
        media1,
        message,
        title,
      } = event.target
 
      if(!submitEnabler){
            console.log('submit cancelled')
           
      }else{
        if(media1 === undefined){  
          const data ={
           message: !message || message.value ===""?defaultMessage:message.value,
          title: !title || title.value===""?defaultTitle:title.value,     
          }

           //PUT request

           const editData = new FormData();
           editData.append('data', JSON.stringify(data));
          
          //  editData.append('files.media', media1.files[0]);
          console.log('oontrycatchID', announceID)

           try {
            const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `admin-announcements/${announceID}`, {
              method: 'PUT',
              headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth .jwt}` 
              },

              body: editData
            });
      
            // const json = await response.json()
            if(response.ok) {
              console.log('response is', response)
             
               toast.success(`Announcement Updated Page Will now Refresh`, {
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
            // --------
           console.log('this is the data', data)
           }else{
    
       const data ={
        //  media: media1.files[0],
         message: !message || message.value ===""?defaultMessage:message.value,
         title: !title || title.value===""?defaultTitle:title.value ,       
          }


      //PUT request

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
     
      formData.append('files.media', media1.files[0]);
      




      const updateFunction = async() =>{
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
              `Your Announcement has Been edited Successfully`,
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
            console.error('update failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
       
      }


      try {
        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `admin-announcements/${announceID}`, {
               method: 'DELETE',
            headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${auth.jwt}`,
               },
        });
  
        const json = await response.json()
  
        if (response.ok) {
  
          //[post reqiest func]
          updateFunction()

        } 
      } catch (error) {
        console.error('Error:', error);
      }

      // try {
      //   const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `admin-announcements`, {
      //     method: 'PUT',
      //     headers: {
      //       // 'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${auth.jwt}` 
      //     },
      //     body: editData
      //   });
  
      //   // const json = await response.json()
      //   if(response.ok) {
      //     console.log('response is', response)
         
      //      toast.success(`Announcement  Updated Page Will now Refresh`, {
      //       id: toastId,
      //       duration: 4000,
      //     })
      //     window.location.reload();
      //   }
      //   // Handle response
      //   console.log(response);
      // } catch (error) {
      //   console.log(error);
      // }

      console.log('this is the data', data)
      
     }
     
   
    
      }

     
      toggleShow()
     
  }

  const handleDisableSubmit = () =>{
  
    setSubmitEnabler(false)
    console.log('submitDisabled')
  }

  const handleEnableSubmit = () => {
  
    setSubmitEnabler(true)
    console.log('submitEnabled')

  }


 



  const handleImageUpload1 = (event) => {
      console.log('this ran', event)
    const file = event.target.files[0];

    // Read the file and convert it to a data URL
    const reader1 = new FileReader();
    reader1.onload = () => {
      setSelectedImage1(reader1.result);
    };
    reader1.readAsDataURL(file);
    setUnlockSubmit(true)
  }

  const handleEditTitle = ()=>{
          setEditTitleButton(true)
          setUnlockSubmit(true)
  }

  const handleEditImage = ()=>{
    setEditImageButton(true)
   
}

const handleEditTextArea = () => {
  setEditTextArea(true)
  setUnlockSubmit(true)
}

  return (
    <>
            <MDBBtn className="bg-warning text-dark ms-0  afl-btn afl-btn-1" onClick={toggleShow}>
        <MDBIcon fas icon="edit" />
        </MDBBtn >

   
        <form id="myForm1"  autoComplete="off"  onSubmit={handleSubmit} >

<MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
  <MDBModalDialog centered size="lg" scrollable>
    <MDBModalContent className="coreq-modal-body py-2">
      <MDBTypography
        tag="h5"
        className="text-center  pt-4 coreq-modal-title"
      >
       Edit Announcement
      </MDBTypography>
      <hr className="hr"/>
      <MDBBtn
        color="tranparent"
     
        className="coreq-modal-close-btn shadow-0"
      >
        <MDBIcon fas icon="times" size="4x" />
      </MDBBtn>

      <MDBModalBody className="text-center">
       
<div  className="text-center">{ editTitleButton ?<MDBInput className="text-light dashboard-bg" label={`${data.title}`}
       id='formWhite' contrast type='text' name="title"/> :<h3>{data.title}</h3>} </div > <div className='text-success' hidden={editTitleButton} onClick={()=>handleEditTitle()}>EDIT TITLE: <MDBIcon fas icon="edit" /></div>
    


{!editImageButton?(<div className="mt-3">{data && (<img src={`https://sgliveapi-6lrkg.ondigitalocean.app${data.media.url}`} alt="Selected" style={{ maxWidth: '400px', maxHeight: '250px', borderRadius: '15px'}} />)}</div>):
( <div className="mt-5">{selectedImage1 && (<img src={selectedImage1} alt="test" style={{ maxWidth: '400px', borderRadius: '15px'}}/>)}</div>)}

    {editImageButton ? (<div className="text-center bg-light pt-2 mt-5 square bg-primary rounded-pill" style={{width: '150px', maxHeight: '250px', marginLeft: '310px'}}>
<MDBFile  label='Upload Image' size='sm' id='formFileLg'
style={{display: 'none'}} onChange={handleImageUpload1} name="media1"/> 
</div>) : <div className='text-success'  onClick={()=>handleEditImage()}>EDIT IMAGE: <MDBIcon fas icon="edit" /></div>} 




        <hr className="hr" style={{ backgroundColor: "#fff" }} />
        <h6 className="text-warning">Message Description</h6>
        <MDBContainer fluid className="p-3 variance-body w-100">
       
       <div>
        {editTextArea? <MDBTextArea className="text-light square border border-light" id='formWhite' contrast rows={6}  size="lg" name="message"/> 
        : 
        <p  style={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>{data.message}</p>}
       
       </div>
       {!editTextArea ? <div className='text-success'  onClick={()=>handleEditTextArea()}>EDIT Message Description: <MDBIcon fas icon="edit" /></div>:null}

     

       
        </MDBContainer>
        <hr className="hr"/>
        <MDBContainer className="text-end">
          <div> 
            <MDBBtn className="bg-success"disabled={!unlockSubmit} onClick={handleEnableSubmit}>submit</MDBBtn>
          <MDBBtn className="ms-3 bg-danger" onClick={handleDisableSubmit}>cancel</MDBBtn>
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

export default EditModal