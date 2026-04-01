import type { NewsItem as NewsItemType } from '../../types';

type NewsItemProps = Pick<NewsItemType, 'link' | 'title' | 'description' | 'pubDate'>;

const NewsItem = ({ link, title, description, pubDate }: NewsItemProps) => {
    return (
        <li className="news-item">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="news-date">{new Date(pubDate).toLocaleDateString('ko-KR')}</span>
            </a>
        </li>
    );
};

export default NewsItem;
