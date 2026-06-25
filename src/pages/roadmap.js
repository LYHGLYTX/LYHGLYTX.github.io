import {useState, useEffect} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import DotBackground from '@site/src/components/DotGrid';
import styles from './roadmap.module.css';

const ONGOING = [
  {
    icon: '🔄',
    title: '上游同步',
    desc: '短期内持续拉取 CDDA 官方更新（A/B/C/D 四类 cherry-pick），等待某个较大的改动再做正式的分离。',
    tag: '核心',
  },
  {
    icon: '🌐',
    title: '翻译维护',
    desc: '跟进上游新增字符串的简体中文翻译，使用 Transifex 协作。',
    tag: '核心',
  },
  {
    icon: '🐛',
    title: 'Bug 修复 & MOD 兼容',
    desc: '处理社区反馈的崩溃和逻辑错误，跟进修复主流模组的兼容性问题。',
    tag: '日常',
  },
  {
    icon: '🎨',
    title: '贴图补全',
    desc: '填补 UNDEAD_PEOPLE 缺失物品、怪物、地图事件贴图，持续维护贴图包。',
    tag: '日常',
  },
  {
    icon: '⚙️',
    title: 'CI 维护',
    desc: '保证全平台构建通过（Linux / macOS / Windows / Android），CI 工作流持续优化。',
    tag: '日常',
  },
];

const DIRECTIONS = [
  {
    id: 'perf',
    icon: '⚡',
    title: '性能优化',
    priority: '高',
    desc: '调查 CBN 与 CDDA 究竟哪里出了性能问题、为什么会卡顿。多线程探索：地图加载、路径搜索、怪物 AI 并行化。',
    items: [
      '调查 CBN vs CDDA 性能差异与卡顿根因',
      '多线程可行性评估（地图加载 / 路径搜索 / 怪物 AI）',
      '渲染管线优化（SDL3 GPU flush / draw call 合并）',
      '存档 I/O 异步化 & 大型存档加载加速',
      '内存占用削减（submap 缓存策略）',
    ],
  },
  {
    id: 'npc',
    icon: '🧠',
    title: 'NPC & 战斗玩法',
    priority: '高',
    desc: '枪械射击手感、NPC 指挥系统与可控性提升。近战差异化、远程精度重做、伤口系统完善。',
    items: [
      '枪械射击：换弹动画、射击反馈、音效匹配',
      'NPC 指挥系统：提高 NPC 可控性与可操作性',
      'NPC AI 优化：路径搜索智能化、战斗决策改进',
      '近战差异化：武术风格、击退/缴械/摔倒机制',
      '远程精度重做：瞄准计算、弹道模拟',
    ],
  },
  {
    id: 'content',
    icon: '🎮',
    title: '游戏内容',
    priority: '中',
    desc: '类似飞艇的特色载具系统、工业系统扩展。丰富游戏玩法和世界观。',
    items: [
      '飞艇 / 飞艇驾驶系统扩展',
      '工业系统：自动化生产、资源加工链',
      '载具系统深化（部件着色已落地）',
      '修仙模组（灾变仙路）早期开发',
      '更多 CBN 特性移植',
    ],
  },
  {
    id: 'workflow',
    icon: '🔧',
    title: '项目流程',
    priority: '中',
    desc: '翻译、贴图需要稳定的供给流程和人手。工具化协作流程，降低参与门槛。',
    items: [
      '翻译：确定长期协作平台与提交流程',
      '贴图：完善自动化流水线（校验 → 归置 → PR）',
      '稳定贡献者招募与新人引导',
      '文档站持续维护，降低入门门槛',
      '定期发布更新公告与开发周报',
    ],
  },
  {
    id: 'promo',
    icon: '📢',
    title: '宣传推广',
    priority: '探索',
    desc: '需要更多的人手和游戏本身的吸引力。扩大中文社区影响力，吸引新玩家和贡献者。',
    items: [
      '游戏实况 / 宣传视频制作',
      'B 站 / NGA / 贴吧 内容分发',
      'QQ 群 & Discord 社区运营',
      '新手视频教程 & 图文攻略',
      '提升游戏本身吸引力（视觉 / 体验 / 特色）',
    ],
  },
];

// 四条贡献线的进度统计（数据来自 docs/roadmap/status.md，手动维护）
const LINES = [
  {name: '开发线', icon: '💻', done: 0, ongoing: 3, todo: 16, accent: '#5b9bd5'},
  {name: '贴图线', icon: '🎨', done: 5, ongoing: 3, todo: 4, accent: '#2ecc71'},
  {name: '翻译线', icon: '🌐', done: 2, ongoing: 1, todo: 3, accent: '#e67e22'},
  {name: '宣传线', icon: '📢', done: 0, ongoing: 2, todo: 3, accent: '#9b59b6'},
];

const FLOWS = [
  {
    icon: '💻',
    title: '开发线',
    steps: ['上游同步', '编译 / CI 维护', '性能与 bug 修复'],
  },
  {
    icon: '🎨',
    title: '贴图线',
    steps: ['生成覆盖率追踪表', '认领缺失贴图', '工具归置入库'],
  },
  {
    icon: '🌐',
    title: '翻译线',
    steps: ['本地化文件框架', '确定协作平台', '组织校对'],
  },
];

const PRIORITY_CLASS = {
  高: styles.prioHigh,
  中: styles.prioMid,
  探索: styles.prioLow,
};

// 加载时从 0 缓动到目标值的数字滚动
function useCountUp(target, run, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) {
      return undefined;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function StatPill({value, label, run, className}) {
  const shown = useCountUp(value, run);
  return (
    <span className={clsx(styles.statPill, className)}>
      <strong className={styles.statNum}>{shown}</strong>
      <span className={styles.statLabel}>{label}</span>
    </span>
  );
}

function HeroBlock({totals, run}) {
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <DotBackground variant="header" />
      <div className={clsx('container', styles.heroInner)}>
        <span className={styles.heroEyebrow}>ROADMAP · 开发路线</span>
        <Heading as="h1" className={styles.heroTitle}>CCB 开发路线</Heading>
        <p className={styles.heroSub}>从蓝图到落地，每一步都可见</p>
        <div className={styles.statRow}>
          <StatPill value={totals.done} label="已完成" run={run} className={styles.statGreen} />
          <StatPill value={totals.ongoing} label="进行中" run={run} className={styles.statBlue} />
          <StatPill value={totals.todo} label="待办" run={run} className={styles.statAmber} />
          <StatPill value={DIRECTIONS.length} label="开发方向" run={run} className={styles.statPurple} />
        </div>
      </div>
      <div className={styles.heroFade} />
    </header>
  );
}

function LineBar({line, run}) {
  const total = line.done + line.ongoing + line.todo;
  const pct = (n) => (run ? (n / total) * 100 : 0);
  const donePct = Math.round((line.done / total) * 100);
  return (
    <div className={styles.lineCard}>
      <div className={styles.lineHead}>
        <span className={styles.lineIcon}>{line.icon}</span>
        <span className={styles.lineName}>{line.name}</span>
        <span className={styles.linePct} style={{color: line.accent}}>{donePct}%</span>
      </div>
      <div className={styles.lineTrack}>
        <span
          className={clsx(styles.seg, styles.segDone)}
          style={{width: `${pct(line.done)}%`}}
        />
        <span
          className={clsx(styles.seg, styles.segOngoing)}
          style={{width: `${pct(line.ongoing)}%`}}
        />
        <span
          className={clsx(styles.seg, styles.segTodo)}
          style={{width: `${pct(line.todo)}%`}}
        />
      </div>
      <div className={styles.lineLegend}>
        <span><i className={styles.dotDone} />已完成 {line.done}</span>
        <span><i className={styles.dotOngoing} />进行中 {line.ongoing}</span>
        <span><i className={styles.dotTodo} />待办 {line.todo}</span>
      </div>
    </div>
  );
}

function DirectionPanel({d, open, onToggle}) {
  return (
    <div className={clsx(styles.dirPanel, open && styles.dirPanelOpen)}>
      <button
        className={styles.dirBtn}
        aria-expanded={open}
        onClick={() => onToggle(open ? null : d.id)}>
        <span className={styles.dirBtnIcon}>{d.icon}</span>
        <span className={styles.dirBtnTitle}>{d.title}</span>
        <span className={clsx(styles.prioTag, PRIORITY_CLASS[d.priority])}>{d.priority}优先</span>
        <span className={clsx(styles.dirBtnArrow, open && styles.dirBtnArrowOpen)}>▸</span>
      </button>
      <div className={clsx(styles.dirBody, open && styles.dirBodyOpen)}>
        <div className={styles.dirBodyInner}>
          <p className={styles.dirDesc}>{d.desc}</p>
          <ul className={styles.dirItems}>
            {d.items.map((item, i) => (
              <li key={i} className={styles.dirItem}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Roadmap() {
  const [activeDir, setActiveDir] = useState('perf');
  const [run, setRun] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setRun(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const totals = LINES.reduce(
    (acc, l) => ({
      done: acc.done + l.done,
      ongoing: acc.ongoing + l.ongoing,
      todo: acc.todo + l.todo,
    }),
    {done: 0, ongoing: 0, todo: 0},
  );

  return (
    <Layout title="开发路线" description="CCB 开发路线图 —— 当前进度、下一步与未来规划">
      <HeroBlock totals={totals} run={run} />

      <main className={clsx('container', styles.main)}>
        {/* 进度总览 */}
        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <span className={styles.sectionBar} />进度总览
          </Heading>
          <p className={styles.sectionNote}>四条贡献线的整体推进情况（手动维护，与工作大纲同步）</p>
          <div className={styles.lineGrid}>
            {LINES.map((l) => (
              <LineBar key={l.name} line={l} run={run} />
            ))}
          </div>
        </section>

        {/* 持续进行中 */}
        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <span className={styles.sectionBar} />持续进行中
          </Heading>
          <p className={styles.sectionNote}>不分阶段、长期推进的日常工作</p>
          <div className={styles.ongoingGrid}>
            {ONGOING.map((item, i) => (
              <div key={i} className={styles.ongoingCard} style={{'--i': i}}>
                <div className={styles.ongoingIcon}>{item.icon}</div>
                <div className={styles.ongoingBody}>
                  <div className={styles.ongoingHead}>
                    <Heading as="h4" className={styles.ongoingTitle}>{item.title}</Heading>
                    <span className={clsx(styles.ongoingTag, item.tag === '核心' && styles.tagCore)}>
                      {item.tag}
                    </span>
                  </div>
                  <p className={styles.ongoingDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 开发方向 */}
        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <span className={styles.sectionBar} />接下来的开发方向
          </Heading>
          <p className={styles.sectionNote}>点击展开查看具体子任务</p>
          <div className={styles.dirWrap}>
            {DIRECTIONS.map((d) => (
              <DirectionPanel
                key={d.id}
                d={d}
                open={activeDir === d.id}
                onToggle={setActiveDir}
              />
            ))}
          </div>
        </section>

        {/* 三条线流程 */}
        <section className={styles.section}>
          <Heading as="h2" className={styles.sectionTitle}>
            <span className={styles.sectionBar} />三条线流程
          </Heading>
          <p className={styles.sectionNote}>每条贡献线的典型工作流</p>
          <div className={styles.flowGrid}>
            {FLOWS.map((f, i) => (
              <div key={i} className={styles.flowCard}>
                <div className={styles.flowHeader}>
                  <span className={styles.flowHeaderIcon}>{f.icon}</span>{f.title}
                </div>
                <div className={styles.flowSteps}>
                  {f.steps.map((step, j) => (
                    <div key={j} className={styles.flowStepWrap}>
                      <div className={styles.flowStep}>
                        <span className={styles.flowStepNum}>{j + 1}</span>{step}
                      </div>
                      {j < f.steps.length - 1 && <div className={styles.flowArrow}>↓</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.ctaCard}>
          <div className={styles.ctaText}>
            <Heading as="h3" className={styles.ctaTitle}>想认领任务、推动某个方向？</Heading>
            <p className={styles.ctaDesc}>颗粒度的任务清单见工作大纲，或直接到社区参与讨论。</p>
          </div>
          <div className={styles.ctaBtns}>
            <Link className="button button--primary button--lg" to="/docs/roadmap/status">
              查看工作大纲 →
            </Link>
            <Link className="button button--secondary button--lg" to="/community">
              加入社区 💬
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
