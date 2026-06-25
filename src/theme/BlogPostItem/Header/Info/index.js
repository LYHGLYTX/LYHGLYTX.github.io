import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';

function Spacer() {
  return <>{' · '}</>;
}

const BADGES = ['每日最佳员工', '勤奋贡献者', '积极贡献者'];

function AuthorChip({author, imgUrl, link, badge}) {
  return (
    <div className={styles.chip}>
      <span className={clsx(styles.chipBadge, badge && styles[`badge${badge}`])}>
        {badge}
      </span>
      <Link href={link} className={styles.chipLink}>
        {imgUrl && (
          <img className={styles.chipAvatar} src={imgUrl} alt="" />
        )}
      </Link>
      <Link href={link} className={styles.chipName}>
        {author.name}
      </Link>
    </div>
  );
}

export default function BlogPostItemHeaderInfo({className}) {
  const {metadata, assets} = useBlogPost();
  const {date, readingTime} = metadata;
  const authors = metadata.authors;

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const formattedDate = dateTimeFormat.format(new Date(date));

  const top3 = authors.slice(0, 3);

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.metaLine}>
        <time dateTime={date}>{formattedDate}</time>
        {typeof readingTime !== 'undefined' && readingTime > 0 && (
          <>
            <Spacer />
            <span>{Math.ceil(readingTime)} 分钟阅读</span>
          </>
        )}
      </div>

      {top3.length > 0 && (
        <div className={styles.chips}>
          {top3.map((author, idx) => {
            const imgUrl = assets.authorsImageUrls?.[idx] ?? author.imageURL;
            const link = author.url || author.page?.permalink || '#';
            return (
              <AuthorChip
                key={idx}
                author={author}
                imgUrl={imgUrl}
                link={link}
                badge={BADGES[idx]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
