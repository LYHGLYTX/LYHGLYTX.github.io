import {useState, useEffect} from 'react';
import styles from './styles.module.css';

const PHRASES = [
  '欢迎来到 Cataclysm: Cleanwater Bomb',
  '末日生存，从 CCB 开始',
  '新人教程 · 开发者教程 · 贡献指南',
  '加入社区，一起打造更好的末日世界',
  '净化协议，末日重生',
];

export default function RotatingText() {
  const [phrase, setPhrase] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PHRASES[idx];
    const speed = deleting ? 40 : 80;

    if (!deleting && charIdx < current.length) {
      const timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }

    if (!deleting && charIdx === current.length) {
      const timer = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timer);
    }

    if (deleting && charIdx > 0) {
      const timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
      return () => clearTimeout(timer);
    }

    if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % PHRASES.length);
    }
  }, [charIdx, deleting, idx]);

  useEffect(() => {
    setPhrase(PHRASES[idx]);
  }, [idx]);

  const display = phrase.substring(0, charIdx);

  return (
    <span className={styles.rotating}>
      {display}
      <span className={styles.cursor}>|</span>
    </span>
  );
}
