import {Presentational} from  './Presentational.tsx'
import { render } from 'vitest-browser-react'
import { expect,  describe, it } from 'vitest'
import {Container} from "./Container.tsx"


describe('Second Page Presentational', () => {
    it('render second Presentational', async () => {
    const screen = await render(<Presentational title={'セカンドページ'}/>);
    await expect.element(screen.getByText('セカンドページ')).toBeDefined();
    })

    it('initially text is hidden', async () => {
        const screen = await render(<Presentational title={'タイトル'} />);
        const text = screen.getByText('テキスト');
        // 初期状態では display-none クラスが適用されている
        await expect.element(text).toHaveClass('display-none');
    });

    it('Presentational shows text when Display button is clicked', async () => {
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

    it('Presentational Toggle Test', async () => {
        const screen = await render(<Container/>)
        const button = screen.getByTestId('toggle-button').first()
        await button.click()
        const container = screen.getByTestId('toggle-content')
        await expect.element(container.getByText('開閉できるコンテンツ')).toBeDefined()

    })



})



// propsがちゃんとわせるか。OK
// getByTextだと完全一致では無いので、取得先ががブレる。