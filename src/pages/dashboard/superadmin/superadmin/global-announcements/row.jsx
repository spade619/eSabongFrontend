import React, {useState}from 'react'
import {MDBBtn} from "mdb-react-ui-kit"

import DeleteModal from './deleteModal'
import ViewModal from './viewModal'
import EditModal from './editModal'

const AnnouncementRow = ({data}) => {

      console.log('newurl', data)
      console.log('exactpath', data.media.formats.thumbnail.url)
  return (
    <tr className="text-center">
      <td className="text-truncate">{data.id}</td>

    <td className="text-truncate">
<div className="asl-sid">{data.title}</div>
</td>
<td className="text-truncate">
            {data && (
      <img src={`https://sgliveapi-6lrkg.ondigitalocean.app${data.media.formats.thumbnail.url}`} alt="Selected" style={{ maxWidth: '100px', maxHeight: '70px', borderRadius: '15px'}} />
      
    )} 
</td>

<td className="text-truncate">{data.message.substring(0, 50)}</td>
<td className="text-truncate">{data.createdAt}</td>
<td className="text-truncate"> 

    <ViewModal data={data}/>
    <DeleteModal data={data}/>
    <EditModal data={data}/>
    
</td>


        </tr>
  )
}

export default AnnouncementRow 