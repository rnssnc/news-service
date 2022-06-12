import { cn } from "@bem-react/classname";
import React from "react"

import { IClassNameProps } from "utils/core";

import './Icon.scss'

const iconCn = cn('Icon');

export enum ICON_SIZES {
  's' = '16px',
  'm' = '24px',
  'l' = '32px',
}

export interface IIconProps extends IClassNameProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }> | React.FunctionComponent | string;
  size: keyof typeof ICON_SIZES;
}

export const Icon: React.FC<IIconProps> = ({
  className,
  Icon,
  size,
}) => {
  console.log(Icon);
  return typeof Icon === 'string' ? (
    <div 
      className={iconCn({ image: true }, [className])}
      style={{ 
        width: ICON_SIZES[size],
        height: ICON_SIZES[size],
        backgroundImage: `url(${Icon})`,
       }}
    />
  ) : (
    <Icon 
      className={iconCn(null, [className])}
      width={ICON_SIZES[size]}
      height={ICON_SIZES[size]}
    />
  )
};
