import React from   'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import MyNavbar from './components/MyNavbar';
import './App.css'
import { useSelector } from 'react-redux';

function App() {

  const darkMode = useSelector(state => state.darkMode)

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Router>
        <MyNavbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/gallery' element={<Gallery />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
