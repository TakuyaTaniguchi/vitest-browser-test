type Props = {
  behavior?: ScrollBehavior
}

export function Scroll({ behavior = 'smooth' }: Props) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior })
  }

  return (
    <div>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        Scroll
      </button>
    </div>
  )
}
