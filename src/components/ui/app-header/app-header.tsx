import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
const activeNavLink = `${styles.link} text text_type_main-default ${styles.link_active} pt-4 pr-5 pb-4 pl-5`;
const inactiveNavLink = `${styles.link} text text_type_main-default text_color_inactive pt-4 pr-5 pb-4 pl-5`;

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? activeNavLink : inactiveNavLink
          }
        >
          <BurgerIcon type={'primary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </NavLink>

        <NavLink
          end
          to='/feed'
          className={({ isActive }) =>
            isActive ? activeNavLink : inactiveNavLink
          }
        >
          <ListIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            isActive ? activeNavLink : inactiveNavLink
          }
        >
          <ProfileIcon type={'primary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </NavLink>
      </div>
    </nav>
  </header>
);
