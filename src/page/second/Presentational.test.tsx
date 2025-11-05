import {Presentational} from  './Presentational.tsx'
import { render } from 'vitest-browser-react'
import { expect,  describe, it } from 'vitest'
import {Container} from "./Container.tsx";


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

    describe('Toggle Component Interactions', () => {
        it('Toggle component is closed by default', async () => {
            const screen = await render(<Container />);
            const toggleButton = screen.getByText('情報セクション');

            await expect.element(toggleButton).toBeInTheDocument();

            // 初期状態ではコンテンツが表示されていない
            const content = screen.getByText('これはトグルで開閉できるコンテンツです。').query();
            expect(content).toBeNull();
        });

        it('Toggle component opens when clicked', async () => {
            const screen = await render(<Container />);
            const toggleButton = screen.getByTestId('toggle-button');

            // クリック前はコンテンツが非表示
            let content = screen.getByText('これはトグルで開閉できるコンテンツです。').query();
            expect(content).toBeNull();

            // クリックして開く
            await toggleButton.click();

            // コンテンツが表示される
            const displayedContent = screen.getByText('これはトグルで開閉できるコンテンツです。');
            await expect.element(displayedContent).toBeInTheDocument();
        });

        it('Toggle component closes when clicked twice', async () => {
            const screen = await render(<Container />);
            const toggleButtons = screen.getByTestId('toggle-button').all();
            const firstToggleButton = toggleButtons[0];

            // 1回目のクリック：開く
            await firstToggleButton.click();
            let content = screen.getByText('これはトグルで開閉できるコンテンツです。');
            await expect.element(content).toBeInTheDocument();

            // 2回目のクリック：閉じる
            await firstToggleButton.click();
            const closedContent = screen.getByText('これはトグルで開閉できるコンテンツです。').query();
            expect(closedContent).toBeNull();
        });

        it('Second toggle with defaultOpen shows content initially', async () => {
            const screen = await render(<Container />);

            // defaultOpen={true}のトグルのコンテンツが最初から表示されている
            const content = screen.getByText('項目1');
            await expect.element(content).toBeInTheDocument();

            const item2 = screen.getByText('項目2');
            await expect.element(item2).toBeInTheDocument();
        });

        it('Toggle icon changes based on open/close state', async () => {
            const screen = await render(<Container />);
            const toggleButtons = screen.getByTestId('toggle-button').all();
            const firstToggleButton = toggleButtons[0];
            const toggleIcons = screen.getByTestId('toggle-icon').all();
            const firstIcon = toggleIcons[0];

            // 初期状態では閉じているアイコン
            await expect.element(firstIcon).toHaveTextContent('▶');

            // クリックして開く
            await firstToggleButton.click();
            await expect.element(firstIcon).toHaveTextContent('▼');

            // もう一度クリックして閉じる
            await firstToggleButton.click();
            await expect.element(firstIcon).toHaveTextContent('▶');
        });

        it('Multiple toggles work independently', async () => {
            const screen = await render(<Container />);
            const toggleButtons = screen.getByTestId('toggle-button').all();

            // 最初のトグルを開く
            await toggleButtons[0].click();
            const firstContent = screen.getByText('これはトグルで開閉できるコンテンツです。');
            await expect.element(firstContent).toBeInTheDocument();

            // 2番目のトグル（defaultOpen）を閉じる
            await toggleButtons[1].click();
            const secondContent = screen.getByText('項目1').query();
            expect(secondContent).toBeNull();

            // 最初のトグルのコンテンツはまだ表示されている
            await expect.element(firstContent).toBeInTheDocument();
        });
    });
})



// propsがちゃんとわせるか。OK
// getByTextだと完全一致では無いので、取得先ががブレる。