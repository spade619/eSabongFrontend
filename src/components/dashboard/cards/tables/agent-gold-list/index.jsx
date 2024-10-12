import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import AgentGoldListTableRow from "./row";


// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { findGoldAgents } from "../../../../../redux/slices/users";
import { searchPlayer } from "../../../../../redux/slices/users";

const AgentGoldListTable = () => {
  // // ** Vars
  // const dispatch = useDispatch();

  // // ** States
  // const storeUsers = useSelector((state) => state.users);

  // const handleSearch = async (e) => {
  //   const data = {
  //     role: "gold",
  //     searchValue: e.target.value,
  //   };

  //   await dispatch(searchPlayer(data));
  // };

  // // const handleViewAll = async () => {
  // //   document.getElementById("search").value = "";
  // //   await dispatch(findGoldAgents());
  // // };

  // useEffect(() => {
  //   dispatch(findGoldAgents());
  // }, []);

  const auth = JSON.parse(localStorage.getItem("auth"));
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);
  const [allUsers, setAllUsers] = useState([])
  const [typedLetter, setTypedLetter] = useState('')
  const [typeLetterLoading, setTypeLetterLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10)

  const handleSearch = async (e) => {
    // const data = {
    //   role: "master",
    //   searchValue: e.target.value,
    // };

    // await dispatch(searchPlayer(data));

    setTypedLetter(e.target.value)
  };

  // const handleViewAll = async () => {
  //   document.getElementById("search").value = "";
  //   await dispatch(findMasterAgents());
  // };


  useEffect(() => {
   
    if(typedLetter !== ''){
      setTypeLetterLoading(true);
      const filterUsers = allUsers && allUsers.filter((Users) => 
 Users.username.toLowerCase().includes(typedLetter)
 )
      setAllUsers(filterUsers)
      setTimeout(() => setTypeLetterLoading(false), 2000);
    }else{
      
      
      setTypeLetterLoading(true);
      const getAllUsers = async(auth) => {
        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "users", {
          headers: {'Authorization': `Bearer ${auth.jwt}`},
    
          
      })
    
        const json = await response.json()
         
    
         if(response.ok){
          const filterByRole =  json.filter((Users) => {
            return auth.user.role.description === "superadmin" || auth.user.role.description === "CSR"  
            || auth.user.role.description === "accountant" ? Users.role.description ==='gold': 
            Users.role.description ==='gold' && Users.referrer.id === auth.user.id
           })
                
                setAllUsers(filterByRole)
                setTypeLetterLoading(false);
         }
    
         
        }
        getAllUsers(auth)
    }
    
     }, [typedLetter]);


            //slice all filtered users 
const indexOfLastUsers = currentPage * usersPerPage
const indexOfFirstUsers = indexOfLastUsers - usersPerPage
const currentUsersDisplayed = allUsers.slice(indexOfFirstUsers, indexOfLastUsers)

 
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };




  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 agl-table-container h-100">
        <MDBContainer fluid className="p-2">
          <div className="form-group position-relative">
            <MDBIcon fas icon="search" className="agl-search-icon" size="lg" />
            <input
              type="text"
              className="form-control agl-search"
              onKeyUp={handleSearch}
              id="search"
              placeholder="Search by Username"
            />
          </div>
        </MDBContainer>
        {/* <MDBContainer
          fluid
          className="px-2 d-flex align-items-center justify-content-between mb-3"
        >
          <MDBBtn className="agl-view-btn" onClick={handleViewAll}>
            <MDBIcon fas icon="eye" /> VIEW ALL
          </MDBBtn>
          <MDBBtn
            className="agl-refresh-btn"
            onClick={() => window.location.reload()}
          >
            <MDBIcon fas icon="redo-alt" /> REFRESH
          </MDBBtn>
        </MDBContainer> */}

<MDBContainer
        fluid
        className="px-0 mb-3 d-flex align-items-center justify-content-center"
      >
        <button
          className="tc-pager"
          role="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <MDBIcon fas icon="angle-double-left" />
        </button>
        <div className="tc-page">{currentPage}</div>
        <button
          className="tc-pager"
          role="button"
          onClick={handleNextPage}
          disabled={currentUsersDisplayed.length < 10}
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>

        <div className="table-responsive">
          <table className="agl-table h-100">
            <thead>
              <tr className="agl-line">
                <th scope="col" className="text-truncate">
                  UID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                {/* <th scope="col" className="text-truncate">
                  COMMISSION RATE
                </th> */}
                <th scope="col" className="text-truncate">
                  POINTS
                </th>
                <th scope="col" className="text-truncate">
                  AVAILABLE COMMISSIONS
                </th>
                {/* <th scope="col" className="text-truncate">
                  SUB ROLE
                </th> */}
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  VERIFIED
                </th>
                <th scope="col" className="text-truncate">
                  ACTIONS
                </th>
                <th></th>
                <th scope="col" className="text-truncate">
                  REGISTER DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {!currentUsersDisplayed ? (
               

                      <tr>
                    <td colSpan={12} className="text-center">
                    No Result Found.
                        </td>
                            </tr>
              ) : currentUsersDisplayed.length ? (
                currentUsersDisplayed && currentUsersDisplayed.map((currentUsersDisplayed) => (
                  <AgentGoldListTableRow  allUsers={currentUsersDisplayed} key={`tr-${currentUsersDisplayed.id}`} />
                ))
              ) : typeLetterLoading ? (

                <tr>
                <td colSpan="12" className="text-center">
                  <div className="spinner-border text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
              ): (
                <tr>
                  <td colSpan={12} className="text-center">
                    No Result Found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </MDBContainer>
    </MDBCol>
  );
};

export default AgentGoldListTable;
