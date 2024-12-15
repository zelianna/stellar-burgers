import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/reducers/ingredientsReducer';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length]);

  // Поиск ингредиента по ID
  const ingredient = items.find((item) => item._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка загрузки: {error}</div>;
  }

  if (!ingredient) {
    return <div>Ингредиент не найден</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredient} />;
};

//const ingredientData = null;
