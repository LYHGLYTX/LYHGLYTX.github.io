import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageCarousel from '@site/src/components/HomepageCarousel';
import RotatingText from '@site/src/components/RotatingText';
import DotBackground from '@site/src/components/DotGrid';
import BlockBackground from '@site/src/components/BlockBackground';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <DotBackground />
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <Heading as="h1" className="hero__title">
          欢迎来到 CCB
        </Heading>
        <p className="hero__subtitle">
          <RotatingText />
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/newbie/intro">
            新人教程 🎮
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/dev/intro">
            开发者教程 🛠️
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/contribute/intro">
            参与贡献 🤝
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/community">
            加入社区 💬
          </Link>
        </div>
      </div>
      <div className={styles.heroFade} />
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`欢迎来到 ${siteConfig.title}`}
      description="Cataclysm: Cleanwater Bomb 官方站点 —— 新人教程、开发者文档、贡献指南与社区">
      <HomepageHeader />
      <main className={styles.mainWrapper}>
        <BlockBackground />
        <HomepageCarousel />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
