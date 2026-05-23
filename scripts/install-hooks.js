/**
 * scripts/install-hooks.js
 *
 * git clone 後に .git/hooks/pre-push を自動復元するインストーラー。
 * npm install / npm run prepare 時に自動実行される。
 *
 * 動作条件:
 *   - .git が存在しない場合 (CI 環境など) はスキップ (exit 0)
 *   - scripts/hooks/pre-push がソースファイル
 *   - .git/hooks/pre-push にコピーして chmod 755 を付与
 */

import { existsSync, copyFileSync, chmodSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

const hookSrc = join(__dirname, 'hooks', 'pre-push');
const gitDir  = join(repoRoot, '.git');
const hookDst = join(gitDir, 'hooks', 'pre-push');

// .git が存在しない場合は CI 環境とみなしてスキップ
if (!existsSync(gitDir)) {
  console.log('[install-hooks] .git が見つかりません。スキップします (CI 環境?)');
  process.exit(0);
}

// ソースファイルが存在しない場合はエラー
if (!existsSync(hookSrc)) {
  console.error('[install-hooks] ERROR: scripts/hooks/pre-push が見つかりません');
  process.exit(1);
}

// .git/hooks ディレクトリが存在しない場合は作成
const hooksDir = join(gitDir, 'hooks');
if (!existsSync(hooksDir)) {
  mkdirSync(hooksDir, { recursive: true });
}

// hook をコピー
copyFileSync(hookSrc, hookDst);

// 実行権限付与 (Unix 系のみ有効。Windows Git for Windows は #!/bin/sh で動くため問題なし)
try {
  chmodSync(hookDst, 0o755);
} catch {
  // Windows では chmod が失敗しても Git が sh で実行するため無視
}

console.log('[install-hooks] .git/hooks/pre-push を復元しました');
