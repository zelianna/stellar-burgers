import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';
import burgerConstructorReducer from './burgerConstructorReducer';
import feedReducer from './feedReducer';
import authReducer from './authReducer';
import ordersReducer from './ordersReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  auth: authReducer,
  orders: ordersReducer
});

export default rootReducer;
