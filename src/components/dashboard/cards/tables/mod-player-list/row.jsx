// ** Third Party Components
import { MDBIcon,MDBSwitch } from "mdb-react-ui-kit";

// ** React
import React, {useState} from "react";

// ** Modals
import PlayerProfileModal from "./profile-modal";
import PlayerProfileEdit from "./edit-profile-modal";
import PlayerTransactionHistory from "./transaction-history-modal";

const ModPlayerListTableRow = (item) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  //const [selectedOption, setSelectedOption] = useState('');
  const [ghostModeToggler, setGhostModeToggler] = useState(true)
  const [ghostModeButton, setGhostModeButton] = useState(false)


  const handleOptionChange = async (mode, userId) => {
      console.log('this is the test', mode)
      console.log('this is the readio', userId)
       setGhostModeToggler(false)
      setGhostModeButton(true)
      // const value = event.target.value;
    // setSelectedOption(valu);

    try {
      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `users/${userId}`, {
        method: 'PUT',
        headers: {
           'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.jwt}` 
        },
        body: JSON.stringify({GhostMode: !mode})
      });

      const json = await response.json()
      if(response.ok) {
        console.log('roundNumberUpdated', json)
        setGhostModeButton(false)
        
       
      }
      // Handle response
      console.log(response);
    } catch (error) {
      console.log(error);
    } 

   
  }

  //console.log('this the selected option from radiobutton',selectedOption)
  
  return (
    <tr className="text-center">
      <td className="text-truncate">
        <div className="mpl-sid">{item.data.id}</div>
      </td>
      <td className="text-truncate">{item.data.username}</td>
      <td className="text-truncate">{item.data.points}</td>
      <td className="text-truncate">{item.data.role.name}</td>
      {/* <td className="text-truncate">Regular</td> */}
      <td className="text-truncate">{item.data.email}</td>
      <td className="text-truncate">{item.data.phoneNumber}</td>
      <td className="text-truncate">
        <div className="mpl-status-active">
          <MDBIcon fas icon="check-circle" />
          &nbsp;&nbsp;Active
        </div>
        {/* <div className="mpl-status-blocked">
          <MDBIcon fas icon="minus-circle" />
          &nbsp;&nbsp;Blocked
        </div> */}
      </td>
      {/* <td className="text-truncate">
        <div className="mpl-verification-verified">
          <MDBIcon fas icon="check" />
          &nbsp;&nbsp;Verified
        </div>
        <div className="mpl-verification-unverified">
          <MDBIcon fas icon="times" />
          &nbsp;&nbsp;Unverified
        </div>
      </td> */}
      <td className="text-truncate">
        <div className="mpl-date">
          {" "}
          {new Date(item.data.createdAt).toLocaleString()}
        </div>
      </td>
      <td className="text-truncate">
        <PlayerProfileModal data={item.data} />
        <PlayerTransactionHistory data={item.data} />
        {auth.user.role.description === 'CSR' ? null :  <PlayerProfileEdit data={item.data} />}
       
      </td>
      <td>
      <MDBSwitch id='flexSwitchCheckDefault'
                 // value={item.data.id}
                  defaultChecked={item.data.GhostMode}
                   disabled={ghostModeButton}
                  onChange={()=>handleOptionChange(item.data.GhostMode, item.data.id)}
                  />
      </td>
    </tr>
  );
};

export default ModPlayerListTableRow;
 