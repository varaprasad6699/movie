import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useGeneres from '../../../Hooks/useGeneres'
import Generes from '../../Generes/Generes'
import MakePagination from '../../pagination/MakePagination'
import Singlecomponent from '../SingleComponent/Singlecomponent'
//import './Movies.css'

const Movies = () => {
  const [page,setPage] = useState(1)
  const [moviesInfo,setMoviesInfo] = useState([])
  const [totalPages,setTotalPages] = useState(0)
  const [genre,setGenre] = useState([])
  const [selectedgenre,setSelectesgenre] = useState([])
  const genreForUrl=useGeneres(selectedgenre);
  useEffect(()=>{
    async function fetchData(){
      const {data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`)
      setMoviesInfo(data.results)
      setTotalPages(data.total_pages)
      console.log(" movies")
      console.log(data)
      console.log(data.media_type)
    }
    fetchData()
  },[page,genreForUrl])
  return (
    <div >
      <span className='pageTitle'>
         Movies
      </span>
      <div className='movie-types'>
        <Generes genre={genre} type={"movie"} setPage={setPage} selectedgenre={selectedgenre} setGenre={setGenre} setSelectesgenre={setSelectesgenre} />
      </div>
      <div className='trending'> 
          {moviesInfo && moviesInfo.map((content)=>
           <Singlecomponent
           key={content.id}
           id={content.id}
           poster={content.poster_path}
           date={content.release_date}
           title={content.title}
           media_type={content.media_type}
           vote_average={content.vote_average}
           />
          )}
          
      </div>
      <div>
        {totalPages>1 &&
        <MakePagination setPage={setPage} totalPages={totalPages>500?500:totalPages}/>
        }
      
      </div>
    </div>
  )
}

export default Movies
