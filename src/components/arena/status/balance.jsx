import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React , {useEffect, useState} from "react";
import withdraw from "../../../assets/images/arena/withdraw.png";

import {selectAllSocketdata} from '../../../redux/slices/socket'
import socketClient from "../../../configs/socketClient";



import RequestCashoutModal from "./RequestCashoutModal";
import { useSelector } from "react-redux";

const ArenaBalanceAmount = () => {
  const playerBalanceData = useSelector(selectAllSocketdata)
  console.log('dataRecievedFromRedux', playerBalanceData)
 
  const [balanceValue, setBalanceValue] = useState(0)
  const [updatedBalanceValue, setUpdatedBalanceValue] = useState(0)
 
  
  const auth = JSON.parse(localStorage.getItem("auth"));
    useEffect(() => {

      socketClient.emit("get_user_info",  auth.user.id);

    }, []) 

    useEffect(() => {

    
      socketClient.on("recieve_user_info", (data) => {
          console.log('balanceComoponent', data)
          setBalanceValue(data.points)
      });

      socketClient.on(`refresh_player_balance`, (data) => {
        console.log('refresh player balance', data)
        socketClient.emit("get_user_info",  auth.user.id);
        
    });
      
     
     
    }, [socketClient])


    useEffect(() => {

      setUpdatedBalanceValue(playerBalanceData.response.amount)
      console.log('jolyShit', balanceValue)
    }, [balanceValue, playerBalanceData])
    

    


    // console.log('reduxBalancetesting', playerBalanceData)
    
    
  return (
    <MDBContainer fluid className="px-0 mb-2">
      <MDBContainer fluid className="p-1 arena-status-header text-center">
        <span>BALANCE</span>
      </MDBContainer>
      <MDBContainer
        fluid
        className="pt-1 pb-1 arena-status-body position-relative"
      >
        <img
          src={withdraw}
          alt="withdraw"
          className="aba-withdraw-btn"
          role="button"
        />
        <RequestCashoutModal />
        <MDBTypography tag="h3" className="text-center m-0">
          {((Math.round(!updatedBalanceValue?balanceValue:updatedBalanceValue)*1).toFixed(2))}
          {/* {(Math.round((item.amount || 0) * 100) / 100).toFixed(2)} */}
        </MDBTypography>
      </MDBContainer>
    </MDBContainer>
  );
};

export default ArenaBalanceAmount;
