import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { removeIngredient } from '../../services/reducers/burgerConstructorReducer';
import { reorderIngredients } from '../../services/reducers/burgerConstructorReducer';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const handleMoveDown = () => {
      dispatch(reorderIngredients(index, index + 1));
    };

    const handleMoveUp = () => {
      dispatch(reorderIngredients(index, index - 1));
    };

    const dispatch = useDispatch();

    const handleClose = () => {
      dispatch(removeIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
        key={index}
      />
    );
  }
);
