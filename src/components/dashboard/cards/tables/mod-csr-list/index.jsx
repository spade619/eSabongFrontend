import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import ModCsrListTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { findCSRUser } from "../../../../../redux/slices/users";
import { searchPlayer } from "../../../../../redux/slices/users";

const ModCsrListTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);
  const [typedLetter, setTypedLetter] = useState('')
  const [typeLetterLoading, setTypeLetterLoading] = useState(false);
  const [csrUsers, setCsrUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10)
  

  const handleSearch = async (e) => {
  
    setTypedLetter(e.target.value)

  };


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('auth'))

    if(typedLetter !== ''){
      setTypeLetterLoading(true);
      const filterUsers = csrUsers && csrUsers.filter((Users) => 
 Users.username.toLowerCase().includes(typedLetter)
 )
 setCsrUsers(filterUsers)
 setTimeout(() => setTypeLetterLoading(false), 2000);
    }else{
      setTypeLetterLoading(true);

      const fetchCsrUser = async(user) => {

        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "users", {
          headers: {'Authorization': `Bearer ${user.jwt}`},
  
          
      })
    
        const json = await response.json()
          
         
        if(response.ok) {
         const filterCsr =  json.filter((Users) => {
            return  Users.role.description ==='CSR'
       
          })
              
          // console.log('test', filterCsr)
           setCsrUsers(filterCsr)
  
           setTypeLetterLoading(false);
          //  setCsrUsers(json)
        }
      }
      fetchCsrUser(user)
    }

   
}, [typedLetter])



//slice all filtered users 
const indexOfLastUsers = currentPage * usersPerPage
const indexOfFirstUsers = indexOfLastUsers - usersPerPage
const currentUsersDisplayed = csrUsers.slice(indexOfFirstUsers, indexOfLastUsers)

  
      // console.log(currentUsersDisplayed)

    const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
    };
  
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };

  // const handleSearch = async (e) => {
  //   const data = {
  //     role: "csr",
  //     searchValue: e.target.value,
  //   };

  //   await dispatch(searchPlayer(data));
  // };

  // useEffect(() => {
  //   dispatch(findCSRUser());
  // }, []);

  // const handleViewAll = async () => {
  //   document.getElementById("search").value = "";
  //   await dispatch(findCSRUser());
  // };

  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 mcl-table-container h-100">
        <MDBContainer fluid className="p-2">
          <div className="form-group position-relative">
            <MDBIcon fas icon="search" className="mcl-search-icon" size="lg" />
            <input
              type="text"
              className="form-control mcl-search"
              onKeyUp={handleSearch}
              id="search"
              placeholder="Search by Username"
            />
          </div>
        </MDBContainer>

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

        {/* <MDBContainer
          fluid
          className="px-2 d-flex align-items-center justify-content-between mb-3"
        >
          <MDBBtn className="mcl-view-btn" onClick={handleViewAll}>
            <MDBIcon fas icon="eye" /> VIEW ALL
          </MDBBtn>
          <MDBBtn
            className="mcl-refresh-btn"
            onClick={() => window.location.reload()}
          >
            <MDBIcon fas icon="redo-alt" /> REFRESH
          </MDBBtn>
        </MDBContainer> */}


        <div className="table-responsive">
          <table className="mcl-table h-100">
            <thead>
              <tr className="mcl-line">
                <th scope="col" className="text-truncate">
                  UID
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  BALANCE
                </th>
                <th scope="col" className="text-truncate">
                  ROLE
                </th>
                {/* <th scope="col" className="text-truncate">
                  SUB ROLE
                </th> */}
                <th scope="col" className="text-truncate">
                  EMAIL
                </th>
                <th scope="col" className="text-truncate">
                  REGISTERED MOBILE
                </th>
                <th scope="col" className="text-truncate">
                  STATUS
                </th>
                {/* <th scope="col" className="text-truncate">
                  VERIFICATION
                </th> */}
                <th scope="col" className="text-truncate">
                  REGISTER DATE
                </th>
                <th scope="col" className="text-truncate">
                  ACTIONS
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
                currentUsersDisplayed.map((currentUsersDisplayed) => (
                  <ModCsrListTableRow data={currentUsersDisplayed} key={`tr-${currentUsersDisplayed.id}`} />
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

export default ModCsrListTable;
