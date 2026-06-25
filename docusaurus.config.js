// @ts-check
// Docusaurus 配置 - Cataclysm: Cleanwater Bomb (CCB) 站点
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Cataclysm: Cleanwater Bomb',
  tagline: 'CCB —— 新人教程 · 开发者教程 · 工作状态',
  favicon: 'img/favicon.ico',

  // Mermaid 流程图支持
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  future: {
    v4: true,
  },

  // 生产环境 URL（GitHub Pages）
  url: 'https://LYHGLYTX.github.io',
  // 项目站点路径：https://LYHGLYTX.github.io/CCB-SITE/
  baseUrl: '/',

  // GitHub Pages 部署配置
  organizationName: 'LYHGLYTX', // GitHub 用户/组织名
  projectName: 'CCB-SITE', // 仓库名
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // 国际化：简体中文为主，英文备选
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {label: '简体中文'},
      en: {label: 'English'},
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/LYHGLYTX/CCB-SITE/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: '工作状态',
          blogDescription: 'CCB 开发进展与上游同步日志',
          postsPerPage: 10,
          blogSidebarTitle: '近期更新',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/LYHGLYTX/CCB-SITE/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'CCB',
        logo: {
          alt: 'CCB Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'newbieSidebar',
            position: 'left',
            label: '新人教程',
          },
          {
            type: 'docSidebar',
            sidebarId: 'devSidebar',
            position: 'left',
            label: '开发者教程',
          },
          {
            type: 'docSidebar',
            sidebarId: 'contributeSidebar',
            position: 'left',
            label: '贡献指南',
          },
          {to: '/roadmap', label: '开发路线', position: 'left'},
          {to: '/blog', label: '工作状态', position: 'left'},
          {to: '/community', label: '社区', position: 'left'},
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/LYHGLYTX/Cataclysm-Cleanwater-Bomb',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '教程',
            items: [
              {
                label: '新人教程',
                to: '/docs/newbie/intro',
              },
              {
                label: '开发者教程',
                to: '/docs/dev/intro',
              },
              {
                label: '贡献指南',
                to: '/docs/contribute/intro',
              },
              {
                label: '开发路线',
                to: '/docs/roadmap/vision',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/tUG9MFwCqf',
              },
              {
                label: 'Reddit',
                href: 'https://www.reddit.com/r/CataclysmCB/',
              },
              {
                label: 'QQ 群 / 加入我们',
                to: '/community',
              },
              {
                label: 'CDDA 官方',
                href: 'https://github.com/CleverRaven/Cataclysm-DDA',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '工作状态',
                to: '/blog',
              },
              {
                label: 'CCB 仓库',
                href: 'https://github.com/LYHGLYTX/Cataclysm-Cleanwater-Bomb',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Cataclysm: Cleanwater Bomb. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['json', 'bash', 'cpp'],
      },
    }),
};

export default config;
