import { Badge } from '@mui/material'
import React from 'react'
import { img_300, unavailable } from '../../../config/config'
import OnClickModel from '../../../onclickmodel/OnClickModel'
import './Singlecomponent.css'
const Singlecomponent = ({
    title,
    id,
    poster,
    date,
    media_type,vote_average
}) => {
  
  return (
    <OnClickModel  id={id}  media_type={media_type} >
    <Badge style={{ position: 'sticky' }} badgeContent={vote_average} color={vote_average>7?"primary":"secondary"} showZero anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}/>
     <img className='image' src={poster ? `${img_300}/${poster}`:unavailable} alt="poster"/>
     <b  className='title'>{title}</b>
     <span className='subTitle'>
        {media_type==='tv'?'TV Serial':'Movie'}
        <span className='subTitle'>{date}</span>
     </span>
    </OnClickModel>
   
  )
}

export default Singlecomponent
