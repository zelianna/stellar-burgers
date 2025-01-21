import rootReducer from '../src/services/reducers/rootReducer';
import ingredientsReducer from '../src/services/reducers/ingredientsReducer';
import burgerConstructorReducer from '../src/services/reducers/burgerConstructorReducer';
import feedReducer from '../src/services/reducers/feedReducer';
import authReducer from '../src/services/reducers/authReducer';
import ordersReducer from '../src/services/reducers/ordersReducer';

describe('rootReducer', () => {
  it('initializes the state correctly', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    const expectedState = {
      ingredients: ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      burgerConstructor: burgerConstructorReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      feed: feedReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      auth: authReducer(undefined, { type: 'UNKNOWN_ACTION' }),
      orders: ordersReducer(undefined, { type: 'UNKNOWN_ACTION' }),
    };

    expect(initialState).toEqual(expectedState);
  });
});
