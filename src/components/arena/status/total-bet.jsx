// ** React
import React, {useEffect, useState} from "react";
import  io from 'socket.io-client'
// ** Third Party Components
import { MDBCol, MDBContainer, MDBRow, MDBSpinner } from "mdb-react-ui-kit";

// ** Redux
import { useSelector } from "react-redux";

// ** Components
import AnimatedNumber from "../components/AnimatedNumber";
import socketClient from "../../../configs/socketClient";
const ArenaTotalBetHeader = ({data}) => {
  // ** States
  const storeCurrentRoundBets = useSelector((state) => state.currentRoundBets);   
  const [allbetData, setallBetData] = useState(0)
  const [fakeBet, setFakeBet] = useState(0)
  const [fakeBetMeron, setFakeBetMeron] = useState(0)
  const [fakeBetWala, setFakeBetWala] = useState(0)
  const [totalBetLoader, setTotalBetLoader] =useState(false)
  const [ghostMode, setGhostMode] = useState(true)
  const auth = JSON.parse(localStorage.getItem("auth"));

console.log('this is the ghost', auth.user.GhostMode)
  useEffect(() => {
    if(data.findOneArena.id){
      socketClient.emit('getArenaOverallBetsInitalLoad', data.findOneArena.id) 
    
    }
  }, [data])
  
  socketClient.emit('fakebetInitial', data.findOneArena.id) 
  useEffect(() => {
    socketClient.on('recieve_all_bets', (betData) => {  
      console.log('this is from the baxkend', betData) 
      setallBetData(betData)
      if(betData){
        setTotalBetLoader(true)
        setTotalBetLoader(false)   
      }
    })  

    socketClient.on('betfake', (newData) => {  
      console.log('this is from the new', newData) 
          // setFakeBet()
      if(newData.totalMeron !==0){
        setFakeBetMeron(newData.totalMeron)
      }else if(newData.totalWala !== 0){
          setFakeBetWala(newData.totalWala)
      }
    

    })

   
    socketClient.on('fakeBetInitialLoad', (initalData)=> {

      //fakebet for meron
const filteredMeronAmount = [];
let allMeronsum = 0;
initalData.filter((meronNumberData) => {
  // Filter condition
  return meronNumberData.team  === 'meron';
}).forEach((filteredNumber) => {
  // Push filtered numbers to a new array
  filteredMeronAmount.push(parseInt(filteredNumber.amount));
});

filteredMeronAmount.forEach((number) => {
  allMeronsum += number;
});
console.log('this is added fakebet', allMeronsum)
setFakeBetMeron(allMeronsum *5)
 
// --------------------------------------------------------------

const filteredWalaAmount = [];
let allWalasum = 0;
initalData.filter((walaNumberData) => {
  // Filter condition
  return walaNumberData.team  === 'wala';
}).forEach((filteredNumber) => {
  // Push filtered numbers to a new array
  filteredWalaAmount.push(parseInt(filteredNumber.amount));
});

filteredWalaAmount.forEach((number) => {
  allWalasum += number;
});
console.log('this is added fakebet wala', allWalasum)
setFakeBetWala(allWalasum *5)
      
  })


  }, [socketClient])

 
  return (
    <MDBCol>
      <MDBContainer fluid className="px-0 mb-2">
        <MDBContainer fluid className="p-1 arena-status-header text-center">
          <span>TOTAL BET</span>
        </MDBContainer>
        <MDBContainer
          fluid
          className="px-lg-0 px-xl-2 px-xxl-4 pt-2 pb-2 arena-status-body"
        >
          <MDBRow className="mx-0">
            <MDBCol size={6} className="px-1 px-xxl-3">
              <MDBContainer
                fluid
                className="arena-bet arena-bet-meron d-flex px-2 py-1"
              >
                <div className="me-2">MERON</div>
                <div className="arena-bet-value-meron flex-grow-1 animated-number">


                  {totalBetLoader ? (
                    <div className="d-flex justify-content-center">
                      <MDBSpinner role="status" size="sm" color="light" grow>
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  ) : (
                    <AnimatedNumber
                      // value={Number(storeCurrentRoundBets.totalMeron)}
                      value={allbetData ? (Number(allbetData.totalMeron+fakeBetMeron)):(0)}
                    />
                  )}
                </div>
              </MDBContainer>
            </MDBCol>

            <MDBCol size={6} className="px-1 px-xxl-3">
              <MDBContainer
                fluid
                className="arena-bet arena-bet-wala d-flex  px-2 py-1"
              >
                <div className="me-2">WALA</div>
                <div className="arena-bet-value-wala flex-grow-1 animated-number">
                  {totalBetLoader ? (
                    <div className="d-flex justify-content-center">
                      <MDBSpinner role="status" size="sm" color="light" grow>
                        <span className="visually-hidden">Loading...</span>
                      </MDBSpinner>
                    </div>
                  ) : (
                    <AnimatedNumber
                      // value={Number(storeCurrentRoundBets.totalWala)}
                      value={allbetData ? (Number(allbetData.totalWala+fakeBetWala)):(0)}
                  
                    
                    />
                  )}
                </div>
              </MDBContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    </MDBCol>
  );
};

export default ArenaTotalBetHeader;
