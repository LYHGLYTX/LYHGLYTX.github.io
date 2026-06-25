import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import DotBackground from '@site/src/components/DotGrid';
import styles from './community.module.css';

const DiscordIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-label="Discord">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const RedditIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-label="Reddit">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.47 1.19-.844 2.836-1.402 4.642-1.476l.86-3.924a.248.248 0 0 1 .29-.182l3.048.56c.2-.476.674-.794 1.221-.794l-.04.044zm-5.01 7.683c-.754 0-1.367.593-1.367 1.325 0 .733.613 1.327 1.367 1.327.755 0 1.367-.594 1.367-1.327 0-.732-.612-1.325-1.367-1.325zm3.262 3.724c-.89.885-2.5 1.05-3.236.99-.046-.004-.091-.01-.135-.017h-.006a3.19 3.19 0 0 1-.135-.017c-.737-.06-2.346-.105-3.237-.99a.248.248 0 0 1 .35-.35c.783.787 2.313.99 3.028.99.715 0 2.246-.203 3.028-.99a.248.248 0 0 1 .35.35l-.007.034zm.17-2.397c-.755 0-1.367.593-1.367 1.325 0 .733.613 1.327 1.367 1.327.755 0 1.367-.594 1.367-1.327 0-.732-.612-1.325-1.367-1.325z" />
  </svg>
);

const OnlineLinks = [
  {
    name: 'Discord',
    desc: '实时语音文字交流，开发与玩家都在',
    href: 'https://discord.gg/tUG9MFwCqf',
    Icon: DiscordIcon,
  },
  {
    name: 'Reddit',
    desc: 'r/CataclysmCB —— 发帖讨论、分享存档与反馈',
    href: 'https://www.reddit.com/r/CataclysmCB/',
    Icon: RedditIcon,
  },
];

// QQ 群（二维码 + 群号）
const QQGroups = [
  {
    name: '交流群',
    number: '552610319',
    img: 'img/qq/jiaoliu.jpg',
    desc: '玩家日常交流、提问、反馈',
  },
  {
    name: '开发贡献群',
    number: '252513599',
    img: 'img/qq/dev.jpg',
    desc: '代码、翻译、内容开发协作',
  },
  {
    name: 'CCB 不死人贡献群',
    number: '694984594',
    img: 'img/qq/tileset.jpg',
    desc: '贴图美术贡献与归置',
  },
];

function QQCard({name, number, img, desc}) {
  const src = useBaseUrl(img);
  return (
    <div className={clsx('col col--4', styles.qqCol)}>
      <div className={styles.qqCard}>
        <div className={styles.qrWrap}>
          <img className={styles.qrImage} src={src} alt={`${name} 二维码`} />
        </div>
        <Heading as="h3" className={styles.qqName}>{name}</Heading>
        <p className={styles.qqNumber}>群号：{number}</p>
        <p className={styles.qqDesc}>{desc}</p>
      </div>
    </div>
  );
}

function OnlineCard({name, desc, href, Icon}) {
  return (
    <Link className={clsx('col col--6', styles.onlineCol)} to={href}>
      <div className={styles.onlineCard}>
        <span className={styles.onlineIcon}><Icon /></span>
        <div className={styles.onlineBody}>
          <Heading as="h3" className={styles.onlineName}>{name}</Heading>
          <p className={styles.onlineDesc}>{desc}</p>
        </div>
        <span className={styles.onlineArrow}>→</span>
      </div>
    </Link>
  );
}

export default function Community() {
  return (
    <Layout title="社区" description="加入 CCB 社区：Discord、Reddit、QQ 群">
      <header className={clsx('hero', styles.heroBanner)}>
        <DotBackground variant="header" />
        <div className={clsx('container', styles.heroInner)}>
          <span className={styles.heroEyebrow}>COMMUNITY · 社区</span>
          <Heading as="h1" className={styles.heroTitle}>加入社区</Heading>
          <p className={styles.heroSub}>
            遇到问题、想贡献、或只是想聊聊 —— 这里都有人
          </p>
          <div className={styles.heroStats}>
            <span className={styles.heroStat}>💬 2 个在线社区</span>
            <span className={styles.heroStat}>🐧 3 个 QQ 群</span>
          </div>
        </div>
        <div className={styles.heroFade} />
      </header>

      <main className={clsx('container', styles.main)}>
        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <span className={styles.sectionBar} />在线社区
          </Heading>
          <p className={styles.sectionNote}>实时交流，开发者与玩家都在</p>
          <div className="row">
            {OnlineLinks.map((props, idx) => (
              <OnlineCard key={idx} {...props} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <span className={styles.sectionBar} />QQ 群
          </Heading>
          <p className={styles.sectionNote}>扫码加入，或搜索群号。不同方向有专门的群：</p>
          <div className="row">
            {QQGroups.map((props, idx) => (
              <QQCard key={idx} {...props} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
