# Vitest Browser Mode モックのメモ

## 基本的な考え方

### モック不要なケース（統合テスト）
- ページ全体の動作をテストしたい
- 決済、商品一覧、クーポンモーダルなど複数機能の統合テスト
- 実際のユーザー体験に近いテスト
- **すべて実際のコンポーネントでレンダリング**してテスト

```tsx
import { render } from 'vitest-browser-react'
import { expect, describe, it } from 'vitest'
import { Container } from './Container'

describe('Second Page Container', () => {
    it('shows text when Display button is clicked', async () => {
        const screen = await render(<Container />);
        const button = screen.getByRole('button', { name: 'Display' });
        const text = screen.getByText('テキスト');

        // クリック前は非表示
        await expect.element(text).toHaveClass('display-none');

        // ボタンをクリック
        await button.click();

        // クリック後は表示
        await expect.element(text).toHaveClass('display-block');
    });
});
```

### モックが必要なケース
- 外部API呼び出し（決済APIなど）
- GraphQLクエリ
- 時間のかかる処理
- ネットワークに依存する処理

## REST API のモック

```tsx
import { render } from 'vitest-browser-react'
import { expect, describe, it, vi } from 'vitest'
import { Container } from './Container'

// APIだけモックする
vi.mock('../../api/paymentApi', () => ({
    fetchProducts: vi.fn(() => Promise.resolve([
        { id: 1, name: '商品A', price: 1000 },
        { id: 2, name: '商品B', price: 2000 }
    ])),
    processPurchase: vi.fn(() => Promise.resolve({ success: true }))
}))

describe('Payment Page', () => {
    it('displays products from API', async () => {
        const screen = await render(<Container />);
        await expect.element(screen.getByText('商品A')).toBeVisible();
    });
});
```

### エラーケース

```tsx
vi.mock('../../api/paymentApi', () => ({
    fetchProducts: vi.fn(() => Promise.reject(new Error('API Error'))),
}))

it('shows error message when API fails', async () => {
    const screen = await render(<Container />);
    await expect.element(screen.getByText('API Error')).toBeVisible();
});
```

## GraphQL のモック

### 1. Apollo Client をモック

```tsx
import { render } from 'vitest-browser-react'
import { expect, describe, it, vi } from 'vitest'
import { Container } from './Container'

// Apollo ClientのuseQueryをモック
vi.mock('@apollo/client', () => ({
    useQuery: vi.fn(() => ({
        data: {
            products: [
                { id: 1, name: '商品A', price: 1000 },
                { id: 2, name: '商品B', price: 2000 }
            ]
        },
        loading: false,
        error: null
    })),
    gql: (strings) => strings[0] // gqlタグをそのまま返す
}))

describe('GraphQL Page', () => {
    it('displays products from GraphQL', async () => {
        const screen = await render(<Container />);
        await expect.element(screen.getByText('商品A')).toBeVisible();
    });
});
```

### 2. GraphQL エラーケース

```tsx
vi.mock('@apollo/client', () => ({
    useQuery: vi.fn(() => ({
        data: null,
        loading: false,
        error: new Error('GraphQL Error: Network error')
    })),
    gql: (strings) => strings[0]
}))

it('shows error when GraphQL fails', async () => {
    const screen = await render(<Container />);
    await expect.element(screen.getByText(/GraphQL Error/)).toBeVisible();
});
```

### 3. ローディング状態

```tsx
vi.mock('@apollo/client', () => ({
    useQuery: vi.fn(() => ({
        data: null,
        loading: true,
        error: null
    })),
    gql: (strings) => strings[0]
}))

it('shows loading spinner', async () => {
    const screen = await render(<Container />);
    await expect.element(screen.getByTestId('loading-spinner')).toBeVisible();
});
```

## コンポーネントのモック（通常は不要）

特定のコンポーネントのprops渡しをテストしたい場合のみ使用：

```tsx
// Textコンポーネントをモック化し、propsを記録する
const mockText = vi.fn(({ isDisplay }: { isDisplay: boolean }) => {
    return <div data-testid="mocked-text">isDisplay: {String(isDisplay)}</div>
})

vi.mock('../../components/Text.tsx', () => ({
    Text: mockText
}))

it('passes isDisplay=false to Text component initially', async () => {
    const screen = await render(<Container />);
    // Textコンポーネントが初期状態でisDisplay=falseで呼ばれたことを確認
    expect(mockText).toHaveBeenCalledWith({ isDisplay: false }, expect.anything())
});
```

## まとめ

- **UIコンポーネント**: 基本的にモックしない（実際のものを使う）
- **外部API、GraphQL**: モックする
- **テストの方針**: propsを直接操作するのではなく、Playwrightのイベント（クリック、入力など）を使ってユーザー操作をシミュレート

## 参考リンク

- https://vitest.dev/guide/browser/locators
- https://vitest.dev/api/expect
