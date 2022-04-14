import { Toc } from '@/types/Toc'
import { useEffect, useState } from 'react'
import { FaArrowUp, FaComment, FaList } from 'react-icons/fa'
import TOCInline from './TOCInline'

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

const ScrollTopAndComment: React.FC<{ toc: Toc }> = ({ toc }) => {
  const [show, setShow] = useState(false)
  const [tocShow, setTocShow] = useState(false)

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
      {toc.length > 0 && (
        <div className="relative">
          <Button
            aria-label="Table of content"
            onClick={() => {
              setTocShow((show) => !show)
            }}
          >
            <FaList className="h-4 w-4" />
          </Button>
          {tocShow && (
            <div className="absolute right-10 bottom-0 w-80 max-h-180 bg-gray-200 dark:bg-gray-700 shadow p-2 rounded-md overflow-y-auto">
              <div className="prose dark:prose-dark">
                <TOCInline toc={toc} asDisclosure />
              </div>
            </div>
          )}
        </div>
      )}
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
