import { MDBBtn, MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import "./index.css";
import ModUserListTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { findModeratorUser } from "../../../../../redux/slices/users";
import { searchPlayer } from "../../../../../redux/slices/users";

const ModUserListTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  
  

  // ** States
  const storeUsers = useSelector((state) => state.users);
  const [typedLetter, setTypedLetter] = useState('')
  const [typeLetterLoading, setTypeLetterLoading] = useState(false);
  const [modUsers, setModUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10)
  

  const handleSearch = async (e) => {
  
    setTypedLetter(e.target.value)

  };


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('auth'))

    if(typedLetter !== ''){
      setTypeLetterLoading(true);

      const filterUsers = modUsers && modUsers.filter((Users) => 
 Users.username.toLowerCase().includes(typedLetter)
 )
  setModUsers(filterUsers)
  setTimeout(() => setTypeLetterLoading(false), 2000);
  
    }else{

      setTypeLetterLoading(true);
      const fetchModeratorUser = async(user) => {

        const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + "users", {
          headers: {'Authorization': `Bearer ${user.jwt}`},
  
          
      })
    
        const json = await response.json()
          
         
        if(response.ok) {
         const filterFinancers =  json.filter((Users) => {
            return  Users.role.description ==='moderator'
       
          })
              
           setModUsers(filterFinancers)
  
           setTypeLetterLoading(false);
          //  setModUsers(json)
        }
      }
      fetchModeratorUser(user)
    }

   
}, [typedLetter])



//slice all filtered users 
const indexOfLastUsers = currentPage * usersPerPage
const indexOfFirstUsers = indexOfLastUsers - usersPerPage
const currentUsersDisplayed = modUsers.slice(indexOfFirstUsers, indexOfLastUsers)

  


    const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
    };
  
    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
 
  return (
    <MDBCol className="px-3">
      <MDBContainer fluid className="px-0 mul-table-container h-100">
        <MDBContainer fluid className="p-2">
          <div className="form-group position-relative">
            <MDBIcon fas icon="search" className="mul-search-icon" size="lg" />
            <input
              type="text"
              className="form-control mul-search"
              id="search"
              onKeyUp={handleSearch}
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


        <div className="table-responsive">
          <table className="mul-table h-100">
            <thead>
              <tr className="mul-line">
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
                  <ModUserListTableRow data={currentUsersDisplayed} key={`tr-${currentUsersDisplayed.id}`} />
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

export default ModUserListTable;
