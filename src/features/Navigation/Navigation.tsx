import React from "react"
import { cn } from "@bem-react/classname";

import { useAppSelector } from "redux/hooks";
import { IClassNameProps } from "utils/core";

import { NavLink } from "components/NavLink/NavLink";
import { Icon } from "components/Icon/Icon";

import { ReactComponent as WorldIcon } from './Navigation.assets/world.svg';
import { ReactComponent as FeedIcon } from './Navigation.assets/feed.svg';
import { ReactComponent as CinemaIcon } from './Navigation.assets/cinema.svg';
import { ReactComponent as ScienceIcon } from './Navigation.assets/science.svg';
import { ReactComponent as BicycleIcon } from './Navigation.assets/bicycle.svg';
import { ReactComponent as BusinessIcon } from './Navigation.assets/business.svg';
import { ReactComponent as TechnologyIcon } from './Navigation.assets/technology.svg';
import { ReactComponent as HealthIcon } from './Navigation.assets/health.svg';

import './Navigation.scss'
import { mapCategoryTranslate } from "utils/helpers/mapCategoryTranslate";

const navigationCn = cn('Navigation');
const cnNavigationMain = navigationCn('Main');
const cnNavigationCategories = navigationCn('Categories');

export interface INavigationProps extends IClassNameProps {

}

export const Navigation: React.FC<INavigationProps> = ({
  className,
}) => {
  const isVisible = useAppSelector(state => state.app.isNavVisible);

  return (
    <div className={navigationCn({ Hidden: !isVisible }, [className])}>
      <div className={cnNavigationMain}>
        <NavLink to="/">
          <Icon
            Icon={WorldIcon}
            size="s"
          />
          Главные новости
        </NavLink>
        <NavLink to="feed">
          <Icon
            Icon={FeedIcon}
            size="s"
          />
          Для вас
        </NavLink>
      </div>
      <div className={cnNavigationCategories}>
      <NavLink to="category/sports">
          <Icon
            Icon={BicycleIcon}
            size="s"
          />
          {mapCategoryTranslate('sports')}
      </NavLink>
      <NavLink to="category/science">
          <Icon
            Icon={ScienceIcon}
            size="s"
          />
          {mapCategoryTranslate('science')}
      </NavLink>
      <NavLink to="category/technology">
          <Icon
            Icon={TechnologyIcon}
            size="s"
          />
          {mapCategoryTranslate('technology')}
      </NavLink>
      <NavLink to="category/entertainment">
          <Icon
            Icon={CinemaIcon}
            size="s"
          />
          {mapCategoryTranslate('entertainment')}
      </NavLink>
      <NavLink to="category/business">
          <Icon
            Icon={BusinessIcon}
            size="s"
          />
          {mapCategoryTranslate('business')}
      </NavLink>
      <NavLink to="category/health">
          <Icon
            Icon={HealthIcon}
            size="s"
          />
          {mapCategoryTranslate('health')}
      </NavLink>
      </div>
    </div>
  )
};
