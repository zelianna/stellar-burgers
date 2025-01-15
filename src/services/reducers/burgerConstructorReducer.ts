interface Ingredient {
  _id: string;
  name: string;
  price: number;
  image: string;
}
interface BurgerConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
  counts: Record<string, number>;
}

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  counts: {}
};

const burgerConstructorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_BUN':
      return {
        ...state,
        bun: action.payload, // Заменить текущую булку
        counts: {
          ...state.counts,
          [action.payload._id]: 2 // Булка добавляется дважды (верх и низ)
        }
      };
    case 'ADD_INGREDIENT':
      const ingredient = action.payload;

      return {
        ...state,
        ingredients: [...state.ingredients, action.payload], // Добавить новый ингредиент
        counts: {
          ...state.counts,
          [ingredient._id]: (state.counts[ingredient._id] || 0) + 1
        }
      };
    case 'REMOVE_INGREDIENT': {
      const index = action.payload;
      const ingredient = state.ingredients.find((_, i) => i === index);
      if (!ingredient) {
        throw 'Unknown ingredient attempted to be deleted';
      }
      const _id = ingredient._id;

      const newCounts = { ...state.counts };
      if (newCounts[_id] > 1) {
        newCounts[_id] -= 1; // Уменьшить счетчик
      } else {
        delete newCounts[_id]; // Удалить запись, если счетчик становится 0
      }

      return {
        ...state,
        ingredients: state.ingredients.filter((_, i) => i !== index),
        counts: newCounts
      };
    }

    // Очистка конструктора
    case 'CLEAR_CONSTRUCTOR':
      return initialState;

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

export const removeIngredient = (index: number) => ({
  type: 'REMOVE_INGREDIENT',
  payload: index
});

export const clearConstructor = () => ({
  type: 'CLEAR_CONSTRUCTOR'
});

export default burgerConstructorReducer;
