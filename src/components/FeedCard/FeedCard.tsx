import { cn } from "@bem-react/classname";
import React, { useMemo, useState } from "react"

import { IClassNameProps } from "utils/core";

import { IArticle } from "services/NewsService/NewsService";

import { isToday } from "utils/helpers/isToday";

import { Link } from "components/Link/Link";
import { Button } from "components/Button/Button";

import { ReactComponent as LikeIcon } from './FeedCard.assets/like.svg';
import { ReactComponent as DisikeIcon } from './FeedCard.assets/dislike.svg';

import './FeedCard.scss';

export interface IFeedCardProps extends IClassNameProps {
  article: IArticle;
  cardRef?: ((node: HTMLDivElement) => () => void) | null;
}

const feedCardCn = cn('FeedCard');
const cnFeedCardMedia = feedCardCn('Media');
const cnFeedCardTextContent = feedCardCn('TextContent');
const cnFeedCardImage = feedCardCn('Image');
const cnFeedCardTitle = feedCardCn('Title');
const cnFeedCardDescription = feedCardCn('Description');
const cnFeedCardFooter = feedCardCn('Footer');
const cnFeedCardSource = feedCardCn('Source');
const cnFeedCardDomain = feedCardCn('Domain');
const cnFeedCardDate = feedCardCn('Date');
const cnFeedCardFeedback = feedCardCn('Feedback');

export const FeedCard: React.FC<IFeedCardProps> = ({
  className,
  article,
  cardRef,
}) => {
  const {
    description,
    publishedAt,
    source,
    title,
    url,
    urlToImage,
  } = article;
  const [imgLoadingError, setImgLoadingError] = useState(false);
  
  const publishedDate = useMemo(() => new Date(publishedAt), [publishedAt]);

  return (
    <Link href={url} className={feedCardCn(null, [className])}>
      <div className={cnFeedCardMedia} ref={cardRef}>
        <span className={cnFeedCardSource}>
          <span className={cnFeedCardDomain}>
            {source.name}
          </span>
        </span>
        <img className={cnFeedCardImage} alt="Изображение новости" src={imgLoadingError ? `${process.env.PUBLIC_URL}/assets/svg/news.svg` : urlToImage || `${process.env.PUBLIC_URL}/assets/svg/news.svg`} onError={() => setImgLoadingError(true)} />
      </div>
      <div className={cnFeedCardTextContent}>
        <h3 className={cnFeedCardTitle}>{title}</h3>
        <span className={cnFeedCardDescription}>{description}</span>
      </div>
      <div className={cnFeedCardFooter}>
        <div className={cnFeedCardDate}>{
          isToday(publishedDate) ?
            `Сегодня, ${publishedDate.getHours() < 10 ? `0${publishedDate.getHours()}` : publishedDate.getHours()}:${publishedDate.getMinutes() < 10 ? `0${publishedDate.getMinutes()}` : publishedDate.getMinutes()}` :
            publishedDate.toLocaleDateString(undefined)
        }</div>
        <div className={cnFeedCardFeedback}>
          <Button Icon={LikeIcon} onClick={(e: React.MouseEvent) => e.preventDefault() } >Нравится</Button>
          <Button Icon={DisikeIcon} />
        </div>
      </div>
    </Link>
  )
};
