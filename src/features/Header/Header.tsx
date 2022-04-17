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
import { setNavVisibility } from 'redux/app';

export const headerCn = cn('Header');
export const cnHeader = headerCn();
export const cnHeaderColumn = headerCn('Column');
export const cnHeaderNavigationSwitcher = headerCn('NavigationSwitcher');
export const cnHeaderSearchBar = headerCn('Searchbar');

export const Header: React.FC = () => {
  const isNavVisible = useAppSelector(state => state.app.isNavVisible);
  const dispatch = useAppDispatch();

  const handleNavSwitcherChange = useCallback((isChecked) => dispatch(setNavVisibility(isChecked)), [dispatch])

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
        <Time />
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
          Icon={UserIcon}
        >
          Войти
        </Button>
      </div>
    </header>
  )
};
