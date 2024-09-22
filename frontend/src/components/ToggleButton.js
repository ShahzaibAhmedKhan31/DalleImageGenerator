// ThemeToggleButton.js
import React from 'react';
import '../css/ThemeToggleButton.css'; // Ensure this CSS file is created for style
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import  {actionCreators} from '../states/index';
// import { darkModeAction } from '../states/Actions/actions'

const ThemeToggleButton = () => {

  const dispach = useDispatch();
  const darkmode = useSelector(state => state.darkMode)
  
    return (
      <div className="theme-toggle-container">
        <input 
          type="checkbox" 
          className="theme-toggle-checkbox" 
          id="theme-toggle"
          checked={darkmode}
          // onChange={() => dispach(actionCreators.darkModeAction(!darkmode))}
          onClick={()=>{dispach(actionCreators.darkModeAction(!darkmode))}}
        />
        <label className="theme-toggle-label" htmlFor="theme-toggle">
          <span className="theme-toggle-slider"></span>
        </label>
      </div>
    );
  };

export default ThemeToggleButton;
