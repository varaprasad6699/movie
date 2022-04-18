import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import './OnClickModel.css'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Button, Paper } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../config/config';
import Carousel from '../components/Carousel/Carousel';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height:"80%",
  background:"linear-gradient(to bottom, #141b29, #0c111b 300px)",
  color:"white"
};
const buttonStyle={
  color:"black",
  backgroundColor:"white",
  margin:" 21px 8px",

}
export default function OnClickModel({children ,id ,media_type}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content,setContent]=React.useState()
  const [video,setVideo]=React.useState()
  const  fetchData=async()=>{
      const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type==="tv"?media_type:"movie"}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      setContent(data)
      console.log(data)
    console.log("data in here...")
  }
  const  fetchVideo=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/${media_type==="tv"?media_type:"movie"}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setVideo(data.results[0]?.key)
    
    
}
  React.useEffect(()=>{
    fetchData()
    fetchVideo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <div className='singlecomponent' onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper style={style}>
            {content &&
              <div className='content'>

                 <img className='content_portrate' src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable} alt={content.name || content.title}/>
                  <img className='content_landscape' src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailableLandscape} alt={content.name || content.title}/>
                  <div className="overview">
                       <span className='content_title'>{content.title?content.title+" ":content.name +" "}(
                         {(content.first_air_date || content.release_date || "......"
                       ).substring(0,4)}
                       )
                       </span>
                       {content.tagline && <i className='tagline'>{ content.tagline}</i>}
                       <span className='overview-text'>{content.overview}</span>
                  </div>
                    <div className="cast">
                          <Carousel media_type={media_type} id={id}/>
                    </div>
                    <Button 
                    style={buttonStyle}
                    className="button-youtube"
                    variant="contained" 
                    startIcon={<YouTubeIcon />}
                    href={`https://www.youtube.com/watch?v=${video}`}
                    >

                      Watch The Trailer
                      </Button>
              </div>

            }
          
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
