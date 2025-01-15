import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/reducers/ingredientsReducer';

import { BurgerIngredients } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  // Получение данных из Redux
  const { isLoading } = useSelector((state) => state.ingredients);

  // Запрос ингредиентов при монтировании компонента
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return <>{isLoading ? <Preloader /> : <BurgerIngredients />}</>;
};
