import { MDBCol, MDBContainer, MDBRow,MDBIcon } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./index.css";

// ** Redux
// -

const CommissionsTableList = () => {
  // ** Vars
  // const dispatch = useDispatch();

  // ** States
//   const storeConvertCommision = useSelector((state) => state.convertCommision);
  const [recievedCommissions, setRecievedCommissions] = useState([{}])
  const [filteredUserCommission, setFilteredUserCommission] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [commissionLoading, setCommissionLoading] = useState(true)


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = recievedCommissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recievedCommissions.length / itemsPerPage);

  // ** Login User
  const auth = JSON.parse(localStorage.getItem("auth"));


  useEffect(() => {
       //-------------------------FETCH ALL COMMISSION HISTORIES----------------------------------------
 const limit = 100;
 let offset = 0; // starting index of the first object to retrieve
 let objects = []; // array to hold all the retrieved objects
 console.log('this is all the obhjhects', objects)
       
  const fetchCommissionHistories = async(user) => {
   
  
   const allCommissionHistory = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `commission-histories?_sort=createdAt:DESC&_limit=${limit}&_start=${offset}`, {
    
     headers: {'Authorization': `Bearer ${user.jwt}`}, 
       })
     const allCommissionHistoryResponse = await allCommissionHistory.json() 
         
     if(allCommissionHistory.ok) {
       objects = objects.concat(allCommissionHistoryResponse)
       offset += limit 
       if(allCommissionHistoryResponse.length === limit){

         const users = JSON.parse(localStorage.getItem('auth'))
         await fetchCommissionHistories(users) //fetch the next page recursively if objects are more than 100
        
       }
       setRecievedCommissions(objects)
   
     }
 }
 
 
 fetchCommissionHistories(auth)
 .then(() => {

    const filteredUser = objects.filter(item => {
       
            return item.agent_id.id === auth.user.id
     
     
    })

    setFilteredUserCommission(filteredUser)
    setCommissionLoading(false)
  
 
})
.catch((error) => {
  console.error('wtf', error);
});

  }, []);

  console.log('this is from recieved', recievedCommissions)

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  const currentDate = new Date();
  const optionsDate = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  return (
    <MDBCol className="h-100">
      <div className="bg-warning text-center text-light square border-bottom   border-light border-3"  style={{borderTopRightRadius: "0.5rem", borderTopLeftRadius: "0.5rem"}}>
        Commissions History</div>
        <MDBRow className="mx-0 square border-bottom   border-light border-3" >
        <MDBCol className="text-center text-light px-0 mx-0 " >
      Date
        </MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 " >
       Arena Name
        </MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 " >
       Fight #
        </MDBCol>
        <MDBCol className="text-center text-light px-0 mx-0 " >
       Commission Points
        </MDBCol>
        </MDBRow>
      <MDBContainer fluid className="bg-warning px-0 atl-table-container h-100" style={{maxHeight:"180px"}}>
        <div className="table-responsive" style={{height:"140px"}}>
          <table className="atl-table h-100">
         
            <tbody className="text-center" >
             
              {commissionLoading ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) :filteredUserCommission.length > 0? (
                currentItems?.map((item, index) => (
                  <tr key={index}  className="text-center" style={{maxHeight:"50px"}}>
                    <td className="text-truncate px-0" style={{width:"180px"}}>{new Date(item.createdAt).toLocaleDateString(undefined, optionsDate)}</td>
                    <td className="text-truncate px-0" style={{width:"180px"}}>{item.arena_id.eventName}</td>
                    <td className="text-truncate px-0" style={{width:"180px"}}>{item.arena_id.round}</td>
                    <td className="text-truncate px-0" style={{width:"180px"}}>{item.commision}</td>
                   
                  </tr>
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

        <MDBContainer
            fluid
            className="px-0 mb-3 d-flex align-items-center justify-content-center"
          >
            <button
              className="tp-pager"
           
              role="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || commissionLoading}
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
              disabled={totalPages <= currentPage || commissionLoading}
            //   disabled={betLogs < itemsPerPage}
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>

      </MDBContainer>
    </MDBCol>
  );
};

export default CommissionsTableList ;
