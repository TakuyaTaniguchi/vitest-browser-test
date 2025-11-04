import '../page/second/second.css'

export const Text = ({isDisplay}:{
    isDisplay: boolean;
}) =>{


    return (
        <div>
            <div className={isDisplay? 'display-block' : 'display-none' }>テキスト</div>
        </div>
    )
}