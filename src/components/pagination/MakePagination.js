import React from 'react'
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    text:'secondry',
  },
});
const MakePagination = ({setPage,totalPages}) => {
  const handleChange = (event,value) => {
    setPage(value);
    window.scroll(0,0);
    console.log(value)
  };

  return (
    <div style={{
      display:"flex",
      width:"100%",
      justifyContent:"center",
      marginTop:"10px",
      color:"white"
      
    }}>
      <ThemeProvider theme={darkTheme}>
          <Pagination 
          count={totalPages}
          color="secondary"  
          onChange={handleChange} 
          hidePrevButton  
          hideNextButton
          
          />
      </ThemeProvider>
      
    </div>
  )
}

export default MakePagination
