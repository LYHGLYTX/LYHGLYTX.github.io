import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '新人教程',
    icon: '🎮',
    to: '/docs/newbie/intro',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: '第一次玩 CCB？从下载安装到活过第一天，一步步带你上手生存。',
    cta: '开始上手',
  },
  {
    title: '开发者教程',
    icon: '🛠️',
    to: '/docs/dev/intro',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: '想参与开发或制作模组？了解如何从源码编译，以及向 CCB 提交贡献的流程。',
    cta: '查看文档',
  },
  {
    title: '贡献指南',
    icon: '🤝',
    to: '/docs/contribute/intro',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: '代码、贴图、翻译、内容 —— 不管会不会写代码，都有适合你的参与方式。',
    cta: '参与进来',
  },
];

function Feature({Svg, title, description, icon, to, cta, index}) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.featureCard} style={{'--i': index}}>
        <div className={styles.featureArt}>
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className={styles.featureHead}>
          <span className={styles.featureIcon}>{icon}</span>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        </div>
        <p className={styles.featureDesc}>{description}</p>
        <span className={styles.featureCta}>{cta} <span className={styles.featureArrow}>→</span></span>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHead}>
          <Heading as="h2" className={styles.sectionTitle}>
            <span className={styles.sectionBar} />从这里开始
          </Heading>
          <p className={styles.sectionNote}>无论你想玩、想开发还是想贡献，都有一条清晰的路径</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} index={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
