import React, { useCallback, useEffect, useState } from "react"

import { Category } from "features/Category/Category";
import { FeedCard } from "components/FeedCard/FeedCard";

import './FeedPage.scss';
import { cn } from "@bem-react/classname";
import NewsService, { IArticle } from "services/NewsService/NewsService";

export interface IFeedPageProps {

}

const feedPageCn = cn('FeedPage');

export const FeedPage: React.FC<IFeedPageProps> = (props) => {
  const [articles, setArticles] = useState<IArticle[]>();
  const [currentPage, setCurrentPage] = useState(0);

  const fetchArticles = useCallback(async (page: number) => (await NewsService.getHeadlines({ category: 'general', pageSize: 13, page: page })).articles, [])

  useEffect(() => {
    setCurrentPage(0);
    const awaitArticles = async () => setArticles(await fetchArticles(0));

    awaitArticles()
  }, [fetchArticles]);

  const initObserver = useCallback((node: HTMLDivElement) => {
    if (!node) return () => observer.unobserve(node);

    const observer = new IntersectionObserver(async (entry) => {
      if (entry[0].isIntersecting) {
        const fetchedArticles: IArticle[] = await fetchArticles(currentPage+1);
        setCurrentPage(currentPage+1);
        
        if (Array.isArray(fetchedArticles) && fetchedArticles.length) {
          setArticles(articles?.concat(fetchedArticles));
        }
        
        observer.unobserve(node);
      } 
    },
      {
        threshold: [0.25],
      });


      observer.observe(node);

      return () => observer.unobserve(node);
  }, [articles])

  return (
    <div className={feedPageCn()}>

    {/* { articles.general && articles.general.map((article, index) => <ArticleCard article={article} key={article.url} />) } */}
    { articles && articles.map((article, index) => <FeedCard article={article} key={index}  cardRef={index === articles.length - 2 ? initObserver : null} />) }
    </div>
  );
};
