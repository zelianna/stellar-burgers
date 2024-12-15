import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../services/store';
import { useDispatch, useSelector } from '../../services/store';
import {
  addIngredient,
  setBun
} from '../../services/reducers/burgerConstructorReducer';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    // Получение count из глобального состояния
    const counts = useSelector(
      (state: RootState): Record<string, number> =>
        state.burgerConstructor.counts
    );

    // Получаем количество этого ингредиента из counts
    const count = counts[ingredient._id];

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        // Если это булка, заменяем текущую
        //console.log(ingredient);
        dispatch(setBun(ingredient));
      } else {
        // Если это начинка, добавляем ее в список
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
