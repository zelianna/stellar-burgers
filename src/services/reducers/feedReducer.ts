import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api'; // Импортируем getFeedsApi
import { TOrder } from '@utils-types';

// Создаем асинхронный экшн для получения ленты заказов
export const fetchFeed = createAsyncThunk(
  'feed/fetchFeed',
  async (_, thunkAPI) => {
    try {
      const data = await getFeedsApi(); // Используем вашу API функцию для получения данных
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // Если ошибка, отклоняем
    }
  }
);

// Определяем начальное состояние
interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

// Создаем slice с редьюсерами для обработки состояния
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Запрос в процессе
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Успех — данные успешно получены
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      // Ошибка — если запрос не удался
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedSlice.reducer;
