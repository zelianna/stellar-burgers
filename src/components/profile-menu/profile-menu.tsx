import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { logoutUser } from '../../services/reducers/authReducer';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  //const handleLogout = () => {};
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // Функция для выхода
  const handleLogout = async () => {
    try {
      // Ожидаем, пока запрос на выход завершится
      const resultAction = await dispatch(logoutUser());

      // Если запрос прошел успешно
      if (logoutUser.fulfilled.match(resultAction)) {
        //console.log('Выход успешен');

        // Перенаправляем пользователя на страницу входа
        navigate('/login');
      } else {
        // В случае ошибки
        console.error('Ошибка при выходе:', resultAction.payload);
      }
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
