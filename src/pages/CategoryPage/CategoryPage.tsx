import { ArticleCard } from "components/ArticleCard/ArticleCard";
import { Category } from "features/Category/Category";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useMount, useUpdateEffect } from "react-use";
import { NewsService } from "services/NewsService";
import { IArticle, TCategory } from "services/NewsService/NewsService";

export interface ICategoryPageProps {

}

export const CategoryPage: React.FC<ICategoryPageProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [articles, setArticles] = useState<IArticle[]>();

  const { category } = useParams();
  const navigate = useNavigate();

  const categories: TCategory[] = useMemo(() => ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'], []);
  
  if (!category || categories.indexOf(category as TCategory) < 0) {
    navigate('/');
  }

  const fetchArticles = useCallback(async (page: number) => (await NewsService.getHeadlines({ category: category as TCategory, pageSize: 13, page: page })).articles, [category])

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
    <div>
      <Category 
        category={category as TCategory}
        setElemSize={(idx) => idx % 8 === 0 ? 'm' : 's' }
      >
        { articles?.map((article, index) =>  <ArticleCard article={article} key={article.url} isHeadline={index % 8 === 0} cardRef={index === articles.length - 2 ? initObserver : null}/>) }
      </Category>
    </div>
  )
};
