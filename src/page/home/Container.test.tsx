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
});