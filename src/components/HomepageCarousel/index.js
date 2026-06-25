import {useState, useEffect, useCallback} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import slidesJson from './slides.json';
import styles from './styles.module.css';

const SLIDES = slidesJson.map((img) => ({img, caption: ''}));

const INTERVAL = 4000;

export default function HomepageCarousel() {
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl || '/';
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;

  const go = useCallback((i) => setIdx((i + n) % n), [n]);
  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1), [go, idx]);

  useEffect(() => {
    if (paused || n <= 1) return undefined;
    const t = setInterval(() => setIdx((c) => (c + 1) % n), INTERVAL);
    return () => clearInterval(t);
  }, [paused, n]);

  if (n === 0) return null;

  const srcOf = (img) => `${baseUrl}${img}`;

  return (
    <section className={styles.carousel}>
      <div
        className={styles.viewport}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={i === idx ? `${styles.slide} ${styles.slideActive}` : styles.slide}
            aria-hidden={i !== idx}>
            <img className={styles.slideImg} src={srcOf(s.img)} alt={`幻灯片 ${i + 1}`} />
          </div>
        ))}

        {n > 1 && (
          <>
            <button className={`${styles.navBtn} ${styles.prev}`} onClick={prev} aria-label="上一张">‹</button>
            <button className={`${styles.navBtn} ${styles.next}`} onClick={next} aria-label="下一张">›</button>
            <div className={styles.dots}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === idx ? styles.dotActive : ''}`}
                  onClick={() => go(i)}
                  aria-label={`跳到第 ${i + 1} 张`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
