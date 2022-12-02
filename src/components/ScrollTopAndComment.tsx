import { useEffect, useState } from 'react'
import { FaArrowUp, FaComment } from 'react-icons/fa'

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, ...rest }) => {
  const classes = [
    rest.className,
    'rounded-full bg-gray-200 p-2 text-gray-700 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600',
  ].join(' ')
  return (
    <button {...rest} type="button" className={classes}>
      {children}
    </button>
  )
}

const ScrollTopAndComment: React.FC = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }
    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment').scrollIntoView()
  }
  return (
    <div className="fixed right-8 bottom-8 hidden flex-col gap-3 md:flex z-20">
      <Button aria-label="Scroll To Comment" onClick={handleScrollToComment}>
        <FaComment className="h-4 w-4" />
      </Button>

      <Button
        aria-label="Scroll To Top"
        className={show ? 'md:block' : 'md:hidden'}
        onClick={handleScrollTop}
      >
        <FaArrowUp className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default ScrollTopAndComment
