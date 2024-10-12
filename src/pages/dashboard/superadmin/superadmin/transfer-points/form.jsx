// ** React
import { useState, useEffect, useRef } from "react";
import Select from 'react-select'

// ** Third Party Components
import { MDBBtn, MDBCol, MDBContainer, MDBIcon,   
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter, MDBInput} from "mdb-react-ui-kit";

import toast, { Toaster } from "react-hot-toast";
// transfer points confirmation modal
// import TransferConfirm from "./modal";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import {
  superadminTransferPoints,
  allHistory,
} from "../../../../../redux/slices/transferPoints";

const TransferPointsForm = () => {
  const [centredModal, setCentredModal] = useState(false);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [selectedSender, setSelectedSender] = useState('')
  const [selectedReciever, setSelectedReciever] = useState('')

  const storeUsers = useSelector((state) => state.users);

  // toggle modal confirm pop up
  const toggleShow = (e) => {
    e.preventDefault()
    setCentredModal(!centredModal);
  }


  // ** Filtered Users
  const allUsers = storeUsers.users?.filter((x) => x.status == "active");

  const handleTransfer = async (e) => {
   
    const toastId = toast.loading("Loading...");
    setDisabled(true);
    e.preventDefault();
    setCentredModal(!centredModal);

    const { amount, receiver, sender } = e.target;


  
    if (amount.value === "") {
      toast.error("Please enter your amount.", {
        id: toastId,
      });
      setDisabled(false);
      return false;
    }

    // if (sender.value === "") {
    //   toast.error("Please a select sender.", {
    //     id: toastId,
    //   });
    //   setDisabled(false);
    //   return false;
    // 
    if (selectedSender === '') {
      toast.error("Please a select sender.", {
        id: toastId,
      });
      setDisabled(false);
      return false;
    }

    // if (receiver.value === "") {
    //   toast.error("Please a select receiver.", {
    //     id: toastId,
    //   });
    //   setDisabled(false);
    //   return false;
    // }

    if (selectedReciever === '') {
      toast.error("Please a select receiver.", {
        id: toastId,
      });
      setDisabled(false);
      return false;
    }
    const data = {
      amount: amount.value,
      // sender_id: sender.value,
      // receiver_id: receiver.value,
      sender_id: selectedSender.value,
      receiver_id: selectedReciever.value,
    };

    try {
      const result = await dispatch(superadminTransferPoints(data));

      if (result.type === "transferPoints/superadminTransferPoints/fulfilled") {
        setDisabled(false);
        toast.success(`Transfer Success`, {
          id: toastId,
          duration: 4000,
        });

        await dispatch(allHistory("?credited_at=superadmin"));
        document.getElementById("myForm").reset();
      } else {
        setDisabled(false);
        toast.error(`Transfer Failed ${result.payload}`, {
          id: toastId,
          duration: 4000,
        });
      }
    } catch (err) {
      setDisabled(false);
      console.log(err);
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };
  




  const handleSender = (selectedOption) =>{
    setSelectedSender(selectedOption)
}

const handleReciever = (selectedOption) => {
  setSelectedReciever(selectedOption)
}



  const options = allUsers.map((item) => ({
    value: item.id,
    label: item.username,
  }));

  // console.log('this is made bey ne;', options)
  // console.log('this oisasd alluser', allUsers)
  return (
    <MDBCol className="tpf-wrapper p-2">
      <Toaster />
      <MDBContainer fluid className="px-0 py-4 tpf-container">
        <MDBContainer fluid className="px-3 tpf-header-line pb-3">
          <span>
            <MDBIcon fas icon="exchange-alt" />
            &nbsp;&nbsp;TRANSFER POINTS FORM
          </span>
        </MDBContainer>

      
       
     
      

       
        <form onSubmit={handleTransfer} autoComplete="off" id="myForm">
          <MDBContainer fluid className="tpf-body">
            <div className="my-4">

{/* 
            <select
                className="form-select tpf-input-select shadow-0"
                name="sender"
              >
             
                <option value="" disabled selected>
                  Select Sender User
                </option>

                {allUsers.map((i, k) => (
                  <option key={k} value={i.id}>
                    {i.username}
                  </option>
                ))}
              </select>  */}


               <Select options={options} placeholder="Please Select Sender" value={selectedSender} onChange={handleSender}/>
            </div>

   

            <div className="mb-4">
              {/* <select
                className="form-select tpf-input-select shadow-0"
                name="receiver"
              >
                <option value="" disabled selected>
                  Select Reciever User
                </option>
                {allUsers.map((i, k) => (
                  <option key={k} value={i.id}>
                    {i.username}
                  </option>
                ))}
              </select> */}
               <Select options={options} placeholder="Please Select Reciever" value={selectedReciever} onChange={handleReciever}/>
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                min="1"
                className="form-control atp-footer-input"
              />
            </div>
            <div className="mb-4">

              <MDBBtn
                className="w-100"
                color="warning fw-bold"
                disabled={disabled}
                onClick={toggleShow}
              >
                <MDBIcon fas icon="exchange-alt" />
                &nbsp;&nbsp;START TRANSFER
              </MDBBtn>

                    {/* cofirmation modal */}

              <MDBModal tabIndex='-1' show={centredModal} setShow={setCentredModal}
              >
        <MDBModalDialog centered> 
          <MDBModalContent>
            <MDBModalHeader>
              
              <MDBModalTitle> <MDBIcon fas icon="cogs" className="pe-3"/> Confirm Transfer?</MDBModalTitle>
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
          </MDBContainer>

          
        </form>
      </MDBContainer>
               

    </MDBCol>
  );
};

export default TransferPointsForm;
