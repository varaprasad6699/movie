import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import './Carousel.css'
import { img_300,noPicture } from'../../config/config.js';
const handleDragStart = (e) => e.preventDefault();


const Carousel = ({media_type,id}) => {
  const [cast,setCast]=useState()
  const items=cast?.map((e)=>(
      <div className='castMember'>
           <img 
           className='castImage'
           src={e.profile_path?`${img_300}/${e.profile_path}`:noPicture}
           alt={e?.name}
           onDragStart={handleDragStart}
            />
            <div  className='castName'>{e?.name}</div>
            
      </div>
  )

  )
  const responsive={
    0:{
        items: 3,
    },
    512:{
        items: 5,
    },
    1024: {
        items: 7,
    }
  }

  const fetchCast=async ()=>{
        const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type==="tv"?media_type:"movie"}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setCast(data.cast)
        console.log(data)
        console.log("cast")
  }
  useEffect(()=>{
      fetchCast()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <AliceCarousel autoPlay responsive={responsive} infinite disableButtonsControls disableDotsControls mouseTracking items={items} />
  );
}
export default Carousel;