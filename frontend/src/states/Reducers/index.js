import { combineReducers } from 'redux';
import {darkModeReducer} from './reducers';
import { imageGalleryReducer } from './reducers';

const combinereducers = combineReducers({
    darkMode: darkModeReducer,
    images: imageGalleryReducer
})

export default combinereducers;
