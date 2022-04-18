import { Chip } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'

const Generes = ({setGenre,setPage,type,genre,selectedgenre,setSelectesgenre}) => {
    const addsetGenre=(g)=>{
        setSelectesgenre([...selectedgenre,g])
        setGenre(genre.filter((val)=>g.id!==val.id))
        setPage(1)
    }
    const deleteGenre=(g)=>{
        setGenre([...genre,g])
        setSelectesgenre(selectedgenre.filter((val)=>g.id!==val.id))
        setPage(1)
    }

    useEffect(()=>{
        const fetchGeners= async ()=>{
            const {data}= await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            setGenre(data.genres)
            console.log(data)
            console.log("data in here")
        }
        fetchGeners()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div style={{padding:"10px"}}>
        {console.log(selectedgenre)}
        {selectedgenre && selectedgenre.map((value)=>{
            return  <Chip label={value.name}  clickable style={{margin:"3px",color:"white",backgroundColor:'#8c0cc3'}} size="small" variant="outlined" onDelete={()=>deleteGenre(value)} />
        })}
        {genre &&  genre.map((value) => {
            return <Chip label={value.name} clickable style={{color:"black",backgroundColor:"white",margin:"3px"}} size="small" variant="outlined" onClick={()=>addsetGenre(value)} />
        })}
    
    </div>
  )
}

export default Generes
