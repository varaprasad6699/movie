import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()
  useEffect(()=>{
      if (value===0) navigate('/')
      if (value===1) navigate('/movies')
      if (value===2) navigate('/series')
      if (value===3) navigate('/search')
  },[value,navigate])
  return (
    <Box>
      <BottomNavigation
       sx={{
        width:'100%' ,
        position:'fixed',
        bottom:0,
        
        backgroundColor:'#141414'
         }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction style={{color:'white'}} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction style={{color:'white'}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction style={{color:'white'}} label="TV Series" icon={<TvIcon />} />
        <BottomNavigationAction style={{color:'white'}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
    
  );
}