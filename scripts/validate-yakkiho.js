#!/usr/bin/env node
// 薬機法・医療広告ガイドライン NGワードチェック
// 記事公開前に実行: node scripts/validate-yakkiho.js

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const NG_WORDS = [
  // 薬機法的表現
  { word: '治す', level: 'CRITICAL', reason: '医薬品的効能表現' },
  { word: '治ります', level: 'CRITICAL', reason: '医薬品的効能表現' },
  { word: '治癒', level: 'CRITICAL', reason: '医薬品的効能表現' },
  { word: '根治', level: 'CRITICAL', reason: '医薬品的効能表現' },
  { word: '完治', level: 'CRITICAL', reason: '医薬品的効能表現' },
  { word: '副作用なし', level: 'CRITICAL', reason: '安全性断定' },
  { word: '効果が証明', level: 'CRITICAL', reason: '効能断定' },
  { word: '医薬品', level: 'WARNING', reason: '文脈確認が必要' },
  // 健康食品の誇大広告
  { word: 'ダイエット効果', level: 'CRITICAL', reason: '機能性表示なしの効能表現' },
  { word: '痩せる', level: 'WARNING', reason: '断定的表現に注意' },
  { word: '体脂肪が減る', level: 'WARNING', reason: '機能性表示確認が必要' },
  { word: 'セロトニン活性', level: 'WARNING', reason: '未証明の生理学的表現' },
  { word: '免疫力アップ', level: 'WARNING', reason: '誇大表現のリスク' },
  { word: '免疫力を高める', level: 'WARNING', reason: '誇大表現のリスク' },
  { word: '血糖値を下げる', level: 'CRITICAL', reason: '機能性表示なしの医療効能表現' },
  { word: '血圧を下げる', level: 'CRITICAL', reason: '機能性表示なしの医療効能表現' },
  { word: 'コレステロールを下げる', level: 'CRITICAL', reason: '機能性表示なしの医療効能表現' },
  // 不適切な比較表現
  { word: '最高の', level: 'SUGGEST', reason: '根拠のない最上級表現' },
  { word: '一番効果的', level: 'WARNING', reason: '根拠のない比較表現' },
  { word: 'No.1', level: 'WARNING', reason: '根拠・調査名が必要' },
  // 個人差無視表現
  { word: '必ず痩せる', level: 'CRITICAL', reason: '断定的効能表現' },
  { word: 'かならず', level: 'SUGGEST', reason: '個人差を考慮した表現に' },
];

let hasErrors = false;
let warningCount = 0;

function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const issues = [];

  NG_WORDS.forEach(({ word, level, reason }) => {
    lines.forEach((line, idx) => {
      if (line.includes(word)) {
        issues.push({ line: idx + 1, word, level, reason, context: line.trim().slice(0, 80) });
      }
    });
  });

  if (issues.length > 0) {
    console.log(`\n📄 ${filePath}`);
    issues.forEach(({ line, word, level, reason, context }) => {
      const icon = level === 'CRITICAL' ? '🔴' : level === 'WARNING' ? '🟡' : '💡';
      console.log(`  ${icon} [${level}] 行${line}: 「${word}」— ${reason}`);
      console.log(`     > ${context}`);
      if (level === 'CRITICAL') hasErrors = true;
      if (level === 'WARNING') warningCount++;
    });
  }
}

function walkDir(dir, exts = ['.md', '.mdx', '.astro']) {
  readdirSync(dir).forEach(file => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      if (!['node_modules', 'dist', '.astro'].includes(file)) walkDir(fullPath, exts);
    } else if (exts.includes(extname(file))) {
      checkFile(fullPath);
    }
  });
}

console.log('🔍 薬機法・医療広告ガイドライン チェック開始...');
walkDir('./src');

if (hasErrors) {
  console.log(`\n🔴 CRITICAL エラーが見つかりました。公開前に修正してください。`);
  process.exit(1);
} else if (warningCount > 0) {
  console.log(`\n🟡 WARNING ${warningCount}件。内容を確認してください。`);
  process.exit(0);
} else {
  console.log('\n✅ NGワードなし。公開可能です。');
  process.exit(0);
}
