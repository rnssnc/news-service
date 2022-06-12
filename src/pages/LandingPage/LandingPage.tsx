import React, { useMemo } from "react"
import { cn } from "@bem-react/classname";
import { useMount } from "react-use";
import { getExchangeRates, getHeadlines } from "redux/app";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { Category } from "features/Category/Category";

import { ArticleCard } from "components/ArticleCard/ArticleCard";
import { ExchangeRates } from "components/ExchangeRates/ExchangeRates";

import './LandingPage.scss';
import { TCategory } from "services/NewsService/NewsService";
import { useParams, useSearchParams } from 'react-router-dom';

const landinPageCn = cn('LandingPage');
const cnLandingPage = landinPageCn();

export const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const articles = useAppSelector((state) => state.app.articles);
  const exchangeRates = useAppSelector((state) => state.app.exchangeRates);

  const valute = useMemo(() => {
    if (exchangeRates) {
      return [exchangeRates.Valute['USD'], exchangeRates.Valute['EUR'], exchangeRates.Valute['GBP'], exchangeRates.Valute['CNY'], exchangeRates.Valute['JPY']];
    }

    return undefined;
  }, [exchangeRates]);

  useMount(() => {
    dispatch(getHeadlines('general'))
    dispatch(getHeadlines('science'))
    dispatch(getHeadlines('sports'))
    dispatch(getHeadlines('technology'))
    dispatch(getHeadlines('health'))
    dispatch(getExchangeRates())
  })

  return (
    <div className={cnLandingPage}>
      <Category 
        category={'general'}
      >
        { articles.general && <ArticleCard article={articles.general[0]} key={articles.general[0].url} isHeadline={true} />}
        { valute && <ExchangeRates Valute={valute}/>}
        { articles.general && articles.general.reduce((acc: JSX.Element[], article, index) => {
          if (index > 0 && index < 4) {
           acc.push(<ArticleCard article={article} key={article.url} />);
          }

          return acc;
        }, [])}
      </Category>
      { Object.keys(articles).map((category: string) => {
        if (category === 'general') {
          return;
        }

        return (
          <Category category={category as TCategory} key={category}>
            { articles[category as TCategory]?.map((article, index) => <ArticleCard article={article} key={article.url} isHeadline={index === 0} />)}
          </Category>
        )
      })
      }
    </div>
  )
};
