import {Container} from './Container.tsx'
export const Presentational = ({title}:{
    title: string;
} ) => {
    return (
        <div>
            <h1>{title}</h1>
            <Container/>
        </div>

    )
}

// このページをテストする　トグルで開くコンポーネントと、トップに戻るコンポーネントなどをPresentational,Containerに組み込んでモックする
// 次にそれらを組み合わせて、jsonをモックしてテストを作る。