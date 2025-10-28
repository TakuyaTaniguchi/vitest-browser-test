import {Container} from './Container'
import { render } from 'vitest-browser-react'
import { expect,  describe } from 'vitest'


// とりあえず何かしらのHTML要素がレンダリングされることを確認するテスト

describe('Home Page Container', () => {
  it('renders without crashing',async  () => {
    const screen = await render(<Container />);
    // 例えば、"Home Page"というテキストが存在することを確認
    await expect.element(screen.getByText('Home')).toBeDefined();
  });

  // Scrollを押下した時に一番上にスクロールされることを確認するテスト
  it('scrolls to top when Scroll is clicked', async () => {
    const screen = await render(<Container />)
    const scrollButton = screen.getByText('Scroll')


    // スクロール位置を一番下に設定
    window.scrollTo(0, document.body.scrollHeight)
    expect(window.scrollY).toBeGreaterThan(0)

    // Scrollボタンをクリック（smoothスクロールは非同期）
    await scrollButton.click()

    // シンプルに少し待ってから判定（必要に応じて調整）
    await new Promise((r) => setTimeout(r, 2000))

    expect(window.scrollY).toBe(0)
  })
});
