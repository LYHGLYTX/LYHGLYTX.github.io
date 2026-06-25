import {useMemo} from 'react';
import styles from './styles.module.css';

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

const MAIN_COLORS = ['#5b9bd5', '#6ca7db', '#92bfe6', '#bdd7ee', '#7ab5e3', '#3b6cb4', '#a0cbec', '#d0e4f4'];
const HEADER_COLORS = ['#ffffff', '#e8f0fe', '#d0e4f4', '#bdd7ee', '#c8ddf5', '#ffffff', '#eef4fb', '#d8e8f6'];

export default function DotBackground({variant = 'main'}) {
  const dots = useMemo(() => {
    const items = [];
    const count = variant === 'header' ? 60 : 80;
    const colors = variant === 'header' ? HEADER_COLORS : MAIN_COLORS;
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: randomBetween(0, 100),
        y: randomBetween(0, 100),
        size: randomBetween(2, 4),
        delay: randomBetween(0, 4),
        duration: randomBetween(2, 5),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return items;
  }, [variant]);

  return (
    <div className={styles.bg}>
      {dots.map((d) => (
        <span
          key={d.id}
          className={styles.dot}
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            backgroundColor: d.color,
          }}
        />
      ))}
    </div>
  );
}
