import React from 'react';

import { RouterLink } from 'components/Link/RouterLink';

import { cnLogotype, cnLogotypeImage, cnLogotypeLink, cnLogotypeText } from './Logotype.const';

import './Logotype.scss';

export const Logotype: React.FC = () => {
  return (
    <div className={cnLogotype}>
      <RouterLink
        to="/"
        className={cnLogotypeLink}
      >
        <div className={cnLogotypeText}>н</div>
        <div className={cnLogotypeImage} />
        <div className={cnLogotypeText}>вости</div>
      </RouterLink>
    </div>
  );
};
