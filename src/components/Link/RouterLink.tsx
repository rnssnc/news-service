import React from 'react';
import { Link as LinkBase, LinkProps } from 'react-router-dom';

import { IClassNameProps } from 'utils/core';

import { LinkCn } from './Link.const';

import './Link.scss';

export interface ILinkProps extends IClassNameProps, LinkProps, React.RefAttributes<HTMLAnchorElement> {}

export const RouterLink: React.FC<ILinkProps> = (props) => {
  return (
    <LinkBase
      {...props}
      className={LinkCn(null, [props.className])}
    >
      {props.children}
    </LinkBase>
  );
};
