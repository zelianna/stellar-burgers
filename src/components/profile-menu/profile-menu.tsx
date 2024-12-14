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

  const handleLogout = async () => {
    try {
      // Вызываем Thunk для выхода
      await dispatch(logoutUser()).unwrap();
      console.log('>>>>> Выход успех');
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
