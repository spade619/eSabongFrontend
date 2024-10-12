// ** React
import { useEffect, useState } from "react";

// ** Third Party Components
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";

// ** Style
import "./index.css";

// ** Components
import CashoutLogsTableRow from "./row";

// ** Redux
import { useDispatch, useSelector } from "react-redux";
import { cashoutLogs } from "../../../../../redux/slices/cashout";

const CashoutLogsTable = () => {
  // ** Vars
  const dispatch = useDispatch();

  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const storeCashout = useSelector((state) => state.cashout);
         
  useEffect(() => {
    dispatch(
      cashoutLogs(
        `?_start=${(currentPage - 1) * itemsPerPage}&_limit=${itemsPerPage}`
      )
    );
  }, [currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


    console.log('cashlogstest', storeCashout.cashoutLogs )
  const auth = JSON.parse(localStorage.getItem("auth"));

  const filteredTransactionLogs = () => {
    let arr_data = []
    if(auth.user.role.description === 'superadmin' || auth.user.role.description === 'CSR'
    || auth.user.role.description === 'accountant'){
      for(let i=0; i<storeCashout.cashoutLogs.length; i++){
         
      
       
          arr_data.push(storeCashout.cashoutLogs[i])
        
        
  }
    }else{

    for(let i=0; i<storeCashout.cashoutLogs.length; i++){
         
          if(storeCashout.cashoutLogs[i].user_id.id === auth.user.id){
         
            arr_data.push(storeCashout.cashoutLogs[i])
          }
          
    }
  }

    return arr_data
  }
  
  
 const userPersonalTransaction = filteredTransactionLogs() 

 

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
          disabled={storeCashout.cashoutLogs.length < itemsPerPage}
        >
          <MDBIcon fas icon="angle-double-right" />
        </button>
      </MDBContainer>
      <MDBContainer fluid className="px-0 clt-table-container h-100">
        <div className="table-responsive">
          <table className="clt-table h-100">
            <thead>
              <tr className="clt-line">
                <th scope="col" className="text-truncate">
                  ID
                </th>
                {/* <th scope="col" className="text-truncate">
                  REF
                </th> */}
                <th scope="col" className="text-truncate">
                  USERNAME
                </th>
                <th scope="col" className="text-truncate">
                  ASSIGNED TO
                </th>
                <th scope="col" className="text-truncate">
                  AMOUNT
                </th>
                {/* <th scope="col" className="text-truncate">
                  DETAILS
                </th> */}
                <th scope="col" className="text-truncate">
                  LOG
                </th>
                <th scope="col" className="text-truncate">
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {storeCashout.isLoading ? (
                <tr>
                  <td colSpan="12" className="text-center">
                    <div className="spinner-border text-center" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : userPersonalTransaction ? (
                userPersonalTransaction.map((userPersonalTransaction) => (
                  <CashoutLogsTableRow data={userPersonalTransaction} key={`tr-${userPersonalTransaction.id}`} />
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

export default CashoutLogsTable;
