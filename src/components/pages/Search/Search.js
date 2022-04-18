import { Button, Tab, Tabs, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Singlecomponent from '../SingleComponent/Singlecomponent';
import MakePagination from '../../pagination/MakePagination';
import axios from 'axios';
const Search = () => {
  const [value,setValue] =useState(0)
  const [page,setPage] =useState(1)
  const [moviesInfo,setMoviesInfo] = useState([])
  const [totalPages,setTotalPages] = useState(0)
  const [searchText,setSearchText] = useState("")
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1);
  };
  async function fetchData(){
    const {data}= await axios.get(`https://api.themoviedb.org/3/search/${value?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY
  }&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
    setMoviesInfo(data.results)
    setTotalPages(data.total_pages)
    console.log("search page...")
    console.log(searchText)
    console.log(data.results)
  }
  useEffect(()=>{
    window.scroll(0,0)
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page,value])
  return (
    <div>
      <div style={{display:"flex", margin:"10px 0"}}>
      
        <TextField id="filled-basic"   
          InputLabelProps={{
              style: {color: "#fff"},
            }} 
            InputProps={{
              style: {
                  color: "white"
              }
          }}
          label="search"
          style={{ flex:1 ,backgroundColor:"#b8b4b430",borderTopLeftRadius: "7px",borderTopRightRadius: "7px",color:"white"}} 
          variant="filled" 
          onChange={(e)=>setSearchText(e.target.value)}
         />

        <Button 
        style={{backgroundColor:"#fff",marginLeft:"5px"}}
        variant="contained"
        onClick={fetchData}
        >
            <SearchIcon style={{color:"black"}} />
        </Button>
      </div>

      <Tabs
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: {
            background: "#fff",
           }
          }}
         
      >
        <Tab style={{width:"50%",color:"white"}} label="Movies" />
        <Tab  style={{width:"50%",color:"white"}} label="Tv Series" />
      </Tabs>

      <div className='trending' style={{marginTop:"20px"}}> 
          {moviesInfo && moviesInfo.map((content)=>
           <Singlecomponent
           key={content.id}
           id={content.id}
           poster={content.poster_path}
           date={content.release_date || content.first_air_date}
           title={content.name || content.title}
           media_type={value?"tv":"movie"}
           vote_average={content.vote_average}
           />
          )}
          
      </div>
      {searchText && moviesInfo.length===0 && (value? <h2>NO Series Found !!!</h2> : <h2>No Movie Found !!!</h2>)}
      <div>
        {totalPages>1 &&
        <MakePagination setPage={setPage} totalPages={totalPages>500?500:totalPages}/>
        }
      
      </div>
      
    </div>
  )
}

export default Search
