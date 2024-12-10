import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/reducers/ingredientsReducer';
import styles from './constructor-page.module.css';

import { BurgerIngredientsUI } from '../../components/ui/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  // Получение данных из Redux
  const {
    isLoading,
    items: ingredients,
    error
  } = useSelector((state) => state.ingredients);

  // Запрос ингредиентов при монтировании компонента
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  //const isIngredientsLoading = false;
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  // Создание рефов для заголовков
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Коллбэк-рефы для категорий
  const bunsRef = (node?: Element | null) => {
    if (node) {
      console.log('Buns element:', node);
    }
  };

  const mainsRef = (node?: Element | null) => {
    if (node) {
      console.log('Mains element:', node);
    }
  };

  const saucesRef = (node?: Element | null) => {
    if (node) {
      console.log('Sauces element:', node);
    }
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            {error ? (
              <div className='error-message'>Ошибка загрузки: {error}</div>
            ) : (
              <BurgerIngredientsUI
                currentTab='bun'
                buns={buns}
                mains={mains}
                sauces={sauces}
                titleBunRef={titleBunRef}
                titleMainRef={titleMainRef}
                titleSaucesRef={titleSaucesRef}
                bunsRef={bunsRef}
                mainsRef={mainsRef}
                saucesRef={saucesRef}
                onTabClick={(tab) => console.log(`Текущая вкладка: ${tab}`)}
              />
            )}
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
