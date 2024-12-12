import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';
import burgerConstructorReducer from './burgerConstructorReducer';
import feedReducer from './feedReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer
});

export default rootReducer;
