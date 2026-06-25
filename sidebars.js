// @ts-check
// 侧边栏配置：新人教程 + 开发者教程 两个独立侧栏
// See: https://docusaurus.io/docs/sidebar

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // 新人教程侧栏
  newbieSidebar: [
    {
      type: 'category',
      label: '新人教程',
      collapsed: false,
      items: [
        'newbie/intro',
        'newbie/getting-started',
        'newbie/first-day',
      ],
    },
  ],

  // 开发者教程侧栏
  devSidebar: [
    {
      type: 'category',
      label: '开发者教程',
      collapsed: false,
      items: [
        'dev/intro',
        'dev/build',
        'dev/contributing',
      ],
    },
  ],

  // 贡献指南侧栏
  contributeSidebar: [
    {
      type: 'category',
      label: '贡献指南',
      collapsed: false,
      items: [
        'contribute/intro',
        'contribute/code',
        'contribute/tileset',
        'contribute/translation',
        'contribute/content',
      ],
    },
  ],

  // 开发路线侧栏
  roadmapSidebar: [
    {
      type: 'category',
      label: '开发路线',
      collapsed: false,
      items: [
        'roadmap/vision',
        'roadmap/status',
      ],
    },
  ],
};

export default sidebars;
