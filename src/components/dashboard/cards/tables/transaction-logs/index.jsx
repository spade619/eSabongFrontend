// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** React
import { useState, useEffect } from "react";

// ** Style
import "./index.css";

// ** Components
import TransactionLogsTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { transferLogs } from "../../../../../redux/slices/transferPoints";

const TransactionLogsTable = () => {

  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const storeTransfer = useSelector((state) => state.transferPoints);


  

  useEffect(() => {
    dispatch(
      transferLogs(
        `?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
      )
    );
   
   
  }, [currentPage, itemsPerPage]);

  
    // console.log('testing123', storeTransfer.transferLogs)
  // const [userTransactions, setUserTransactions] = useState()

  const auth = JSON.parse(localStorage.getItem("auth"));

  const filteredTransactionLogs = () => {
    let arr_data = []

    if(auth.user.role.description === 'superadmin' || auth.user.role.description === 'CSR'
    || auth.user.role.description === 'accountant'){
      for(let i=0; i<storeTransfer.transferLogs.length; i++){
         
       
       
          arr_data.push(storeTransfer.transferLogs[i])
        
          }
    }else{
      for(let i=0; i<storeTransfer.transferLogs.length; i++){
         
        if(storeTransfer.transferLogs[i].sender_id.id === auth.user.id ||
           storeTransfer.transferLogs[i].receiver_id.id === auth.user.id){
       
          arr_data.push(storeTransfer.transferLogs[i])
        }

        
  }
    }
    
  

    return arr_data
  }
  
   
  
 const userPersonalTransaction = filteredTransactionLogs() 

  
   
    


  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

 
  return (
    <MDBCol className="px-3">
       
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
          disabled={storeTransfer.transferLogs.length < itemsPerPage}
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>


      <MDBContainer fluid className="px-0 tlt-table-container h-100">
        <div className="table-responsive">
          <table className="tlt-table h-100">
            <thead>
              <tr className="tlt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                {/* <th scope="col" className="text-truncate">
                  ACTION
                </th> */}
                {/* <th scope="col" className="text-truncate">
                  BY
                </th> */}
                <th scope="col" className="text-truncate">
                  SENDER
                </th>
                <th scope="col" className="text-truncate">
                  TO
                </th>
                <th scope="col" className="text-truncate">
                  RECEIVER
                </th>
                <th scope="col" className="text-truncate">
                  AMOUNT
                </th>

                {/* <th scope="col" className="text-truncate">
                  NOTES
                </th> */}
                {/* <th scope="col" className="text-truncate">
                  STATUS
                </th>
                <th scope="col" className="text-truncate">
                  TYPE
                </th> */}
                {/* <th scope="col" className="text-truncate">
                  TRANSACTION NO.
                </th> */}
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {storeTransfer.isLoading ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : userPersonalTransaction  ? (
                userPersonalTransaction .map((userPersonalTransaction ) => (
                  <TransactionLogsTableRow data={userPersonalTransaction } key={`tr-${userPersonalTransaction.id}`} />
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

export default TransactionLogsTable;
