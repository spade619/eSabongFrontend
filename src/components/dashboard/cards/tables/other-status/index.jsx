import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import React from "react";
import "./index.css";

const OtherStatusTable = (data) => {
  return (
    <MDBCol xxl={6} className="mb-2">
      <MDBContainer fluid className="px-0 other-status-table-container">
        <table className="other-status-table">
          <thead>
            <tr className="other-status-line">
              <th scope="col">
                <span className="ms-3">Other Statistics</span>
              </th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Total System Points
                <br />
                <small>Total Points of all registered users.</small>
              </td>
              <td>{data.systemPoints}</td>
            </tr>
            <tr>
              <td>Total Active Players</td>
              <td>{data.activePlayers}</td>
            </tr>
            <tr>
              <td>Total Active Agents</td>
              <td>{data.activeAgents}</td>
            </tr>
            <tr>
              <td>Total Cash-ins</td>
              <td>{data.cashIns}</td>
            </tr>
            <tr>
              <td>Total Cashout</td>
              <td>{data.cashOut}</td>
            </tr>
            <tr>
              <td>Total Blocked Users</td>
              <td>{data.blockedUsers}</td>
            </tr>
          </tbody>
        </table>
      </MDBContainer>
    </MDBCol>
  );
};

export default OtherStatusTable;
