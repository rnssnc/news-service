import React from 'react';

import { IClassNameProps } from 'utils/core';
import { LinkCn } from './Link.const';

import './Link.scss';

export interface ILinkProps extends IClassNameProps {
  href?: string;
}

export const Link: React.FC<ILinkProps> = ({
  className,
  href,
  children,
}) => {
  return (
    <a
      href={href}
      className={LinkCn(null, [className])}
    >
      {children}
    </a>
  );
};
