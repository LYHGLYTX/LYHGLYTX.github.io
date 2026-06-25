import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import BlogAuthor from '@theme/Blog/Components/Author';
import styles from './styles.module.css';

export default function BlogPostItemHeaderAuthors({className}) {
  const {
    metadata: {authors},
    assets,
  } = useBlogPost();

  if (authors.length === 0) {
    return null;
  }

  return null;

  const imageOnly = authors.every(({name}) => !name);
  const singleAuthor = authors.length === 1;

  return (
    <div
      className={clsx(
        'margin-top--md margin-bottom--sm',
        imageOnly ? styles.imageOnlyAuthorRow : 'row',
        className,
      )}>
      {authors.map((author, idx) => (
        <div
          className={clsx(
            !imageOnly && (singleAuthor ? 'col col--12' : 'col col--6'),
            imageOnly ? styles.imageOnlyAuthorCol : styles.authorCol,
          )}
          key={idx}>
          <BlogAuthor
            author={{
              ...author,
              imageURL: assets.authorsImageUrls[idx] ?? author.imageURL,
            }}
          />
        </div>
      ))}
    </div>
  );
}
