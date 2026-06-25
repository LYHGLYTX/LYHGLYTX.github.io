#!/usr/bin/env node

/**
 * 从 GitHub 获取 CCB 仓库今日活动（PR、commit），自动生成博客文章。
 *
 * 用法:
 *   node scripts/generate-activity-blog.js [--dry-run]
 *
 * 环境变量:
 *   GITHUB_TOKEN      - GitHub API 令牌（Actions 中自动提供）
 *   GITHUB_REPOSITORY - 仓库名，默认 LYHGLYTX/Cataclysm-Cleanwater-Bomb
 *   LOOKBACK_DAYS     - 回顾天数，默认 1
 */

const fs = require("fs");
const path = require("path");

const REPO = process.env.GITHUB_REPOSITORY || "LYHGLYTX/Cataclysm-Cleanwater-Bomb";
const LOOKBACK_DAYS = parseInt(process.env.LOOKBACK_DAYS || "1", 10);
const BLOG_DIR = path.join(__dirname, "..", "blog");
const DRY_RUN = process.argv.includes("--dry-run");

const TOKEN = process.env.GITHUB_TOKEN || "";
const AUTH_HEADER = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "ccb-blog-generator/1.0",
      ...AUTH_HEADER,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status}: ${res.url}\n${text}`);
  }
  return res.json();
}

async function fetchMergedPRs(since) {
  const prs = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/repos/${REPO}/pulls?state=closed&sort=updated&direction=desc&per_page=100&page=${page}`;
    const batch = await fetchJSON(url);
    if (!batch || batch.length === 0) break;

    let foundOld = false;
    for (const pr of batch) {
      if (!pr.merged_at) continue;
      const merged = new Date(pr.merged_at);
      if (merged < since) {
        foundOld = true;
        break;
      }
      prs.push(pr);
    }
    if (foundOld || batch.length < 100) break;
    page++;
  }

  return prs;
}

async function fetchRecentCommits(since) {
  const url = `https://api.github.com/repos/${REPO}/commits?since=${since.toISOString()}&per_page=100`;
  return fetchJSON(url);
}

function formatDate(d) {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${d.getFullYear()}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function todayStr() {
  const now = new Date();
  return formatDate(now);
}

async function main() {
  const now = new Date();
  const since = new Date(now.getTime() - LOOKBACK_DAYS * 86400000);
  const dateStr = formatDate(now);
  const slug = `${dateStr}-activity`;
  const filename = `${dateStr}-activity.md`;

  const existingFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  if (existingFiles.some((f) => f.startsWith(dateStr))) {
    console.log(`[skip] 今日博客已存在 (${dateStr})`);
    return { created: false };
  }

  console.log(`[fetch] 获取 ${REPO} ${dateStr} 活动...`);

  let prs;
  let commits;
  try {
    [prs, commits] = await Promise.all([
      fetchMergedPRs(since),
      fetchRecentCommits(since),
    ]);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  console.log(`[info] 已合并 PR: ${prs.length}  提交: ${commits.length}`);

  if (prs.length === 0 && commits.length === 0) {
    console.log("[skip] 今日无活动");
    return { created: false };
  }

  const stats = {};
  for (const pr of prs) {
    const u = pr.user ? pr.user.login : "unknown";
    if (!stats[u]) stats[u] = { prs: 0, commits: 0 };
    stats[u].prs++;
  }
  for (const c of commits) {
    const u = c.author ? c.author.login : (c.commit?.author?.name || "unknown");
    if (!stats[u]) stats[u] = { prs: 0, commits: 0 };
    stats[u].commits++;
  }
  const contributors = Object.entries(stats)
    .map(([name, s]) => ({ name, total: s.prs * 3 + s.commits, ...s }))
    .sort((a, b) => b.total - a.total);

  // 生成内联作者（所有贡献者，带头像和 GitHub 链接）
  const authorsYaml = contributors
    .map((c) => `  - {name: '${c.name}', image_url: 'https://github.com/${c.name}.png?size=40', url: 'https://github.com/${c.name}'}`)
    .join("\n");

  const lines = [];

  lines.push("---");
  lines.push(`slug: ${slug}`);
  lines.push(`title: CCB 开发动态 (${dateStr})`);
  lines.push("authors:");
  lines.push(authorsYaml);
  lines.push("tags: [activity, auto]");
  lines.push("---");
  lines.push("");
  lines.push(
    `${dateStr} 开发动态，由 GitHub Actions 自动生成。`
  );
  lines.push("");
  lines.push("{/* truncate */}");
  lines.push("");

  lines.push("## 今日贡献者");
  lines.push("");
  lines.push("<div class=\"contributors-row\">");
  for (const c of contributors) {
    const avatar = `https://github.com/${c.name}.png?size=40`;
    const profile = `https://github.com/${c.name}`;
    lines.push(
      `  <a href="${profile}" title="@${c.name}" class="contributor-badge">` +
      `<img src="${avatar}" width="28" height="28" loading="lazy" />` +
      `<span>${c.name}</span></a>`
    );
  }
  lines.push("</div>");
  lines.push("");

  if (prs.length > 0) {
    lines.push(`## 已合并 PR（${prs.length}）`);
    lines.push("");
    lines.push("| PR | 标题 | 作者 | 合并时间 |");
    lines.push("|---|---|---|---|");
    for (const pr of prs) {
      const title = (pr.title || "").replace(/\|/g, "\\|");
      const user = pr.user ? pr.user.login : "unknown";
      const date = formatDate(new Date(pr.merged_at));
      const num = `[#${pr.number}](${pr.html_url})`;
      lines.push(`| ${num} | ${title} | @${user} | ${date} |`);
    }
    lines.push("");
  }

  if (commits.length > 0) {
    lines.push(`## 今日提交（${commits.length}）`);
    lines.push("");
    lines.push("| 提交 | 说明 | 作者 | 时间 |");
    lines.push("|---|---|---|---|");
    for (const c of commits.slice(0, 50)) {
      const msg = (c.commit?.message || "").split("\n")[0].replace(/\|/g, "\\|").substring(0, 80);
      const user = c.author ? c.author.login : (c.commit?.author?.name || "unknown");
      const date = formatDate(new Date(c.commit?.author?.date));
      const shortSha = c.sha.substring(0, 7);
      const link = `[${shortSha}](${c.html_url})`;
      lines.push(`| ${link} | ${msg} | @${user} | ${date} |`);
    }
    lines.push("");
  }

  const content = lines.join("\n");
  const filePath = path.join(BLOG_DIR, filename);

  if (DRY_RUN) {
    console.log(`[dry-run] 将写入 blog/${filename}`);
    console.log(content);
    return { created: true, filePath };
  }

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`[done] 已生成 blog/${filename}`);
  return { created: true, filePath };
}

main()
  .then((result) => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
