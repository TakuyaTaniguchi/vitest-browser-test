import  {Text} from '../../components/Text.tsx'
import {Toggle} from '../../components/Toggle.tsx'
import {useState, useEffect} from 'react'
import dataJson from './data.json'

export const Container = () => {

    const [isDisplay, setIsDisplay] = useState(false)
    const [jsonData, setJsonData] = useState<any>(null)

    useEffect(() => {
        // JSONを直接インポートして使用
        setJsonData(dataJson)
    }, [])

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

                {jsonData && (
                    <div style={{ marginTop: '20px' }}>
                        <Toggle title={jsonData.title}>
                            <ul data-testid="json-items">
                                {jsonData.items.map((item: any) => (
                                    <li key={item.id} data-testid={`json-item-${item.id}`}>
                                        <strong>{item.name}</strong>: {item.description}
                                    </li>
                                ))}
                            </ul>
                        </Toggle>
                    </div>
                )}
            </div>
        </div>
    )
}