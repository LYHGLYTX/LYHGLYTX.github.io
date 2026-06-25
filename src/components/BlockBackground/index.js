import {useMemo} from 'react';
import styles from './styles.module.css';

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function randomSign() {
  return Math.random() > 0.5 ? 1 : -1;
}

const COLORS = [
  'rgba(59,108,180,0.08)',
  'rgba(91,155,213,0.06)',
  'rgba(108,167,219,0.07)',
  'rgba(146,191,230,0.05)',
  'rgba(80,131,196,0.06)',
  'rgba(122,181,227,0.05)',
];

export default function BlockBackground() {
  const blocks = useMemo(() => {
    const items = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const w = randomBetween(50, 200);
      const h = randomBetween(20, 140);
      items.push({
        id: i,
        left: randomBetween(-5, 85),
        top: randomBetween(5, 85),
        width: w,
        height: h,
        delay: randomBetween(0, 6),
        duration: randomBetween(6, 14),
        tx: randomBetween(100, 350) * randomSign(),
        ty: randomBetween(60, 200) * randomSign(),
        rotate: randomBetween(-15, 15),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        borderRadius: randomBetween(4, 20),
      });
    }
    return items;
  }, []);

  return (
    <div className={styles.bg}>
      {blocks.map((b) => (
        <div
          key={b.id}
          className={styles.block}
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.width}px`,
            height: `${b.height}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            '--tx': `${b.tx}px`,
            '--ty': `${b.ty}px`,
            '--rotate': `${b.rotate}deg`,
            backgroundColor: b.color,
            borderRadius: `${b.borderRadius}px`,
          }}
        />
      ))}
    </div>
  );
}
