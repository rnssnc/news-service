import React, { useCallback, useState } from 'react'

import { IClassNameProps } from 'utils/core';
import { cn } from '@bem-react/classname';

import { Button } from 'components/Button/Button';

import './NavigationSwitcher.scss';

export const navigationSwitcherCn = cn('NavigationSwitcher');
export const cnNavigationSwitcherLine = navigationSwitcherCn('Line');

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

  const getLines = useCallback(() => (
    <>
      <span className={cnNavigationSwitcherLine} />
      <span className={cnNavigationSwitcherLine} />
      <span className={cnNavigationSwitcherLine} />
    </>
  ), [])

  return (
    <Button 
      className={navigationSwitcherCn({ Checked: isChecked }, [className])}
      onClick={handleClick}
      Icon={getLines}
    />
  );
};
