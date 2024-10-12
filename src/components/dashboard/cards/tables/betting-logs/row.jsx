import { MDBIcon } from "mdb-react-ui-kit";
import React from "react";




const BettingLogsTableRow = ({betLogs, arenas}) => {
 
 
  const formatDate= new Date(betLogs.published_at).toLocaleDateString('en-us', {
      hour: '2-digit',
      minute: '2-digit'
  })
  

// console.log('this is test', betLogs.arena_id.eventName)
// console.log('this is test', betLogs.user_id.username)
console.log('this is test', betLogs)

  return (
    <tr className="text-center">
      <td className="text-truncate">{betLogs.id}</td>
      <td className="text-truncate d-flex justify-content-center">
        <div className="blt-type text-center ">
          <MDBIcon fas icon="location-arrow" /> bets-{betLogs.type}
        </div>
      </td>
      <td className="text-truncate">{betLogs.user_id.username}</td>
      <td className="text-truncate">{betLogs.arena_id.eventName}</td>
      <td className="text-truncate">{betLogs.arena_id.round}</td>
      <td className="text-truncate">{betLogs.betAmount}</td>
      <td className="text-truncate">{betLogs.team}</td>
     {/* <td className="text-truncate">
         <small>
          System has fully returned {betLogs.user_id.points}points to {betLogs.user_id.username} due to cancelled
          fight. 
        </small>
      </td>*/}
      <td className="text-truncate">
        <div className="blt-date">{formatDate}</div>
      </td>
    </tr>
  );
};

export default BettingLogsTableRow;
