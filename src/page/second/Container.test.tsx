import {Container} from './Container'
import { render } from 'vitest-browser-react'
import { expect,  describe, it } from 'vitest'

// https://vitest.dev/guide/browser/locators
// https://vitest.dev/api/expect


describe('Second Page Container', () => {
    it('renders without crashing',async  () => {
        const screen = await render(<Container />);
        await expect.element(screen.getByText('Second')).toBeDefined();
    });

    it('initially text is hidden', async () => {
        const screen = await render(<Container />);
        const text = screen.getByText('テキスト');
        // 初期状態では display-none クラスが適用されている
        await expect.element(text).toHaveClass('display-none');
    });

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

        // もう一度クリック
        await button.click();

        // 再び非表示
        await expect.element(text).toHaveClass('display-none');
    });
});

