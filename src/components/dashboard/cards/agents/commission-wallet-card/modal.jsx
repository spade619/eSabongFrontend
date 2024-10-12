// ** React
import React, { useState } from "react";

// ** Third Party Components
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";

// ** Redux
import { useDispatch } from "react-redux";
import {
  convert,
  myConvertedComms,
} from "../../../../../redux/slices/convertCommision";
import { ME } from "../../../../../redux/slices/users";

const CommsWalletModal = (wallet) => {
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth"));

  const toggleShow = () => setCentredModal(!centredModal);

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    setDisabled(true);

    const { amount } = e.target;

    const data = {
      amount: amount.value,
      user_id: auth.user.id,
    };

    if (amount.value) {
      if (Number(wallet.amount) > Number(amount.value)) {
        try {
          const result = await dispatch(convert(data));

          if (result.type === "convertCommission/fulfilled") {
            toast.success(`Commission Successfully Transfered`, {
              id: toastId,
              duration: 4000,
            });
            setCentredModal(false);
            setDisabled(false);
            dispatch(ME(auth.user.id));
            dispatch(myConvertedComms(auth.user.id));
          } else {
            toast.error("Commission Failed To Transfer", {
              id: toastId,
              duration: 4000,
            });
            setCentredModal(false);
            setDisabled(false);
          }
        } catch (err) {
          toast.error("Something Went Wrong Please Try Again", {
            id: toastId,
          });
          setDisabled(false);
        }
      } else {
        toast.error("Commission Amount Is Insufficient", {
          id: toastId,
        });
        setDisabled(false);
      }
    } else {
      toast.error("Enter Amount To Transfer", {
        id: toastId,
      });
      setDisabled(false);
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleShow} className="commswc-transfer">
        <MDBIcon fas icon="exchange-alt" />
        &nbsp;&nbsp;TRANSFER
      </MDBBtn>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="commswc-modal-body">
            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-5 d-flex align-items-center justify-content-between mt-3 mb-4"
              >
                <div className="commswc-modal-title">ENTER AMOUNT</div>
                <MDBIcon
                  onClick={toggleShow}
                  fas
                  icon="times"
                  className="text-warning commswc-modal-exit"
                  role="button"
                  size="2x"
                />
              </MDBContainer>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="d-flex align-items-center commswc-form-container p-2 mx-5">
                  <div className="flex-grow-1">
                    <input
                      type="number"
                      name="amount"
                      step="any"
                      min="0"
                      className="form-control commswc-modal-input shadow-0"
                    />
                  </div>
                  {/* <MDBBtn className="commswc-modal-clear">
                    <MDBIcon fas icon="window-close" size="3x" />
                  </MDBBtn> */}
                </div>
                <MDBContainer fluid className="px-5 mt-4 text-center">
                  <MDBBtn
                    className="commswc-confirm-btn px-5"
                    disabled={disabled}
                  >
                    <MDBIcon fas icon="check" />
                    &nbsp;&nbsp;CONFIRM
                  </MDBBtn>
                </MDBContainer>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default CommsWalletModal;
