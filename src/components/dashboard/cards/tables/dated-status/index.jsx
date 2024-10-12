import { MDBCol, MDBContainer, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

// ** Redux
import { useSelector } from "react-redux";

const DatedStatusTable = ({
  regularCommsCurrent,
  regularCommsLast,
  drawCommsCurrent,
  drawCommsLast,
  agentCommsCurrent,
  agentCommsLast,
  companyCommsCurrent,
  companyCommsLast,
}) => {
  const storeCommissionHistory = useSelector(
    (state) => state.commissionHistory
  );

  return (
    <MDBCol xxl={6} className="mb-2">
      <MDBContainer fluid className="px-0 dated-status-table-container h-100">
        <table className="dated-status-table h-100">
          <thead>
            <tr className="dated-status-line">
              <th scope="col">
                <span className="ms-3">Statistics</span>
              </th>
              <th scope="col">
                <span className="ms-3">Current Month</span>
              </th>
              <th scope="col">
                <span className="ms-3">Last Month</span>
              </th>
            </tr>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regular Earnings</td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  regularCommsCurrent
                )}
              </td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  regularCommsLast
                )}
              </td> 
            </tr>
            <tr>
              <td>Draw Earnings</td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  drawCommsCurrent
                
                )}
              </td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  drawCommsLast
                  
                )}
              </td>
            </tr>
            <tr>
              <td>Company Earnings</td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  companyCommsCurrent
                )}
              </td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  companyCommsLast
                )}
              </td>
            </tr>
            <tr>
              <td>Agents Earnings</td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  agentCommsCurrent
                )}
              </td>
              <td>
                {storeCommissionHistory.statisticsIsLoading ? (
                  <MDBSpinner role="status" grow size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </MDBSpinner>
                ) : (
                  agentCommsLast
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </MDBContainer>
    </MDBCol>
  );
};

export default DatedStatusTable;
