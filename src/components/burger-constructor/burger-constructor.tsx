import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { orderBurgerApi } from '../../utils/burger-api';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { TOrder } from '../../utils/types';
//import { clearConstructor } from '../../services/reducers/burgerConstructorReducer';

import { useState } from 'react';
export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Данные из стора
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const ingredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [orderRequest, setOrderRequest] = useState(false);
  //const [orderModalData, setOrderModalData] = useState(null);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const constructorItems = {
    bun,
    ingredients
  };

  //const orderRequest = false;
  //const orderModalData = null;

  const onOrderClick = async () => {
    if (!isAuthenticated) {
      navigate('/login'); // Перенаправление на страницу входа
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    // Формируем массив _id ингредиентов
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id // Добавляем булку дважды
    ];

    try {
      setOrderRequest(true);
      const response = await orderBurgerApi(ingredientIds);
      console.log('Успех при оформлении заказа. Response: ', response.order);
      // Успешный запрос: отображаем модальное окно с заказом
      setOrderModalData(response.order);
      //dispatch(clearConstructor()); // Очищаем конструктор
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
    } finally {
      setOrderRequest(false);
    }
  };
  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
