import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../../services/reducers/ingredientsReducer';
import { fetchFeed } from '../../services/reducers/feedReducer';
import { RootState, AppDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();

  const { orders, loading, error } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(fetchFeed());
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );

  /*   if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />; */
};
