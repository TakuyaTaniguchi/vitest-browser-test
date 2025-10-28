import {Scroll}from '../../components/Scroll'

export const Presentational = () => {

    // pタグで1,2,3で300個くらいの要素をレンダリングする
    const items = [];
    for (let i = 1; i <= 300; i++) {
        items.push(<p key={i}>Item {i}</p>);
    }


    return (
        <>
            <div>Home</div>
            <div>
                {items}
            </div>
            <Scroll/>

        </>

    )

};