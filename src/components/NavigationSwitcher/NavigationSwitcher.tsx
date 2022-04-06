import React, { useCallback, useEffect, useState } from 'react'

import { IClassNameProps } from 'utils/core';
import { cn } from '@bem-react/classname';

import './NavigationSwitcher.scss';

export const cnNavigationSwitcher = cn('NavigationSwitcher');
export const NavigationSwitcherLineCn = cnNavigationSwitcher('Line');

export interface INavigationSwitcherProps extends IClassNameProps {
  initialState?: boolean;
  onChange: (state: boolean) => void;
}

export const NavigationSwitcher: React.FC<INavigationSwitcherProps> = ({
  className,
  initialState,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(initialState || false);

  const handleClick = useCallback(() => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  }, [isChecked])

  return (
    <div 
      className={cnNavigationSwitcher({ checked: isChecked }, [className])}
      onClick={handleClick}
    >
      <div className={NavigationSwitcherLineCn} />
      <div className={NavigationSwitcherLineCn} />
      <div className={NavigationSwitcherLineCn} />
    </div>
  );
};
