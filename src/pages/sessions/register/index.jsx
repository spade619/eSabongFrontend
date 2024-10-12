// ** React
import { useEffect, useState } from "react";

// ** Style
import "./index.css";

// ** Third Party Components
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBTypography,
  MDBSpinner,
} from "mdb-react-ui-kit";

// ** Assets
import logo from "../../../assets/images/registration/logo.png";

// ** Axios
import { postRequest } from "../../../configs/axiosClient";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { findOne } from "../../../redux/slices/users";

const Register = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** Redux States
  const storeUsers = useSelector((state) => state.users);

  // React States
  const [role, setRole] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isReferrer, setIsReferrer] = useState(false);

  // ** Vars
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get("uid");
  const registrationType = urlParams.get("type");
  const loginUser = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    if (loginUser) {
      if (loginUser?.user?.role?.type === "player") {
        navigate(`/player/arenaList`);
      } else {
        navigate(`/dashboard/${loginUser?.user?.role?.type}/home`);
      }
    }
  }, [loginUser]);

  useEffect(() => {
    dispatch(findOne(uid));
  }, []);

  useEffect(() => {
    if (storeUsers.findOne.length === 0) {
      setIsReferrer(true);
    } else {
      setIsReferrer(false);
    }
    
    switch (storeUsers.findOne.role?.name) {
      case "Financer":
        if (registrationType === "egozic") {
          setRole(process.env.REACT_APP_SGLIVE_FINANCER_EGOZIC);
        } else {
          setRole(process.env.REACT_APP_SGLIVE_FINANCER_NOT_EGOZIC);
        }
        break;
      case "Sub":
        if (registrationType === "egozic") {
          setRole(process.env.REACT_APP_SGLIVE_SUB_EGOZIC);
        } else {
          setRole(process.env.REACT_APP_SGLIVE_SUB_NOT_EGOZIC);
        }
        break;
      case "Master":
        if (registrationType === "egozic") {
          setRole(process.env.REACT_APP_SGLIVE_MASTER_EGOZIC);
        } else {
          setRole(process.env.REACT_APP_SGLIVE_MASTER_NOT_EGOZIC);
        }
        break;
      case "Gold":
        setRole(process.env.REACT_APP_SGLIVE_GOLD_EGOZIC);
        break;
      case "Player":
        setRole(process.env.REACT_APP_SGLIVE_PLAYER_EGOZIC);
        break;
    }
  }, [storeUsers.findOne.length]);

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    setDisabled(true);
    e.preventDefault();
    const { username, email, password1, password2, number, country } = e.target;


    if (username.value.length < 8){
      toast.error("Username minimum characters of 8", {
        id: toastId,
      });
      setDisabled(false);
    }
    else if (password1.length < 6){
      toast.error("Password minimum characters of 8", {
        id: toastId,
      });
      setDisabled(false);
    }
    else if (password1.value !== password2.value){
      toast.error("Password is not the same", {
        id: toastId,
      });
      setDisabled(false);
    }
    else if (email.value === ""){
      toast.error("Please enter your email", {
        id: toastId,
      });
      setDisabled(false);
    }
    else if (number.value.length < 10){
      toast.error("Please put a valid cellphone number", {
        id: toastId,
      });
      setDisabled(false);
    }
    else if (number.value.length > 11){
      toast.error("Please put a valid cellphone number", {
        id: toastId,
      });
      setDisabled(false);
    }
    else if (country.value.length < 2){
      toast.error("Enter valid country", {
        id: toastId,
      });
      setDisabled(false);
    }
    else{
      if (password1.value === password2.value) {
        const data = {
          username: username.value,
          email: email.value,
          password: password1.value,
          country: country.value,
          status: "approval",
          role: role,
          referrer: storeUsers.findOne.id,
          phoneNumber: number.value,
        };
  
        if (!data.referrer) {
          toast.error("Referrer Not Found", {
            id: toastId,
          });
  
          setDisabled(false);
          return false;
        }
  
        try {
          const response = await postRequest("users", data);
          if (response.data) {
            toast.success(
              `Thanks for signing up. Your account has been created.`,
              {
                id: toastId,
                duration: 4000,
              }
            );
            setDisabled(false);
            setTimeout(() => navigate("/login"), 4000);
          }
        } catch (error) {
          if (error?.response?.data?.data?.[0]?.messages?.[0]?.message) {
            toast.error(
              error?.response?.data?.data?.[0]?.messages?.[0]?.message,
              {
                id: toastId,
              }
            );
            setDisabled(false);
          } else if (error.response.data.message) {
            toast.error(error.response.data.message, {
              id: toastId,
            });
            setDisabled(false);
          } else {
            toast.error("Something went wrong please try again", {
              id: toastId,
            });
            setDisabled(false);
          }
        }
      } else {
        setDisabled(false);
        toast.error(`Password Does Not Match.`, {
          id: toastId,
        });
      }
    }
  };
  return (
    <MDBContainer
      fluid
      className="custom-register-bg px-0 d-flex align-items-center"
    >
      <Toaster />
      <MDBCol
        xxl={4}
        xl={6}
        lg={6}
        md={6}
        sm={8}
        size={10}
        className="offset-xxl-4 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-2 offset-1 custom-register-panel-container"
      >
        <MDBContainer fluid className="px-0 text-center ">
          <img
            src={logo}
            alt="logo"
            width={"130px"}
            className="img-fluid mt-2"
          />
          <MDBContainer fluid className="px-0 custom-register-panel px-5">
            <MDBTypography className="custom-register-title text-center m-0 py-2">
              REGISTRATION
            </MDBTypography>
            <form id="myForm" onSubmit={handleSubmit} autoComplete="off">
              <MDBContainer className="custom-register-form px-md-5 px-3 py-5">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control custom-register-input"
                    placeholder="USERNAME"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control custom-register-input"
                    placeholder="E-MAIL ADDRESS"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="password1"
                    className="form-control custom-register-input"
                    placeholder="PASSWORD"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    name="password2"
                    className="form-control custom-register-input"
                    placeholder="CONFIRM PASSWORD"
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="number"
                    name="number"
                    className="form-control custom-register-input"
                    placeholder="MOBILE NUMBER"
                  />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="text"
                    name="country"
                    className="form-control custom-register-input"
                    placeholder="COUNTRY"
                  />
                </div>
                <div className="form-group custom-referrer-container">
                  <input
                    disabled
                    defaultValue={storeUsers.findOne.username}
                    type="text"
                    className="form-control custom-register-input"
                  />
                </div>
              </MDBContainer>
              {disabled ? (
                <div className="my-3">
                  <MDBBtn disabled className="me-2 custom-register-btn">
                    <MDBSpinner size="sm" role="status" tag="span" />
                    <span className="visually-hidden">Loading...</span>
                  </MDBBtn>
                </div>
              ) : (
                <div className="my-3">
                  <MDBBtn disabled={isReferrer} className="custom-register-btn">
                    PROCEED
                  </MDBBtn>
                </div>
              )}
            </form>
            <div>
              <MDBBtn
                color="transparent"
                className="p-0 shadow-0 fw-bold fs-6 mb-2 mt-2 text-capitalize"
              >
                Already have an account?
              </MDBBtn>
            </div>
          </MDBContainer>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
};

export default Register;
