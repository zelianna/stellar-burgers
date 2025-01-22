import ingredientsReducer, {
    initialState,
    fetchIngredientsStart,
    fetchIngredientsSuccess,
    fetchIngredientsFailure,
  } from '../src/services/reducers/ingredientsReducer';
  
  describe('ingredientsReducer async actions', () => {
      
    const mockIngredients = [
      {
        _id: '1',
        name: 'Bun',
        price: 5,
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        image: 'url-to-image',
        image_large: 'url-to-large-image',
        image_mobile: 'url-to-mobile-image',
      },
      {
        _id: '2',
        name: 'Patty',
        price: 10,
        type: 'main',
        proteins: 20,
        fat: 15,
        carbohydrates: 5,
        calories: 200,
        image: 'url-to-image',
        image_large: 'url-to-large-image',
        image_mobile: 'url-to-mobile-image',
      },
    ];
  
    it('should handle fetchIngredientsStart action', () => {
      const action = fetchIngredientsStart();
      const state = ingredientsReducer(initialState, action);
  
      const expectedState = {
        ...initialState,
        isLoading: true,
        error: null,
      };
  
      expect(state).toEqual(expectedState);
    });
  
    it('should handle fetchIngredientsSuccess action', () => {
      const action = fetchIngredientsSuccess(mockIngredients);
      const state = ingredientsReducer(initialState, action);
  
      const expectedState = {
        ...initialState,
        isLoading: false,
        items: mockIngredients,
      };
  
      expect(state).toEqual(expectedState);
    });
  
    it('should handle fetchIngredientsFailure action', () => {
      const errorMessage = 'Failed to fetch ingredients';
      const action = fetchIngredientsFailure(errorMessage);
      const state = ingredientsReducer(initialState, action);
  
      const expectedState = {
        ...initialState,
        isLoading: false,
        error: errorMessage,
      };
  
      expect(state).toEqual(expectedState);
    });
  });
  