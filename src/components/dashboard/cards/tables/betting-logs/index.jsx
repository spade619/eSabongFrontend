import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import BettingLogsTableRow from "./row";
 
const BettingLogsTable = () => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [betLogs, setBetlogs] = useState()
  const [arenas, setArenas] = useState('')


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auth'))



    const fetchBettingLogs = async(user) => {

      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `betting-logs?_sort=createdAt:DESC&_limit=${itemsPerPage}&_start=${(currentPage -1)*itemsPerPage}`, {
        headers: {'Authorization': `Bearer ${user.jwt}`},

        
    })
  
      const json = await response.json()
        
       
    

        if(response.ok) {
          console.log(json)
          setBetlogs(json)
        }
  
    }
    
    fetchBettingLogs(user)
 
    
 
}, [currentPage, itemsPerPage])

 




const handlePreviousPage = () => {
  setCurrentPage(currentPage - 1);
};

const handleNextPage = () => {
  setCurrentPage(currentPage + 1);
};






useEffect(() => {
  const user = JSON.parse(localStorage.getItem('auth'))


  const fetchArenas = async(user) => {

    const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `arenas`, {
      headers: {'Authorization': `Bearer ${user.jwt}`},

      
  })

    const json = await response.json()
      
     
  

      if(response.ok) {
        console.log('arenas', json)
        setArenas(json)
      }

  }
  
  fetchArenas(user)

  

}, [])

console.log('state', arenas)
// console.log('betlogsid', betLogs[0].id)
// console.log('arenaiod', arenas[0].id)


  return (
    <MDBCol className="px-3">

<MDBContainer
            fluid
            className="px-0 mb-3 d-flex align-items-center justify-content-center"
          >
            <button
              className="tp-pager"
              role="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <MDBIcon fas icon="angle-double-left" />
            </button>
            {/* <div className="tp-page">{currentPage}</div> */}
            <div className="tp-page">{currentPage}</div>
            {/* <span className="tp-page-dot">...</span> */}
            {/* <div className="tp-page">3091</div> */}
            <button
              className="tp-pager"
              role="button"
              onClick={handleNextPage}
              // disabled={storeUsers.topPoints.length < itemsPerPage}
              disabled={betLogs < itemsPerPage}
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>


      <MDBContainer fluid className="px-0 blt-table-container h-100">
        <div className="table-responsive">
          <table className="blt-table h-100">
            <thead>
              <tr className="blt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                <th scope="col" className="text-truncate">
                  TYPE
                </th>
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  ARENA
                </th>
                <th scope="col" className="text-truncate">
                  FIGHT NO.
                </th>
                <th scope="col" className="text-truncate">
                  BET AMOUNT
                </th>
                <th scope="col" className="text-truncate">
                  TEAM
                </th>
                {/* <th scope="col" className="text-truncate">
                  DETAILS
                </th> */}
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>

              {!betLogs ? (
                      
                <tr>
                <td colSpan="12" className="text-center">
                  <div className="spinner-border text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
                            ) : 
                            betLogs.length ? (
              betLogs && betLogs.map((betLogs) => (
                <BettingLogsTableRow key={`tr-${betLogs.id}`} betLogs={betLogs} arenas={arenas}/>
              ))
              ) : (


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

export default BettingLogsTable;
