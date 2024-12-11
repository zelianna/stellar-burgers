import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
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
  const isAuthenticated = false;
  return isAuthenticated ? <Component {...rest} /> : <Navigate to='/login' />;
};

const App = () => {
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
        <Route
          path='/forgot-password'
          element={<ProtectedRoute element={ForgotPassword} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute element={ResetPassword} />}
        />
        <Route path='/profile' element={<ProtectedRoute element={Profile} />} />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={ProfileOrders} />}
        />
        <>
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
              <Modal title='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Order Details' onClose={handleCloseModal}>
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
