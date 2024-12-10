import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/reducers/ingredientsReducer';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '../../utils/types';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const [ingredientData, setIngredientData] = useState<TIngredient | null>(
    null
  );

  const { items, isLoading, error } = useSelector((state) => state.ingredients);

  // Эффект для загрузки данных по id
  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    } else if (id) {
      const ingredient = items.find((item) => item._id === id);
      if (ingredient) {
        setIngredientData(ingredient);
      }
    }
  }, [id, items, dispatch]);

  // Показать загрузку, если данные еще не загружены
  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  // Показать ошибку, если она есть
  if (error) {
    return <div>Ошибка загрузки: {error}</div>;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

//const ingredientData = null;
