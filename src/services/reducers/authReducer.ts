import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, loginUserApi } from '../../utils/burger-api';

// Типы данных
interface AuthState {
  user: {
    name: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Начальное состояние
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

// Thunk для регистрации
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userData: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await registerUserApi(userData); // Запрос на API
      return response.user; // Возвращаем данные пользователя
    } catch (error) {
      return rejectWithValue('Ошибка регистрации. Проверьте введённые данные.');
    }
  }
);

// Thunk для авторизации
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUserApi(loginData);
      return response.user; // Возвращаем данные пользователя
    } catch (error) {
      return rejectWithValue('Ошибка авторизации. Проверьте введённые данные.');
    }
  }
);

// Срез состояния
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null; // Очищаем данные пользователя при выходе
      state.isAuthenticated = false; // Исправлено: теперь сбрасываем isAuthenticated
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Экспортируем действия и редьюсер
export const { logout } = authSlice.actions;
export default authSlice.reducer;
