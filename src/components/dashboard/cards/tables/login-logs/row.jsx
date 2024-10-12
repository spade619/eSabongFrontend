import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";

const LoginLogsTableRow = (item) => {
  console.log(item)
  console.log(item.data.user_id.onlineStatus)

  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>
      <td className="text-truncate">{item.data.user_id.username}</td>
      <td className="text-truncate">
      {/* item.data.event */}
       { item.data.user_id.onlineStatus ?
        <div className="llt-login">
          <MDBIcon fas icon="sign-in-alt" /> Login
        </div>
        :
        <div className="llt-logout">
          <MDBIcon fas icon="sign-out-alt" /> Logout
        </div>
          
          }


      </td>
      <td className="text-truncate">{item.data.user_id.country}</td>
      <td className="text-truncate">
        <div className="llt-ip">{item.data.ipAddress}</div>
      </td>

      {item.data.user_id.onlineStatus ? <td className="text-truncate">
        <div className="llt-ip bg-success">Online</div>
      </td> 
      
      : 
      
      <td className="text-truncate">
        <div className="llt-ip bg-danger">Offline</div>
      </td>}

      <td className="text-truncate">
        <div className="llt-date">
          {" "}
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
    </tr>
  );
};

export default LoginLogsTableRow;
