import { Container } from '@mui/material';
import { BrowserRouter ,Route,Routes} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from './components/NabvBar';
import Movies from './components/pages/Movies/Movies';
import Search from './components/pages/Search/Search';
import Series from './components/pages/Series/Series';
import Trending from './components/pages/Trending/Trending';


function App() {
  return (
    <BrowserRouter> 
     
      <Header/> 
      <div className="app">
          <Container>
            <Routes>
              <Route path='/' element={<Trending/>} exact />
              <Route path='/movies' element={<Movies/>}  />
              <Route path='/series' element={<Series/>}  />
              <Route path='/search' element={<Search/>}  />
            
            </Routes>
          </Container>
      </div>
      <SimpleBottomNavigation/>
    </BrowserRouter>
    
  );
}

export default App;
