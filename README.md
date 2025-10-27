# Vitest Browser Mode + React + TypeScript

このプロジェクトは、Vitest Browser Mode を使用した React + TypeScript のテスト環境です。実際のブラウザでインタラクションテストを実行し、カバレッジを GUI で確認できます。

## 機能

- Vitest Browser Mode（Playwright Chromium）
- React 18 + TypeScript
- インタラクションテスト（@testing-library/react + @testing-library/user-event）
- カバレッジレポート（v8）
- Vitest UI（GUI でテスト結果とカバレッジを確認）

## セットアップ

依存関係のインストール：

```bash
npm install
```

Playwright ブラウザのインストール：

```bash
npx playwright install chromium
```

## 使用方法

### 開発サーバーの起動

```bash
npm run dev
```

### テストの実行

通常のテスト実行：

```bash
npm test
```

テストを一度だけ実行（CI モード）：

```bash
npm test -- --run
```

### Vitest UI でテストを実行

GUI でテスト結果を確認：

```bash
npm run test:ui
```

ブラウザで `http://localhost:51204/__vitest__/` が開きます。

### カバレッジレポートの表示

カバレッジ付きでテストを実行し、GUI で確認：

```bash
npm run test:coverage
```

カバレッジレポートは以下で確認できます：
- Vitest UI: `http://localhost:51204/__vitest__/`
- HTML レポート: `coverage/index.html`

## プロジェクト構造

```
.
├── src/
│   ├── components/
│   │   ├── Counter.tsx          # サンプルコンポーネント
│   │   └── Counter.test.tsx     # インタラクションテスト
│   ├── test/
│   │   └── setup.ts             # テストセットアップ
│   ├── App.tsx
│   └── main.tsx
├── vitest.config.ts              # Vitest 設定
├── vite.config.ts                # Vite 設定
└── tsconfig.json                 # TypeScript 設定
```

## テスト例

Counter コンポーネントには以下のインタラクションテストが含まれています：

- 初期表示のテスト
- インクリメント/デクリメントボタンのクリックテスト
- リセットボタンのテスト
- カスタム値の入力テスト
- 複数のインタラクションを組み合わせたテスト

詳細は `src/components/Counter.test.tsx` を参照してください。