

export function Scroll() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }


    return (
        <div>
            <div onClick={()=>{
                scrollToTop()
            }}>Scroll Example</div>
        </div>
    )
}
