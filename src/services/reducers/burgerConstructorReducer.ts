interface Ingredient {
  _id: string;
  name: string;
  price: number;
  image: string;
}
interface BurgerConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
}

const initialState: BurgerConstructorState = {
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
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient._id !== action.payload // Удалить ингредиент по id
        )
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

export const removeIngredient = (_id: string) => ({
  type: 'REMOVE_INGREDIENT',
  payload: _id
});

export default burgerConstructorReducer;
