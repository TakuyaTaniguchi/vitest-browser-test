import  {Text} from '../../components/Text.tsx'
import {Toggle} from '../../components/Toggle.tsx'
import {useState} from 'react'
export const Container = () => {

    const [isDisplay, setIsDisplay] = useState(false)


    return(
        <div>
            <button onClick={() => setIsDisplay(!isDisplay)}>Display</button>
            <p>Second</p>
            <Text isDisplay={isDisplay}/>

            <div style={{ marginTop: '30px' }}>
                <Toggle title="情報セクション">
                    <p>これはトグルで開閉できるコンテンツです。</p>
                    <p>追加情報をここに表示します。</p>
                </Toggle>

                <div style={{ marginTop: '20px' }}>
                    <Toggle title="詳細情報" defaultOpen={true}>
                        <ul>
                            <li>項目1</li>
                            <li>項目2</li>
                            <li>項目3</li>
                        </ul>
                    </Toggle>
                </div>
            </div>
        </div>
    )
}