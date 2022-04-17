import React, { useMemo } from "react"
import { cn } from "@bem-react/classname";
import { useMount } from "react-use";
import { getExchangeRates, getHeadlines } from "redux/app";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { Category } from "features/Category/Category";

import './Landing.scss';
import { ArticleCard } from "components/ArticleCard/ArticleCard";
import { ExchangeRates } from "components/ExchangeRates/ExchangeRates";

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

  console.log(articles)
  return (
    <div className={cnLandingPage}>
      <Category 
        category={'general'}
      >
        { articles.general && <ArticleCard article={articles.general[0]} key={articles.general[0].url} isHeadline={true} />}
        { valute && <ExchangeRates Valute={valute}/>}
        { articles.general && articles.general.reduce((acc: JSX.Element[], article, index) => {
          if (index > 0 && index < 4) {
           acc.push(<ArticleCard article={article} key={article.url} isHeadline={index === 0} />);
          }

          return acc;
        }, [])}
      </Category>
      <Category 
        category={'sports'}
      >
        { articles.sports && articles.sports.map((article, index) => <ArticleCard article={article} key={article.url} isHeadline={index === 0} />)}
      </Category>
      <Category 
        category={'science'}
      >
        { articles.science && articles.science.map((article, index) => <ArticleCard article={article} key={article.url} isHeadline={index === 0} />)}
      </Category>
      <Category 
        category={'technology'}
      >
        { articles.technology && articles.technology.map((article, index) => <ArticleCard article={article} key={article.url} isHeadline={index === 0} />)}
      </Category>
    </div>
  )
};
