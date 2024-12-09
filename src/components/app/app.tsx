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

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';

const ProtectedRoute = ({
  element: Component,
  ...rest
}: {
  element: React.ElementType;
}) => {
  const isAuthenticated = false; // Добавьте вашу логику аутентификации
  return isAuthenticated ? <Component {...rest} /> : <Navigate to='/login' />;
};

const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  const handleCloseModal = () => {
    window.history.back();
  };

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
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {/* Роутинг для модальных окон */}
      {state?.backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Order Information' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Order Information' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Order Information' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
