import burgerConstructorReducer, {
    initialState,
    addIngredient,
    removeIngredient,
    clearConstructor,
  } from '../src/services/reducers/burgerConstructorReducer';
  
  describe('burgerConstructorReducer', () => {
  
    const mockBun = { _id: '1', name: 'Bun', price: 5, image: 'bun.jpg' };
    const mockIngredient = { _id: '2', name: 'Lettuce', price: 2, image: 'lettuce.jpg' };
  
    it('should handle adding a bun', () => {
      const action = { type: 'SET_BUN', payload: mockBun };
      const state = burgerConstructorReducer(initialState, action);
  
      const expectedState = {
        bun: mockBun,
        ingredients: [],
        counts: { '1': 2 }, // Булка добавляется дважды (верх и низ)
      };
  
      expect(state).toEqual(expectedState);
    });
  
    it('should handle adding an ingredient', () => {
      const action = addIngredient(mockIngredient);
      const state = burgerConstructorReducer(initialState, action);
  
      const expectedState = {
        bun: null,
        ingredients: [mockIngredient],
        counts: { '2': 1 },
      };
  
      expect(state).toEqual(expectedState);
    });
  
    it('should handle removing an ingredient', () => {
      const stateWithIngredient = {
        ...initialState,
        ingredients: [mockIngredient],
        counts: { '2': 1 },
      };
  
      const action = removeIngredient(0); // Удаляем первый ингредиент
      const state = burgerConstructorReducer(stateWithIngredient, action);
  
      const expectedState = {
        bun: null,
        ingredients: [],
        counts: {},
      };
  
      expect(state).toEqual(expectedState);
    });
  
    it('should handle clearing the constructor', () => {
      const stateWithData = {
        bun: mockBun,
        ingredients: [mockIngredient],
        counts: { '1': 2, '2': 1 },
      };
  
      const action = clearConstructor();
      const state = burgerConstructorReducer(stateWithData, action);
  
      expect(state).toEqual(initialState);
    });
    
    it('should handle reordering ingredients', () => {
      const initialStateWithIngredients = {
        ...initialState,
        ingredients: [
          { _id: '1', name: 'Tomato', price: 1, image: 'tomato.jpg' },
          { _id: '2', name: 'Lettuce', price: 2, image: 'lettuce.jpg' },
          { _id: '3', name: 'Cheese', price: 3, image: 'cheese.jpg' },
        ],
      };
    
      const action = {
        type: 'REORDER_INGREDIENTS',
        payload: { fromIndex: 0, toIndex: 2 },
      };
    
      const state = burgerConstructorReducer(initialStateWithIngredients, action);
    
      const expectedState = {
        ...initialStateWithIngredients,
        ingredients: [
          { _id: '2', name: 'Lettuce', price: 2, image: 'lettuce.jpg' },
          { _id: '3', name: 'Cheese', price: 3, image: 'cheese.jpg' },
          { _id: '1', name: 'Tomato', price: 1, image: 'tomato.jpg' },
        ],
      };
    
      expect(state).toEqual(expectedState);
    });
    

  });
  