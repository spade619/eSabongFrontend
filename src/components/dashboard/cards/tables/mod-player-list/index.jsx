import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import ModPlayerListTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { findPlayerUser } from "../../../../../redux/slices/users";
import { searchPlayer } from "../../../../../redux/slices/users";

const ModPlayerListTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const storeUsers = useSelector((state) => state.users);
  // console.log('nelmi', storeUsers.tableLoader)
  const [typedLetter, setTypedLetter] = useState('')
  const [typeLetterLoading, setTypeLetterLoading] = useState(false);
  const [playerUsers, setPlayerUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10)
  

  const handleSearch = async (e) => {
  
    setTypedLetter(e.target.value)

  };


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('auth'))

    if(typedLetter !== ''){
      setTypeLetterLoading(true);
      const filterUsers = playerUsers && playerUsers.filter((Users) => 
 Users.username.toLowerCase().includes(typedLetter)
 )
 setPlayerUsers(filterUsers)
 setTimeout(() => setTypeLetterLoading(false), 2000);
    }else{
      setTypeLetterLoading(true);

      const fetchPlayerUser = async(user) => {

        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "users", {
          headers: {'Authorization': `Bearer ${user.jwt}`},
  
          
      })
    
        const json = await response.json()
          // console.log(json)
         
        if(response.ok) {
         const filterPlayer =  json.filter((Users) => {
            return  Users.role.description ==='player'
       
          })
              
        
           setPlayerUsers(filterPlayer)
           setTypeLetterLoading(false);
  
          //  setPlayerUsers(json)
        }
      }
      fetchPlayerUser(user)
    }

   
}, [typedLetter])



//slice all filtered users 
const indexOfLastUsers = currentPage * usersPerPage
const indexOfFirstUsers = indexOfLastUsers - usersPerPage
const currentUsersDisplayed = playerUsers.slice(indexOfFirstUsers, indexOfLastUsers)

  
      // console.log(currentUsersDisplayed)

    const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
    };
  
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };

  // useEffect(() => {
  //   dispatch(findPlayerUser());
  // }, []);

  // const handleSearch = async (e) => {
  //   const data = {
  //     role: "player",
  //     searchValue: e.target.value,
  //   };

  //   await dispatch(searchPlayer(data));
  // };

  // const handleViewAll = async () => {
  //   document.getElementById("search").value = "";
  //   await dispatch(findPlayerUser());
  // };

  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 mpl-table-container h-100">
        <MDBContainer fluid className="p-2">
          <div className="form-group position-relative">
            <MDBIcon fas icon="search" className="mpl-search-icon" size="lg" />
            <input
              type="text"
              className="form-control mpl-search"
              id="search"
              onKeyUp={handleSearch}
              placeholder="Search by Username"
            />
          </div>
        </MDBContainer>

        {/* <MDBContainer
          fluid
          className="px-2 d-flex align-items-center justify-content-between mb-3"
        >
          <MDBBtn className="mpl-view-btn" onClick={handleViewAll}>
            <MDBIcon fas icon="eye" /> VIEW ALL
          </MDBBtn>
          <MDBBtn
            className="mpl-refresh-btn"
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
          <table className="mpl-table h-100">
            <thead>
              <tr className="mpl-line">
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
                <th scope="col" className="text-truncate">
                 Ghost Mode
                </th>
              </tr>
            </thead>
            <tbody>
              { !currentUsersDisplayed? (
                  <tr>
                  <td colSpan={12} className="text-center">
                    No Result Found.
                  </td>
                </tr>
              ) : currentUsersDisplayed.length ? (
                currentUsersDisplayed.map((currentUsersDisplayed) => (
                  <ModPlayerListTableRow data={currentUsersDisplayed} key={`tr-${currentUsersDisplayed.id}`} />
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

export default ModPlayerListTable;
