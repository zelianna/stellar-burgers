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
import { RootState, useDispatch } from '../../services/store';
import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useState } from 'react';
import { getUser } from '../../services/reducers/authReducer';
import { Preloader } from '../ui/preloader';

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const isAuthenicated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  ) as boolean;
  const handleCloseModal = () => {
    window.history.back();
  };

  const location = useLocation();
  const backgroundLocation = location.state
    ? location.state?.background.pathname
    : true;

  const [currentNumber, setCurrentNumber] = useState<string | undefined>('0');
  useEffect(() => {
    const number = location.pathname.split('/').pop();
    setCurrentNumber(number);
  }, [location.pathname, isAuthenicated]);
  const title = 'Детали заказа #' + currentNumber;
  return (
    <div className={styles.app}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <AppHeader />
          <Routes>
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route
              path='/profile'
              element={<ProtectedRoute element={Profile} />}
            />
            <Route path='/ingredients/:id' element={<ConstructorPage />} />
            <Route path='/feed/:number' element={<Feed />} />
            <Route
              path='/profile/orders'
              element={<ProtectedRoute element={ProfileOrders} />}
            />
            <Route
              path='/profile/orders/:number'
              element={<ProtectedRoute element={ProfileOrders} />}
            />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
          {backgroundLocation && (
            <Routes>
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
            </Routes>
          )}
        </>
      )}
    </div>
  );
};
export default App;
