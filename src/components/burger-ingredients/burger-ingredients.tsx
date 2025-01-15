import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../../pages/constructor-page/constructor-page.module.css';
import { useSelector } from '../../services/store';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const {
    isLoading,
    items: ingredients,
    error
  } = useSelector((state) => state.ingredients);

  //const isIngredientsLoading = false;
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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
            currentTab={currentTab}
            buns={buns}
            mains={mains}
            sauces={sauces}
            titleBunRef={titleBunRef}
            titleMainRef={titleMainRef}
            titleSaucesRef={titleSaucesRef}
            bunsRef={bunsRef}
            mainsRef={mainsRef}
            saucesRef={saucesRef}
            onTabClick={onTabClick}
          />
        )}
        <BurgerConstructor />
      </div>
    </main>
  );
};
