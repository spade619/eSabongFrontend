import { MDBCol, MDBContainer, MDBRow, MDBBtn, MDBIcon,  MDBModalBody,
  MDBModalContent, MDBModalDialog, MDBModal, MDBTypography,MDBInput, MDBFile, MDBTextArea  } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import "./index.css";

import loadingImage from "../../../assets/images/logo.png";
import pic2 from "../../../assets/images/landing/news/image2.png";
import pic3 from "../../../assets/images/landing/news/image3.png";
import pic4 from "../../../assets/images/landing/news/image4.png";

const LandingNews = () => {
  // const [data,setData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
const [announcements,  setAnnouncement] = useState([])
const [loadingData, setLoadingData] = useState(false)
const [enablePagination, setEnablePagination] = useState(true)
   // const images = [pic1, pic2, pic3, pic4];
  const nowLoading = loadingImage


  useEffect(() => {
  
    const   fetchAnnouncements = async() => {
      setLoadingData(true)
   

      const response = await fetch(process.env.REACT_APP_SGLIVE_API_URL + `admin-announcements?_sort=createdAt:ASC&_limit=${itemsPerPage}&_start=${(currentPage -1)*itemsPerPage}`, {
        
    })
  
      const json = await response.json()
    
        if(response.ok) {
          console.log('this is the announcements', json)
          if(json.length ===0){
            setEnablePagination(true)
          }
          setEnablePagination(false)
          setAnnouncement(json)
          setLoadingData(false)
        }
  
    }
    
    fetchAnnouncements()
 
    
 
}, [currentPage, itemsPerPage])


const backgroundGray ="bg-secondary"
const backgroundLight ="bg-light"



const handlePreviousPage = () => {
  setCurrentPage(currentPage -1);
};

const handleNextPage = () => {
  setCurrentPage(currentPage +1);
};

  return (
    <MDBContainer id="news" fluid className="px-0 section-size-3">
      <MDBContainer fluid className="px-0">
        <MDBTypography tag="h2" className="py-4 fw-bold text-center news-title">
          NEWS AND EVENTS
        </MDBTypography>
        <MDBContainer fluid className="px-0">
          <MDBCol className={loadingData?backgroundGray:backgroundLight}>
            {/* <MDBContainer fluid className="px-0 news-card-container pb-5">
              {images.map((image, i) => (
                <div className="news-card" key={`image-${i}`}>
                  <div className="news-card-image">
                    <img src={image} alt={`chick-${i}`} />
                    <div className="news-card-date">
                      <div className="news-card-date-day">06</div>
                      <div className="news-card-date-my">
                        <span>2019</span>
                        <span>March</span>
                      </div>
                    </div>
                  </div>
                  <div className="news-card-title">
                    Why Lead Generation is Key for Business Growth
                  </div>
                  <div className="news-card-body">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Officiis, odit sed tempora recusandae aut incidunt eius
                    aliquid. Et sunt voluptate perferendis harum similique minus
                    aut, ut rerum, quidem dolorum consequatur!
                  </div>
                </div>
              ))}
            </MDBContainer> */}

                             


                        {loadingData?<div className="text-center">
                              {/* <span className="visually-hidden">Loading...</span> */}
                              <img src={nowLoading} alt={"loading image"} style={{ maxWidth: '25%', maxHeight:'25%'}}/>
                              <h1 className="mt-5">LOADING ANNOUNCEMENTS</h1>
                            </div>:  
                            
                            (announcements.length !==0 ?<MDBContainer fluid className="px-0 news-card-container pb-5 text-center">
                            {announcements.map((news, i) => (
                              <div className="news-card my-3 mx-3" key={`image-${i}`} style={{border: ' solid 5px black', height: '700px', width:'400px', borderRadius:'10px'}} >
                                <div className="news-card-image" style={{ maxWidth: '100%', maxHeight:'100%'}}>
                                
                                  <img src={`https://sgliveapi-6lrkg.ondigitalocean.app${news.media.url}`} alt={`news-${i}`} style={{ maxWidth: '100%', maxHeight:'100%'}}/>
                                  
                                  <div className="news-card-date">
                   <div className="news-card-date-day">{new Date(news.createdAt).toLocaleDateString("en-US", { weekday: "short"})}</div>
                                    <div className="news-card-date-my">
                                      <span>{new Date(news.createdAt).toLocaleDateString("en-US", { year: "numeric"})}</span>
                                      <span>{new Date(news.createdAt).toLocaleDateString("en-US", {  month: "long"})}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="news-card-title mt-5">
                                 {news.title}
                                </div>
                                <div className="news-card-body">
                                 {news.message}
                                </div>
                              </div>
                            ))}
                          </MDBContainer>:<div className="text-center mt-5" style={{marginBottom:'370px'}}> <h1>NO CURRENT ADMIN ANNOUNCEMENTS</h1></div>)
                            }      
             


          </MDBCol>
        </MDBContainer>

      </MDBContainer>

      <MDBContainer
            fluid
            className="mb-3 d-flex align-items-center justify-content-center"
          
          >
            <button
               className="tp-pager"
              // className="bg-dark"
              role="button"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              //  hidden={announcements.length ===0}
            >
              <MDBIcon fas icon="angle-double-left" />
            </button>
            {/* <div className="tp-page">{currentPage}</div> */}
            <div className="tp-page"
              // hidden={announcements.length ===0 }
             >{currentPage}</div>
            <button
              className="tp-pager"
              role="button"
              onClick={handleNextPage}
              // disabled={storeUsers.topPoints.length < itemsPerPage}
              disabled={announcements < itemsPerPage}
              //  hidden={announcements.length ===0}
            >
              <MDBIcon fas icon="angle-double-right" />
            </button>
          </MDBContainer>


    </MDBContainer>

    
  );
};

export default LandingNews;
