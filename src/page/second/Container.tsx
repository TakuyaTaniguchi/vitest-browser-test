import  {Text} from '../../components/Text.tsx'
import {useState} from 'react'
export const Container = () => {

    const [isDisplay, setIsDisplay] = useState(false)


    return(
        <div>
            <button onClick={() => setIsDisplay(!isDisplay)}>Display</button>
            <p>Second</p>
            <Text isDisplay={isDisplay}/>
        </div>
    )
}