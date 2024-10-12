import { MDBBtn, MDBCol, MDBContainer, MDBIcon,
   MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter, } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";

import { postRequest } from "../../../../configs/axiosClient";

const CreateUser = () => {

  //useState
  const [commissionRateEnabler, setCommissionRateEnabler] = useState(true)
  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));
  let commissionValueArray = []

 
    for (let i=1; i<11.6; i+= 0.1){
        
  
        commissionValueArray.push(Math.round(i * 10) / 10)
      }


  // useEffect
  useEffect(() => {
    
    
    const fetchUsers= async(user) => {

      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `users`, {
        headers: {'Authorization': `Bearer ${user.jwt}`},

        
    })
  
      const json = await response.json()
        
       
      

        if(response.ok) {
          console.log('this is all the users', json)
         
        }
  
    }
    
    fetchUsers(auth)
    
  }, [])
  
  // confirm registration modal
  const [centredModal, setCentredModal] = useState(false)
  const toggleShow = (e) => {
    e.preventDefault()
    setCentredModal(!centredModal);
  }

  //submit registration
  const handleSubmit = async (e) => {
  
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    setCentredModal(!centredModal);

    
    const {
      username,
      fullname,
      email,
      password1,
      password2,
      pin,
      code,
      phonenumber,
      role,
      CommissionRate
    } = e.target;
    console.log('chosen role', role.options[role.selectedIndex].value)
    let commissionRateSelector
    if(commissionRateEnabler === false){
      commissionRateSelector = CommissionRate.options[CommissionRate.selectedIndex].value 
    }else{
      commissionRateSelector = 0
    }
    const data = {
      username: username.value,
      fullName: fullname.value,
      status: "active",
      email: email.value,
      password: password1.value,
      pin: pin.value,
      code: code.value,
      phoneNumber: phonenumber.value,
      role: role.options[role.selectedIndex].value,
      referrer: auth.user.id,
      CommissionRate: commissionRateSelector
    };

    if (username.value === ""){
      toast.error("Please enter your username", {
        id: toastId,
      });
    }
    else if (username.value.length < 8){
      toast.error("Username minimum characters of 8", {
        id: toastId,
      });
    }
    else if (email.value === ""){
      toast.error("Please enter your email", {
        id: toastId,
      });
    }
    else if (password1.value.length < 6){
      toast.error("Minimum password length is 6 characters", {
        id: toastId,
      });
    }
    else if (!pin.value.match(/^[0-9]+$/) ){
      toast.error("Please put numeric characters only for the pin number", {
        id: toastId,
      });
    }
    else if (phonenumber.value.length < 10){
      toast.error("Please put a valid cellphone number", {
        id: toastId,
      });
    }
    else if (phonenumber.value.length > 11){
      toast.error("Please put a valid cellphone number", {
        id: toastId,
      });
    }
    else if (password1.value !== password2.value){
      toast.error(`Password Does Not Match.`, {
        id: toastId,
      });
    }
    else{
      try {
        const response = await postRequest("users", data);

        if (response.data) {
          document.getElementById("myForm").reset();
          toast.success(
            `Thanks for signing up. Your account has been created.`,
            {
              id: toastId,
            }
          );
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.data?.[0]?.messages?.[0]?.message) {
          toast.error(
            error?.response?.data?.data?.[0]?.messages?.[0]?.message,
            {
              id: toastId,
            }
          );
        } else if (error.response.data.message) {
          toast.error(error.response.data.message, {
            id: toastId,
          });
        } else {
          toast.error("Something went wrong please try again", {
            id: toastId,
          });
        } 
      }
    }
  };


  const handleChange = (event) => {
    
    if(event.target.value === process.env.REACT_APP_SGLIVE_FINANCER_REGISTER){
      setCommissionRateEnabler(false)
    }else{
      setCommissionRateEnabler(true)
    }
  };



  return (
    <MDBCol xxl={6} xl={8} lg={10} className="m-2 p-2 cua-wrapper">
      <MDBContainer fluid className="p-0 cua-container">
        <Toaster />
        <MDBContainer fluid className="px-3 py-3 cua-header">
          <span className="title">
            <MDBIcon fas icon="user-alt" />
            &nbsp;&nbsp;CREATE AUTHORITATIVE USER ACCOUNT
          </span>
        </MDBContainer>
        <MDBContainer fluid className="px-4 pb-4 cua-body">
          <form id="myForm" onSubmit={handleSubmit} autoComplete="off">
            <div className="d-flex flex-wrap my-3">
              <div className="form-group flex-grow-1 mx-1 position-relative mb-3">
                <MDBIcon fas icon="user-alt" className="cua-username-icon" />
                <input
                  type="text"
                  className="form-control cua-input-text cua-input-text-username"
                  placeholder="Username"
                  name="username"
                  required
                />
              </div>
              <div className="form-group flex-grow-1 mx-1">
                <input
                  type="text"
                  className="form-control cua-input-text"
                  placeholder="Full Name (Optional)"
                  name="fullname"
                />
              </div>
            </div>

            <div className="mx-1 my-3">
              <input
                type="email"
                className="form-control cua-input-text-2"
                placeholder="Email"
                name="email"
                required
              />
            </div>

            <div className="d-flex flex-wrap my-3">
              <div className="form-group flex-grow-1 mx-1 mb-3">
                <input
                  type="password"
                  className="form-control cua-input-text"
                  placeholder="Password"
                  name="password1"
                  required
                />
              </div>
              <div className="form-group flex-grow-1 mx-1 mb-3">
                <input
                  type="password"
                  className="form-control cua-input-text"
                  placeholder="Confirm Password"
                  name="password2"
                  required
                /> 
              </div>
              <div className="form-group flex-grow-1 mx-1 mb-2">
                <input
                  type="password"
                  className="form-control cua-input-text"
                  placeholder="4-Digit PIN"
                  name="pin"
                  maxLength="4"
                  minLength="4"
                  required
                />
              </div>
            </div>

            <div className="mx-1 mt-4 mb-3">
              <div className="input-group">
                <div className="position-relative">
                  <div className="cua-badge">Country Code</div>
                  <select
                    id="lunch"
                    name="code"
                    className="selectpicker form-control cua-input-select"
                  >
                    <option>+63</option>
                  </select>
                </div>
                <input
                  type="number"
                  className="form-control cua-input-text-2"
                  placeholder="Phone Number"
                  name="phonenumber"
                  maxLength="11"
                  minLength="11"
                  required
                />
              </div>
            </div>


            {/* set agent Commission Rate */}

            <div className="d-flex flex-wrap my-3" >
              <div className="flex-grow-1 mx-1 mb-3" hidden={commissionRateEnabler}>
                <label className="text-white">Select Commission Rate</label>
                <select className="form-select  cua-input-select-2" name="CommissionRate">
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

            <div className="d-flex flex-wrap my-3">
              <div className="flex-grow-1 mx-1 mb-3">
                <select className="form-select  cua-input-select-2" name="role" onChange={handleChange}>
                  <option selected disabled value="">
                    User Role
                  </option>
                  {/* Local */}
                  <option value={process.env.REACT_APP_SGLIVE_MODERATOR_REGISTER}>moderator</option>
                  <option value={process.env.REACT_APP_SGLIVE_CSR_REGISTER}>CSR</option>
                  <option value={process.env.REACT_APP_SGLIVE_ACCOUNTANT_REGISTER}>accountant</option>
                  <option value={process.env.REACT_APP_SGLIVE_FINANCER_REGISTER}>Financer</option>
                </select>        
              </div>
            </div>

            <div className="mx-1">
              <MDBBtn color="warning" className="w-100 fw-bold " onClick={toggleShow}>
                <MDBIcon fas icon="plus" />
                &nbsp;&nbsp;CREATE USER ACCOUNT
              </MDBBtn>

                {/* cofirmation modal */}

                <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Confirm Registration?</MDBModalTitle>
              <MDBBtn type="button" className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            
            <MDBModalFooter className="justify-content-center text-center pe-5">
              <MDBBtn className='pe-5 ps-5 me-4'>
                Yes
              </MDBBtn>
              <MDBBtn className='pe-5 ps-5 ms-4' onClick={toggleShow}>No</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
            </div>
          </form>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default CreateUser;
