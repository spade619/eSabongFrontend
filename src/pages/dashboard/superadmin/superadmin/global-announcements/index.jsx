import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBIcon,  MDBModalBody,
  MDBModalContent, MDBModalDialog, MDBModal, MDBTypography,MDBInput, MDBFile, MDBTextArea  } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import DashboardTopNavigation from "../../../../../components/dashboard/topnav";

import "./index.css";

import AnnouncementRow from "./row";
import CreateModal from './createModal' 

const GlobalAnnouncements = () => {
  const [data,setData] = useState()
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);


  const auth = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    const fetchAnnouncement= async(user) => {

      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `admin-announcements?_sort=createdAt:ASC&_limit=${itemsPerPage}&_start=${(currentPage -1)*itemsPerPage}`, {
        headers: {'Authorization': `Bearer ${user.jwt}`},        
    })
  
     const json = await response.json()
       
        if(response.ok) {
        
           // console.log('asfasdas', ...json[0].media)
          //  setImgUrl(...json[0].media)
            setData(json)
        
        }
  
    }
    
    fetchAnnouncement(auth)
    
  }, [currentPage, itemsPerPage])

     

    console.log('testasd', data)


    const handlePreviousPage = () => {
      setCurrentPage(currentPage -1);
    };
    
    const handleNextPage = () => {
      setCurrentPage(currentPage +1);
    };
    
    
  return (
    <MDBContainer fluid className="px-0 dashboard-bg">
      <DashboardTopNavigation title="SUPER ADMIN / Global Announcements" />

    
    <CreateModal />
    
    
      <MDBContainer fluid className="px-0 mt-2">
        
        <div className="table-responsive">
          <table className="asl-table h-100">
            <thead>
              <tr className="asl-line">
              <th scope="col" className="text-truncate">
                ID
                </th>
               
                <th scope="col" className="text-truncate">
                 TITLE
                </th>
                
                <th scope="col" className="text-truncate">
                   IMAGE
                </th>

                <th scope="col" className="text-truncate">
                   DESCRIPTION
                </th>

                <th scope="col" className="text-truncate">
                  DATE POSTED
                </th>

              
                <th scope="col" className="text-truncate">
                  ACTION
                </th>

              
             
              </tr>
            </thead>

            <tbody>
             
      
              
              
            
            { data && data.map((announcements) =>(
                   <AnnouncementRow key ={`tr-${announcements.id}`} data={announcements}/>
            ))}
              
           

             
 
                </tbody>
                
            </table>
        </div>
      </MDBContainer>

      <MDBContainer
            fluid
            className=" mt-5 mb-3 d-flex align-items-center justify-content-center"
          >
            <button
              className="tp-pager"
              role="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <MDBIcon fas icon="angle-double-left" />
            </button>
            {/* <div className="tp-page">{currentPage}</div> */}
            <div className="tp-page">{currentPage}</div>
            {/* <span className="tp-page-dot">...</span> */}
            {/* <div className="tp-page">3091</div> */}
            <button
              className="tp-pager"
              role="button"
              onClick={handleNextPage}
              // disabled={storeUsers.topPoints.length < itemsPerPage}
              disabled={data < itemsPerPage}
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>
    </MDBContainer>
  );
};

export default GlobalAnnouncements;
