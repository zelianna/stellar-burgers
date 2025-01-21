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
      if (state.bun && state.bun._id) {
        const counts: Record<string, number> = {
          ...state.counts,
          [action.payload._id]: 2
        };
        delete counts[state.bun._id as string];
        return {
          ...state,
          bun: action.payload,
          counts
        };
      }

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

    // Обработка изменения порядка ингредиентов
    case 'REORDER_INGREDIENTS': {
      //console.log('Current state:', state.ingredients);
      //console.log('Action payload:', action.payload);

      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.ingredients];
      const [movedIngredient] = ingredients.splice(fromIndex, 1); // Убираем элемент
      //console.log('Moved ingredient:', movedIngredient);

      ingredients.splice(toIndex, 0, movedIngredient); // Вставляем на новое место
      //console.log('New ingredients order:', ingredients);

      return {
        ...state,
        ingredients
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

export const reorderIngredients = (fromIndex: number, toIndex: number) => ({
  type: 'REORDER_INGREDIENTS',
  payload: { fromIndex, toIndex }
});

export default burgerConstructorReducer;
