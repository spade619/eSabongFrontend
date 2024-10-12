import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";

// ** Modals
import AgentProfileModal from "./profile-modal";
import AgentTransactionHistory from "./transaction-history-modal";
import AgentChangePassword from './changePassword'
import AgentEditCommissionRate from './editCommissionRate'

const AgentMasterListTableRow = ({ allUsers }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="asl-sid">{allUsers.id}</div>
      </td>
      <td className="text-truncate">{allUsers.username}</td>
      {/* <td className="text-truncate">10%</td> */}
      <td className="text-truncate">{allUsers.points}</td>
      <td className="text-truncate">{allUsers.commision}</td>
      {/* <td className="text-truncate">master_agent</td> */}

      {/* <td className="text-truncate">
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
      </td> */}

<td className="text-truncate">
        {allUsers.status === 'active' ? (
          
          <div className="afl-status-active">
            <MDBIcon fas icon="check-circle" />
            &nbsp;&nbsp;Active
          </div>
        ) : allUsers.status==='deactivated' ?(
          <div className="afl-status-blocked">
            <MDBIcon fas icon="minus-circle" />
            &nbsp;&nbsp;Blocked
          </div>
        ):(<div className="afl-status-blocked">
        <MDBIcon fas icon="minus-circle" />
        &nbsp;&nbsp;Approval
      </div>)}
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

      {allUsers.status==="active" ||auth.user.role.description === 'superadmin' ?(<td><AgentEditCommissionRate data={allUsers}/></td>
      ):(<td></td>)}

      {auth.user.role.description === 'superadmin' ?
    <td className="ps-0">
    <AgentChangePassword data={allUsers}/>
  </td> : <td></td>}
        

  
      <td className="text-truncate">
        <div className="asl-date">
          {" "}
          {new Date(allUsers.updatedAt).toLocaleString()}
        </div>
      </td>
    </tr>

    // --------------------------------------------------------------------

    //   <tr className="text-center">
    //   <td className="text-truncate">
    //     <div className="aml-sid">{item.data.id}</div>
    //   </td>
    //   <td className="text-truncate">{item.data.username}</td>
    //   <td className="text-truncate">10%</td>
    //   <td className="text-truncate">{item.data.points}</td>
    //   <td className="text-truncate">{item.data.commision}</td>
    //   <td className="text-truncate">master_agent</td>
    //   <td className="text-truncate">
    //     {item.data.isActive ? (
    //       <div className="afl-status-active">
    //         <MDBIcon fas icon="check-circle" />
    //         &nbsp;&nbsp;Active
    //       </div>
    //     ) : (
    //       <div className="afl-status-blocked">
    //         <MDBIcon fas icon="minus-circle" />
    //         &nbsp;&nbsp;Blocked
    //       </div>
    //     )}
    //   </td>
    //   <td className="text-truncate">
    //     {item.data.isVerified ? (
    //       <div className="afl-verification-verified">
    //         <MDBIcon fas icon="check" />
    //         &nbsp;&nbsp;Verified
    //       </div>
    //     ) : (
    //       <div className="afl-verification-unverified">
    //         <MDBIcon fas icon="times" />
    //         &nbsp;&nbsp;Unverified
    //       </div>
    //     )}
    //   </td>
    //   <td className="text-truncate">
    //     <AgentProfileModal data={item.data} />
    //     <AgentTransactionHistory data={item.data} />
    //   </td>
    //   <td className="text-truncate">
    //     <div className="aml-date">
    //       {" "}
    //       {new Date(item.data.createdAt).toLocaleString()}
    //     </div>
    //   </td>
    // </tr>
  );
};

export default AgentMasterListTableRow;
