import { cn } from "@bem-react/classname";
import { Link } from "components/Link/Link";
import React, { useMemo, useState } from "react"

import { IArticle } from "services/NewsService/NewsService";
import { IClassNameProps } from "utils/core";
import { getFaviconURL } from "utils/helpers/getFaviconURL";
import { isToday } from "utils/helpers/isToday";

import './ArticleCard.scss';

const newsCardCn = cn('ArticleCard');
const cnArticleCardMedia = newsCardCn('Media');
const cnArticleCardImage = newsCardCn('Image');
const cnArticleCardTextContent = newsCardCn('TextContent');
const cnArticleCardTitle = newsCardCn('Title');
const cnArticleCardDescription = newsCardCn('Description');
const cnArticleCardFooter = newsCardCn('Footer');
const cnArticleCardSource = newsCardCn('Source');
const cnArticleCardDomain = newsCardCn('Domain');
const cnArticleCardFavicon = newsCardCn('Favicon');
const cnArticleCardDate = newsCardCn('Date');

export interface IArticleCardProps extends IClassNameProps {
  article: IArticle;
  isHeadline?: boolean;
  cardRef?: ((node: HTMLDivElement) => () => void) | null;
}

export const ArticleCard: React.FC<IArticleCardProps> = ({
  className,
  article,
  isHeadline,
  cardRef,
}) => {
  const [imgLoadingError, setImgLoadingError] = useState(false);
  const publishedDate = useMemo(() => new Date(article.publishedAt), [article.publishedAt]);

  const footer = (
    <div className={cnArticleCardFooter}>
      <div className={cnArticleCardSource}>
        <span className={cnArticleCardFavicon} style={{ backgroundImage: `url('${getFaviconURL(article.url)}')` }} />
        <span className={cnArticleCardDomain}>
          {article.source.name}
        </span>
      </div>
      <div className={cnArticleCardDate}>{
        isToday(publishedDate) ?
          `Сегодня, ${publishedDate.getHours() < 10 ? `0${publishedDate.getHours()}` : publishedDate.getHours()}:${publishedDate.getMinutes() < 10 ? `0${publishedDate.getMinutes()}` : publishedDate.getMinutes()}` :
          publishedDate.toLocaleDateString(undefined)
      }</div>
    </div>
  );

  return (
    <Link className={newsCardCn({ Headline: Boolean(isHeadline) }, [className])} href={article.url}>
        <div className={cnArticleCardTextContent} ref={cardRef}>
          <h3 className={cnArticleCardTitle}>{article.title}</h3>      
          <div className={cnArticleCardDescription}>{article.description}</div> 
          { isHeadline && footer } 
        </div>
        <div className={cnArticleCardMedia}>
          <img className={cnArticleCardImage} alt="Изображение новости" src={imgLoadingError ? `${process.env.PUBLIC_URL}/assets/svg/news.svg` : article.urlToImage || `${process.env.PUBLIC_URL}/assets/svg/news.svg`} onError={() => setImgLoadingError(true)} />
        </div>
        { !isHeadline && footer }
    </Link>
  )
};
