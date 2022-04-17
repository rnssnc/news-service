import React from "react"
import { cn } from "@bem-react/classname";

import { TCategory } from "services/NewsService/NewsService";

import { Grid } from "components/Grid/Grid";

import './Category.scss';
import { mapCategoryTranslate } from "utils/helpers/mapCategoryTranslate";

export interface ICategoryProps {
  category: TCategory;
  setElemSize?: (idx: number) => 's' | 'm' | 'l';
}

const categoryCn = cn('Category');
const cnCategoryHeader = categoryCn('Header');

export const Category: React.FC<ICategoryProps> = ({
  children,
  category,
  setElemSize,
}) => {
  return (
    <div>
      <h2 className={cnCategoryHeader}>
        {mapCategoryTranslate(category)}
      </h2>
      <Grid
        setElemSize={setElemSize || function(idx) { return idx === 0 ? 'm' : 's'}}
      >
        {children}
      </Grid>
    </div>
  )
};
