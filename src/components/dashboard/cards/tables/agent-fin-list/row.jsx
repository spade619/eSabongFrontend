// ** React
import React from "react";

// ** Third Party Components
import { MDBIcon,  MDBBtn } from "mdb-react-ui-kit";

// ** Modals
import AgentProfileModal from "./profile-modal";
import AgentTransactionHistory from "./transaction-history-modal";
import AgentChangePassword from './changePassword'
import AgentEditCommissionRate from './editCommissionRate'

const AgentFinListTableRow = ({allUsers}) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
      
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="afl-sid">{allUsers.id}</div>
      </td>
      <td className="text-truncate">{allUsers.username}</td>
      {/* <td className="text-truncate">10%</td> */}
      <td className="text-truncate">{allUsers.points}</td>
      <td className="text-truncate">{allUsers.commision}</td>
      {/* <td className="text-truncate">master_agent</td> */}
      <td className="text-truncate">
        {allUsers.status ? (
          <div className="afl-status-active">
            <MDBIcon fas icon="check-circle" />
            &nbsp;&nbsp;Active
          </div>
        ) : (
          <div className="afl-status-blocked">
            <MDBIcon fas icon="minus-circle" />
            &nbsp;&nbsp;Blocked
          </div>
        )}
      </td>
      <td className="text-truncate">
        {allUsers.isVerified ? (
          <div className="afl-verification-verified">
            <MDBIcon fas icon="check" />
            &nbsp;&nbsp;Verified
          </div>
        ) : (
          <div className="afl-verification-unverified">
            <MDBIcon fas icon="times" />
            &nbsp;&nbsp;Unverified
          </div>
        )}
      </td>
      <td className="text-truncate">
        <AgentProfileModal data={allUsers} />
        <AgentTransactionHistory data={allUsers} />
      </td>

      <td><AgentEditCommissionRate data={allUsers}/></td>
      

{auth.user.role.description === 'superadmin' ?
    <td className="ps-0">
    <AgentChangePassword data={allUsers}/>
  </td> :  <td></td>
            }
        

      <td className="text-truncate">
        <div className="agl-date">
          {" "}
          {new Date(allUsers.createdAt).toLocaleString()}
        </div>
      </td>
    </tr>
    
  );
};

export default AgentFinListTableRow;
