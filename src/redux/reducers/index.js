import { combineReducers} from 'redux';
import restaurantMenu from '../../utils/menu';
import {TOGGLE_ITEM} from '../types';

const initialState= {
  menu: restaurantMenu
};

const toggleItem = (name, menu) => {
  menu.forEach((item) => {
    if( item.name === name){
      item.selected = !item.selected;
    }

  });
};

const menu = (state = initialState, action) => {
  switch(action.type){
  case TOGGLE_ITEM:{
      
  }
  default:
    return state;
  }
};

export default combineReducers({
  menu
});
