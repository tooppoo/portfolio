# Portfolio Site Development Guide

## プロジェクト概要

- **目的**: 個人ポートフォリオサイト (philomagi.dev)
- **技術スタック**: Astro + Cloudflare Workers + TypeScript + pnpm
- **作者**: philomagi (<tooppoo56@gmail.com>)

## 開発コマンド

```bash
pnpm dev          # 開発サーバー起動 (localhost:4321)
pnpm build        # 本番ビルド
pnpm preview      # ビルド + wrangler dev でプレビュー
pnpm deploy       # Cloudflareにデプロイ
pnpm cf-typegen   # Cloudflare Workers型定義生成
pnpm md:lint      # Markdownファイルのリント
```

## プロジェクト構造

```txt
src/
├── components/   # 再利用可能なコンポーネント
├── layouts/      # ページレイアウト
├── pages/        # ルーティング対象ページ
└── assets/       # 静的アセット

public/           # 静的ファイル (favicon, 画像等)
```

## 開発ガイドライン

### コンポーネント作成

- `.astro`ファイルでコンポーネント作成
- TypeScriptを積極活用
- レスポンシブデザインを考慮
- アクセシビリティを重視

### スタイリング

- Astroの標準CSS機能を使用
- モバイルファーストアプローチ
- パフォーマンスを重視したCSS

### SEO最適化（重要）

- **メタデータ**: title, description, OG画像を各ページで設定
- **構造化データ**: JSON-LDを適切に実装
- **パフォーマンス**: Core Web Vitalsを重視
- **アクセシビリティ**: セマンティックHTML、alt属性
- **サイトマップ**: 自動生成設定
- **robots.txt**: 適切なクローラー制御

### 新しいページ追加

1. `src/pages/`にファイル作成
2. 適切なレイアウトを適用
3. **SEOメタデータを必ず設定**（title, description, OG画像）
4. 構造化データがある場合は追加

## Cloudflare Workers制約

- Edge Runtimeのため一部Node.js APIは使用不可
- バンドルサイズに注意
- `wrangler.jsonc`で設定管理

## よくあるタスク指示例

### SEO関連
- "サイトマップを生成して"
- "構造化データを追加して"
- "OG画像を設定して"
- "パフォーマンススコアを改善して"
- "アクセシビリティ問題を修正して"

### 開発関連
- "新しいブログページを作成して"
- "レスポンシブなナビゲーションコンポーネントを追加"
- "Cloudflare設定を調整"
- "マークダウンコンテンツを追加"

## 注意事項

### 必須チェック項目

- デプロイ前に必ず`pnpm build`でビルド確認
- 型エラーがないことを確認
- **SEOメタデータが全ページに設定されているか確認**
- **パフォーマンスとアクセシビリティスコアを確認**
- セキュリティベストプラクティスを遵守

### SEO優先事項

- 各ページのtitle、description、OG画像は必須
- 画像のalt属性、適切な見出しタグ使用
- ページ読み込み速度の最適化
- モバイルフレンドリー対応
