import { Toc } from '@/types/Toc'
import { useEffect, useState } from 'react'
import { FaArrowUp, FaComment, FaList } from 'react-icons/fa'

const Button: React.FC<JSX.IntrinsicElements['button']> = ({ children, ...rest }) => {
  const classes = [
    rest.className,
    'rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600',
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
  const handleScrollToToc = (selector: string) => {
    const el = document.querySelector(selector) as HTMLElement
    const { offsetTop } = el
    window.scrollTo({
      top: offsetTop < 1000 ? offsetTop - 69 : offsetTop,
      behavior: 'smooth',
    })
  }
  return (
    <div className="fixed right-8 bottom-8 hidden flex-col gap-3 md:flex z-20">
      <Button aria-label="Scroll To Comment" onClick={handleScrollToComment.bind(this)}>
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
            <div className="absolute right-10 bottom-0 h-80 w-80 rounded-md shadow-md p-4 overflow-y-auto">
              <div className="flex flex-col">
                {toc.map((h) => (
                  <a
                    key={h.value}
                    className="hover:bg-gray-500 cursor-pointer my-1 px-1"
                    style={{ marginLeft: `${(h.depth - 1) * 20}px` }}
                    onClick={() => {
                      handleScrollToToc(h.url)
                    }}
                  >
                    <span>{h.value}</span>
                  </a>
                ))}
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
