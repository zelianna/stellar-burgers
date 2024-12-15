import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';

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
  loading: true,
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

// Thunk для аутентификации
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginUserApi(loginData);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user; // Возвращаем данные пользователя
    } catch (error) {
      return rejectWithValue('Ошибка авторизации. Проверьте введённые данные.');
    }
  }
);

// Thunk для авторизации
export const getUser = createAsyncThunk(
  'auth/user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
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
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

// Thunk для выхода
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Отправляем запрос на сервер для выхода
      const response = await logoutApi();

      if (!response.success) {
        throw new Error('Ошибка выхода');
      }

      // Удаляем токены из localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      return true;
    } catch (error) {
      return rejectWithValue(error || 'Ошибка выхода');
    }
  }
);

// Экспортируем действия и редьюсер
export const { logout } = authSlice.actions;
export default authSlice.reducer;
