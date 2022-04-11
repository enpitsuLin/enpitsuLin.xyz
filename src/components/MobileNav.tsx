import { AnimatePresence, motion, useCycle } from 'framer-motion'
import { MdClose, MdMenu } from 'react-icons/md'
import useTranslation from 'next-translate/useTranslation'
import Link from './Link'
import headerNavLinks from 'data/headerNavLinks'

const MobileNav = () => {
  const [open, cycleOpen] = useCycle(false, true)
  const { t } = useTranslation('common')
  const onClick = () => {
    if (open) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
    cycleOpen()
  }
  return (
    <div className="sm:hidden flex items-center">
      <motion.button
        type="button"
        className="h-8 w-8"
        aria-label="Toggle Menu"
        whileTap={{
          rotate: 180,
          transition: { duration: 0.2 },
        }}
        onClick={onClick}
      >
        {open ? (
          <MdClose size={20} className="w-8 h-8 text-gray-900 dark:text-gray-100" />
        ) : (
          <MdMenu size={20} className="w-8 h-8 text-gray-900 dark:text-gray-100" />
        )}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.aside
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { duration: 0.3 },
            }}
            initial={{ width: 0 }}
            className={`fixed top-[60px] right-0 z-10 h-screen w-full bg-gray-200 opacity-95 dark:bg-gray-800 ${
              open ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav className="fixed mt-8 h-full w-full">
              {headerNavLinks.map((link) => (
                <Link
                  key={t(link.title)}
                  href={link.href}
                  className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                  onClick={onClick}
                >
                  <motion.div
                    className="px-12 py-4"
                    whileHover={{ scale: 1.1 }}
                    variants={{
                      closed: {
                        opacity: 0,
                      },
                      open: { opacity: 1 },
                    }}
                  >
                    {t(link.title)}
                  </motion.div>
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileNav
