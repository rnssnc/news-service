import React, { useCallback } from 'react';

import { cn } from '@bem-react/classname';

import { NavigationSwitcher } from 'components/NavigationSwitcher/NavigationSwitcher';
import { Logotype } from 'components/Logotype/Logotype';
import { Input } from 'components/Input/Input';
import { Button } from 'components/Button/Button';
import { Time } from 'components/Time/Time';

import { ReactComponent as SearchIcon } from './Header.assets/magnifier.svg';
import { ReactComponent as NotificationIcon } from './Header.assets/notification.svg';
import { ReactComponent as UserIcon } from './Header.assets/user.svg';

import './Header.scss';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { login, logout, setNavVisibility } from 'redux/app';
import { openSignInWindow } from 'utils/helpers/OpenPopup';
import { NewsService } from 'services/NewsService';

export const headerCn = cn('Header');
export const cnHeader = headerCn();
export const cnHeaderColumn = headerCn('Column');
export const cnHeaderNavigationSwitcher = headerCn('NavigationSwitcher');
export const cnHeaderSearchBar = headerCn('Searchbar');
export const cnHeaderTime = headerCn('Time');

export const Header: React.FC = () => {
  const isNavVisible = useAppSelector(state => state.app.isNavVisible);
  const user = useAppSelector(state => state.app.user);
  const dispatch = useAppDispatch();

  const handleLogin = useCallback((e: MessageEvent) => {
    // Проверяем совпадают ли домены, 
    // т.к не управляем поведением пользователя в другом окне
    if (e.origin !== window.location.origin) {
      return;
    }

    dispatch(login(e.data));
   }, [dispatch])

  const handleNavSwitcherChange = useCallback((isChecked) => dispatch(setNavVisibility(isChecked)), [dispatch])
  const handleLogoutClick = useCallback(() => dispatch(logout()), [dispatch])

  return (
    <header className={cnHeader}>
      <div className={cnHeaderColumn}>
        <NavigationSwitcher 
          className={cnHeaderNavigationSwitcher}
          initialState={isNavVisible}
          onChange={handleNavSwitcherChange}
        />
        <Logotype />
      </div>
      <div className={cnHeaderColumn}>
        <Time className={cnHeaderTime} />
        <Input 
          className={cnHeaderSearchBar}
          InputIcon={SearchIcon}
          inputProps={{
            placeholder: 'Найти...' 
          }}
        />
        <Button
          Icon={NotificationIcon}     
        />
        <Button
          Icon={user ? user.photos[0].value : UserIcon}
          onClick={user ? handleLogoutClick : () => openSignInWindow(NewsService.AUTH_URL, 'Auth Window', handleLogin)}
        >
          { user ? user.displayName : 'Войти' }
        </Button>
      </div>
    </header>
  )
};
