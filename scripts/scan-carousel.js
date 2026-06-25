#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "static", "img", "carousel");
const DST = path.join(
  __dirname,
  "..",
  "src",
  "components",
  "HomepageCarousel",
  "slides.json"
);

const exts = [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"];

const files = fs
  .readdirSync(SRC)
  .filter((f) => exts.includes(path.extname(f).toLowerCase()))
  .sort();

const slides = files.map((f) => `img/carousel/${f}`);

fs.writeFileSync(DST, JSON.stringify(slides, null, 2), "utf-8");
console.log(`[scan] 已发现 ${slides.length} 张轮播图 → src/components/HomepageCarousel/slides.json`);
