import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useState } from 'react';

const ProtectedRoute = ({
  element: Component,
  ...rest
}: {
  element: React.ElementType;
}) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Если пользователь не авторизован, перенаправляем его на страницу логина
  return isAuthenticated ? <Component {...rest} /> : <Navigate to='/login' />;
};

const App = () => {
  const handleCloseModal = () => {
    window.history.back();
  };

  const location = useLocation();
  const [currentNumber, setCurrentNumber] = useState<string | undefined>('0');
  useEffect(() => {
    const number = location.pathname.split('/').pop();
    setCurrentNumber(number);
  }, [location.pathname]);

  const title = 'Детали заказа #' + currentNumber;

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<ProtectedRoute element={Profile} />} />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={ProfileOrders} />}
        />
        <>
          <Route
            path='/feed/:number'
            element={
              <Modal title={title} onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </>
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};
export default App;
