// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBBtn, MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// ** Style
import "./index.css";

// ** Assets
import logo from "../../../assets/images/login/logo.png";

// ** Axios & Redux
import { postRequest } from "../../../configs/axiosClient";

const Login = () => {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("auth"));

  // React States
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (loginUser) {
      if (loginUser?.user?.role?.type === "player") {
        navigate(`/player/arenaList`);
      } else {
        navigate(`/dashboard/${loginUser?.user?.role?.type}/home`);
      }
    }
  }, [loginUser]);

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    setDisabled(true);
    e.preventDefault();

    const { username, password } = e.target;

    const data = {
      identifier: username.value,
      password: password.value,
    };

    try {
      const response = await postRequest("/users-permissions/user/login", data);

      const { status, role } = response.data.user;

      if (status === "approval") {
        toast.error("Your Account needs approval", {
          id: toastId,
          duration: 4000,
        });
        setDisabled(false);
      } else if (status === "deactivated") {
        toast.error("Your Account has been deactivated", {
          id: toastId,
          duration: 4000,
        });
        setDisabled(false);
      } else {
        localStorage.setItem("auth", JSON.stringify(response.data));
        // set online status to true
        const user = JSON.parse(localStorage.getItem("auth"));

        const ChangeOnlineStatus = async (user) => {
          const OnlineStatusChange = await fetch(
            process.env.REACT_APP_SGLIVE_API_URL + "users/" + user.user.id,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
                
              },

              body: JSON.stringify({ 
                onlineStatus: "true" }),
            }
          );

          const json = await OnlineStatusChange.json();

          if (OnlineStatusChange.ok) {
            //  setBetlogs(json)
            // console.log(user)
          }
        };

        ChangeOnlineStatus(user); 
        // -------------------------
        toast.success(`You are successfully logged in`, {
          id: toastId,
          duration: 4000,
        });
        setDisabled(false);

        if (role?.type === "player") {
          // setTimeout(() => {
          //   window.location.href = "/player/arenaList";
          // }, [4000]);
        } else {
          setTimeout(
            () => navigate(`/dashboard/${response.data.user.role.type}/home`),
            4000
          );
        }
      }
    } catch (error) {
      if (error?.response.data.statusCode === 401) {
        toast.error(error?.response.data.message, {
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
  }



  return (
    <MDBContainer
      fluid
      className="px-0 custom-login-bg d-flex align-items-center"
    >
      <Toaster />
      <MDBCol
        xxl={4}
        xl={6}
        lg={6}
        md={6}
        sm={8}
        size={10}
        className="offset-xxl-4 offset-xl-3 offset-lg-3 offset-md-3 offset-sm-2 offset-1 custom-login-panel-container"
      >
        <MDBContainer fluid className="px-0">
          <MDBContainer fluid className="px-0 text-center">
            <img
              src={logo}
              alt="logo"
              width={"150px"}
              className="img-fluid mt-2"
            />
            <MDBContainer
              fluid
              className="custom-login-panel pt-5 px-3 px-md-5 "
            >
              <form onSubmit={handleSubmit} autoComplete="off">
                <MDBContainer className="custom-login-form py-5">
                  <div className="form-group d-flex align-items-center mb-3 px-2 px-md-5">
                    <label
                      htmlFor="username"
                      className="me-3 text-white custom-login-label"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      className="form-control custom-login-input"
                      id="username"
                    />
                  </div>
                  <div className="form-group d-flex align-items-center mb-3 px-2 px-md-5">
                    <label
                      htmlFor="password"
                      className="me-3 text-white custom-login-label"
                    >
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      className="form-control custom-login-input"
                      id="password"
                    />
                  </div>
                </MDBContainer>
                {disabled ? (
                  <div className="my-3">
                    <div className="my-3">
                      <MDBBtn disabled className="me-2 custom-login-btn">
                        <MDBSpinner size="sm" role="status" tag="span" />
                        <span className="visually-hidden ">Loading...</span>
                      </MDBBtn>
                    </div>
                  </div>
                ) : (
                  <div className="my-3">
                    <div className="my-3">
                      <MDBBtn className="custom-login-btn">LOGIN</MDBBtn>
                    </div>
                  </div>
                )}
              </form>
            </MDBContainer>
          </MDBContainer>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
};

export default Login;
