import { cn } from "@bem-react/classname";
import { Icon as IconComponent, IIconProps } from "components/Icon/Icon";
import React from "react"

import { IClassNameProps } from "utils/core";

const iconCn = cn('Icon');

export interface IIconButton extends IClassNameProps, IIconProps {

}

export const IconButton: React.FC<IIconButton> = ({
  className,
  Icon,
  size,
}) => {
  return (
    <button>
      <IconComponent 
        Icon={Icon}
        size={size}
      />
    </button>
  )
};
