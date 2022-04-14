import { cn } from "@bem-react/classname";
import React from "react"
import { IClassNameProps } from "utils/core";

import './Grid.scss';

export interface IGridProps extends IClassNameProps {
  setElemSize?: (idx: number) => 's' | 'm' | 'l';
}

const gridCn = cn('Grid');

export const Grid: React.FC<IGridProps> = ({
  children,
  className,
  setElemSize,
}) => {
  return (
    <div className={gridCn(null, [className])}>
      { React.Children.map(children, (child, index) => (
        <div className={gridCn('Item', { size: setElemSize?.(index) || 's' })}>
          {child}
        </div>
      ))}
    </div>
  )
};
