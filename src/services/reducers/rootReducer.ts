import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer
});

export default rootReducer;
