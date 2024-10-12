import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import PlayerProfileModal from "./profile-modal";
import PlayerDeactivate from "./playerDeactivate";
import PlayerReactivate from "./playerReactivate";

const PlayerActiveTableRow = (item) => {
  console.log('test', item)
  return (
    <tr className="text-center">
      <td className="text-truncate">{item.data.id}</td>

      <td className="text-truncate">{item.data.username}</td>
      <td className="text-truncate">{item.data.points}</td>
      <td className="text-truncate">{item.data.status}</td>
      <td className="text-truncate">---</td>

      {item.data.status ==="active" ?
      
      <td className="text-truncate"> 
        <PlayerProfileModal data={item}/>
        <PlayerDeactivate data={item}/>   
         </td>
         
         :
         
         <td className="text-truncate">
          <PlayerReactivate data={item}/>    
        </td>}
      
        
     
    </tr>
  );
};

export default PlayerActiveTableRow;
