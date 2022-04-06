import React from 'react';

import { cn } from '@bem-react/classname';

import { NavigationSwitcher } from 'components/NavigationSwitcher/NavigationSwitcher';
import { Logotype } from 'components/Logotype/Logotype';
import { Input } from 'components/Input/Input';
import { Icon } from 'components/Icon/Icon';

import { ReactComponent as SearchIcon } from './Header.assets/magnifier.svg';
import { ReactComponent as NotificationIcon } from './Header.assets/notification.svg';

import './Header.scss';

export const headerCn = cn('Header');
export const cnHeader = headerCn();
export const cnHeaderColumnLeft = headerCn('ColumnLeft');
export const cnHeaderColumnRight = headerCn('ColumnRight');
export const cnHeaderNavigationSwitcher = headerCn('NavigationSwitcher');
export const cnHeaderSearchBar = headerCn('Searchbar');

export const Header: React.FC = () => {
  return (
    <header className={cnHeader}>
      <div className={cnHeaderColumnLeft}>
        <NavigationSwitcher 
          className={cnHeaderNavigationSwitcher}
          onChange={(state) => console.log(state)}
        />
        <Logotype />
      </div>
      <div className={cnHeaderColumnRight}>
        <Input 
          className={cnHeaderSearchBar}
          InputIcon={SearchIcon}
          inputProps={{
            placeholder: 'Найти...' 
          }}
        />
        <Icon
          Icon={NotificationIcon}
          size="m"
        />
      </div>
    </header>
  )
};
