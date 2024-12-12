import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { removeIngredient } from '../../services/reducers/burgerConstructorReducer';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const handleMoveDown = () => {};

    const handleMoveUp = () => {};

    const dispatch = useDispatch();

    const handleClose = () => {
      //console.log('>>>>>> deleteIngredient_id', ingredient._id);
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
