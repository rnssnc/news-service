import React from "react"
import { cn } from "@bem-react/classname";
 
import { IClassNameProps } from "utils/core";

import './Button.scss';
import { Icon as IconComponent, IIconProps } from "components/Icon/Icon";

const buttonCn = cn('Button');

export interface IButtonProps extends IClassNameProps, Partial<IIconProps> {
  onClick?(e: React.MouseEvent): void;
}

export const Button: React.FC<IButtonProps> = ({
  className,
  Icon,
  size,
  children: text,
  onClick,
}) => {
  return (
    <button className={buttonCn({ 
      Icon: Boolean(Icon && !text), 
      WithIcon: Boolean(Icon && text), 
    }, [className])}
      onClick={onClick}
    >
      { Icon && (
        <IconComponent 
          Icon={Icon}
          size={size || 'm'}
        />
      )}
      {text}
    </button>
  )
};
