const initialState = {
  bun: null,
  ingredients: []
};

const burgerConstructorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_BUN':
      return {
        ...state,
        bun: action.payload // Заменить текущую булку
      };
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload] // Добавить новый ингредиент
      };
    default:
      return state;
  }
};

export const setBun = (bun: any) => ({
  type: 'SET_BUN',
  payload: bun
});

export const addIngredient = (ingredient: any) => ({
  type: 'ADD_INGREDIENT',
  payload: ingredient
});

export default burgerConstructorReducer;
