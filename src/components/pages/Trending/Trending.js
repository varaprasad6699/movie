import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MakePagination from '../../pagination/MakePagination'
import Singlecomponent from '../SingleComponent/Singlecomponent'
import './Trending.css'

const Trending = () => {
  const [page,setPage] = useState(1)
  const [trendingInfo,setTrendingInfo] = useState([])
  
  useEffect(()=>{
    async function fetchData(){
      const {data}= await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
      setTrendingInfo(data.results)
      console.log(data)
      console.log("trending data")
    }
    fetchData()
  },[page])
  return (
    <div >
      <span className='pageTitle'>
         Trending Today 
      </span>
      
      <div className='trending'> 
          {trendingInfo && trendingInfo.map((content)=>
           <Singlecomponent
           key={content.id}
           id={content.id}
           poster={content.poster_path}
           date={content.release_date || content.first_air_date}
           title={content.name || content.title}
           media_type={content.media_type}
           vote_average={content.vote_average}
           />
          )}
          
      </div>
      <div>
        <MakePagination setPage={setPage} totalPages={20} />
      </div>
    </div>
  )
}

export default Trending
