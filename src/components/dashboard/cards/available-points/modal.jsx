// ** React
import { useState } from "react";

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
import { cashin, allCashIn } from "../../../../redux/slices/cashin";
import { ME } from "../../../../redux/slices/users";

const CashInPoints = () => {
  const dispatch = useDispatch();
  const [centredModal, setCentredModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth"));

  const toggleShow = () => setCentredModal(!centredModal);

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();

    const { amount } = e.target;

    const data = {
      amount: amount.value,
      user_id: auth.user.id,
    };

    if (amount.value) {
      try {
        const result = await dispatch(cashin(data));

        if (result.type === "cashin/fulfilled") {
          toast.success(`Cash In Success`, {
            id: toastId,
            duration: 4000,
          });
          window.location.reload();
        } else {
          toast.error("Cash In failed please try again.", {
            id: toastId,
            duration: 4000,
          });
          setDisabled(false);
          setCentredModal(false);
        }
      } catch (err) {
        setDisabled(false);
        toast.error("Something Went Wrong Please Try Again", {
          id: toastId,
        });
      }
    } else {
      setDisabled(false);
      toast.error("Enter Amount To Transfer", {
        id: toastId,
      });
    }
  };

  return (
    <>
      <div className="available-points-btn" role="button" onClick={toggleShow}>
        <MDBIcon fas icon="plus-square" size="xl" />
      </div>

      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered size="lg">
          <MDBModalContent className="commswc-modal-body">
            <MDBModalBody>
              <MDBContainer
                fluid
                className="px-5 d-flex align-items-center justify-content-between mt-3 mb-4"
              >
                <div className="commswc-modal-title">ENTER CASH IN AMOUNT</div>
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

export default CashInPoints;
