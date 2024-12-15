import { useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/reducers/ordersReducer';
import { fetchIngredients } from '../../services/reducers/ingredientsReducer';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((state) => state.orders.userOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
