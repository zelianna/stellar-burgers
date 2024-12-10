import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

// Тип данных ингредиента
type Ingredient = {
  id: string;
  name: string;
  price: number;
};

interface IngredientsState {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchIngredientsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchIngredientsSuccess(state, action: PayloadAction<TIngredient[]>) {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchIngredientsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {
  fetchIngredientsStart,
  fetchIngredientsSuccess,
  fetchIngredientsFailure
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;

// Асинхронный Thunk для загрузки ингредиентов
export const fetchIngredients = () => async (dispatch: AppDispatch) => {
  dispatch(fetchIngredientsStart());
  try {
    const ingredients = await getIngredientsApi();
    console.log('Fetched ingredients:', ingredients);
    dispatch(fetchIngredientsSuccess(ingredients)); // Успех
  } catch (error: any) {
    console.error('Error fetching ingredients:', error.message);
    dispatch(fetchIngredientsFailure(error.message)); // Ошибка
  }
};
