import React from 'react'
import { useState, useEffect } from 'react';
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
 

const AgentEditCommissionRate = ({data}) => {
            console.log('this is the dataFor EditCommission', data)
     // current user
    const auth = JSON.parse(localStorage.getItem("auth"));

    // states
   
    const [centredModal, setCentredModal] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [commissionChosen, setCommissionChosen] = useState(0)
    const [confirmMessage, setConfirmMessage] = useState('')
    const [textColorChange, setTextColorChange] = useState('')
    const [allUsers, setAllUsers] = useState([])

    let commissionValueArray = []

 
    for (let i=1; i<11.6; i+= 0.1){
        
  
        commissionValueArray.push(Math.round(i * 10) / 10)
      }
  
   
    
   

    const toggleShow = (e) => {
        e.preventDefault()
      setCentredModal(!centredModal);
      

    };
    const toggleConfirmation = (e) => {
        e.preventDefault()
        setConfirmationModal(!confirmationModal);
  
      };

      const handleSubmit = async (e) => {
        

        e.preventDefault()

        const toastId = toast.loading("updating This Agent's Commission Rate Please Wait...");

          if(textColorChange === "text-success"){
            setCentredModal(!centredModal)

            const {commissionrate} = e.target
            const dataCommission = { CommissionRate: commissionrate.options[commissionrate.selectedIndex].value}
            const updateCommissionRate = async (user) => {
              try {
                const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `users/${data.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.jwt}` 
                  },
                  body: JSON.stringify(dataCommission)
                });
          
                const json = await response.json()
                if(response.ok) {
                  console.log('roundNumberUpdated', json)
                 
                   toast.success(`Commission Rate Successfully Updated!`, {
                    id: toastId,
                    duration: 4000,
                  })


                  setTimeout(function() {
                    window.location.reload();
                  }, 2000);
                 
                }
                // Handle response
                console.log(response);
              } catch (error) {
                console.log(error);
              }
    
            }
        
            updateCommissionRate(auth)
         
            setConfirmationModal(!confirmationModal)
            setCentredModal(!centredModal)
    
          }else if(textColorChange==="text-danger" || commissionChosen === 0){
            toast.error(`Sorry The Commission Rate Chosen is Not allowed.`, {
              id: toastId,
              duration: 4000,
            })
          }else{

          }
      
        
          
    }


   

    const handleChange = (event) =>{
      setCommissionChosen(event.target.value)
}

    useEffect(() => {
    
     
      const fetchAllUsers = async(user) => {
        
        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `users`, {
          headers: {'Authorization': `Bearer ${user.jwt}`},
    
          
      })
    
        const json = await response.json()
          
          if(response.ok) {
            console.log('allUsersRefferalTree',json) 
    
              setAllUsers(json)
          }
    
      }
      
      fetchAllUsers(auth)
      
     
      
    }, [])


    
    let reffererArray = []
    if(allUsers.length != 0){
                    let i=0
                    do{
                        
                    if(reffererArray.length == 0){
                      allUsers.filter((dataFilter) => {
                        if(dataFilter.username === data.username){
                          reffererArray.push(dataFilter)
                        }
                        
                      })   
    
                    }else{
                      i++
                       allUsers.map((filterData) => {
                          
                          if(filterData.referrer && reffererArray[reffererArray.length-1].referrer.username == filterData.username){
                              reffererArray.push(filterData)
                          }
                          
                        })
                 
                    }
    
                    }while(i<reffererArray.length)          
    }
                  
    console.log('refferal array', reffererArray)


    useEffect(() => {
   
      if(commissionChosen > 0){


      const filteredCommission = reffererArray.slice(1).filter(function(commission) {
        
          return commission.CommissionRate < commissionChosen || commission.CommissionRate == commissionChosen
        
      });

      if(filteredCommission.length !== 0){
            setTextColorChange("text-danger")
            setConfirmMessage('WARNING!!! THE COMMISSION RATE CHOSEN MUST BE LOWER THAN THE UPLINE AGENT REFERRER.')
            
      }else if(filteredCommission.length === 0){
         setTextColorChange("text-success")
     setConfirmMessage('THIS COMMISSION RATE IS ALLOWED. CLICK APPROVE TO PROCEED.')
      }
      
       console.log('fitlerdCommssion', filteredCommission)
  }
  
    }, [confirmMessage, commissionChosen])
    
  
    
   




  return (
    <div>
          <Toaster />
        <MDBBtn className="bg-light text-dark ms-0 afl-btn afl-btn-1" onClick={toggleShow}>
        <i className="fas fa-coins me-2"></i> Change Commission Rate
       
        </MDBBtn >

    <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
    <MDBModalDialog centered size="lg">
      <MDBModalContent className="coreq-modal-body py-2">
        
        <MDBTypography
          tag="h4"
          className="text-center  pt-4 coreq-modal-title mb-0"
        >
         <MDBIcon fas icon="coins" className="pe-3"/>Change Agent Commission Rate <br/> for

         <MDBTypography className='mt-5 mb-0'>
         <h5 className='text-primary'><strong>{data.username}</strong></h5>
         </MDBTypography>
                   
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
                <h2 className='mb-3 text-warning'></h2>
                    {/* set agent Commission Rate */}

                    <label className="text-white">Current Commission Rate For This Agent is:<h5 className='text-warning'>{data.CommissionRate}%</h5></label>
            <div className="d-flex flex-wrap my-3" >
           
              <div className="flex-grow-1 mx-1 mb-3" >
                <label className="text-white">Select Commission Rate</label>
                <select className="form-select  cua-input-select-2" name="commissionrate"  required onChange={handleChange}>
                <option selected disabled value="">
                  Enter Commission Rate
                  </option>
                  {commissionValueArray.map((values, i) =>{
                    return <option key={i} value={values}>{values}</option>
                  })}
                  {/* <option value={6}>6%</option>
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
                  <option value={1}>1%</option> */}
                </select>        
              </div>
            </div>


            <p hidden={commissionChosen == 0} className={textColorChange}>{confirmMessage}</p>

                    <div className="d-flex align-items-center justify-content-between px-3 mt-3">
                      <MDBBtn color="warning" className="fw-bold w-100" onClick = {toggleConfirmation} >
                        <MDBIcon far icon="save"/>
                        &nbsp;&nbsp;Save New Commission Rate
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
              You Are About To Change this Users Commission Rate
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

export default AgentEditCommissionRate