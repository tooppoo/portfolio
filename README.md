# Philomagi.dev

個人サイト兼ポートフォリオ。ゲーム（アーマードコア）、技術、哲学の文章を掲載するAstro製の静的サイト。

## サイト構成

- `/`: トップページ（自己紹介と外部リンク）
- `/articles`: 記事一覧（カテゴリ横断）
- `/articles/{slug}`: 記事本文

## コンテンツ

- 収録カテゴリ: `armoredcore`, `tech`, `philosophy`
- 記事ファイル: `src/content/<category>/YYYY-MM-DD_タイトル.mdx`
- Frontmatter: `title`, `description`, `publishDate`, `category`, `tags`, `draft`
- `draft: true` は production ビルドで非表示

## 主要ディレクトリ

- `src/content`: MDX記事
- `src/pages`: ルーティング
- `src/layouts`: 共通レイアウト
- `src/components`: UI/検索コンポーネント
- `public`: 静的アセット

## 開発

| Command | Action |
| :-- | :-- |
| `pnpm install` | 依存関係のインストール |
| `pnpm dev` | 開発サーバー起動（`http://localhost:4321`） |
| `pnpm build` | 本番ビルドを `dist/` に出力 |
| `pnpm preview` | `dist/` を `wrangler dev` で確認 |
| `pnpm deploy` | Cloudflare Workers へデプロイ |
| `pnpm md:lint` | Markdown lint |

## デプロイ

- `pnpm deploy` は `astro build` 後に `wrangler deploy` を実行
- 本番アセットは `dist/` を Cloudflare Workers の static assets として配信

## ライセンス

CC BY-ND 4.0（Creative Commons Attribution-NoDerivatives 4.0 International）
