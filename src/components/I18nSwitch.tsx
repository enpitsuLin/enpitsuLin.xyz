import { useState } from 'react'
import { locales } from 'i18n'
import { useRouter } from 'next/router'

const I18nSwitch = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const inactiveClasses =
    'group flex rounded-md items-center w-full px-2 py-2 text-sm justify-center text-gray-900 hover:bg-gray-100 '
  const activeClasses = [inactiveClasses, 'bg-gray-200'].join(' ')

  const changeLanguage = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale })
    setOpen(false)
  }
  return (
    <div className="text-center relative inline-block">
      <div>
        <button
          className="rounded-md font-medium bg-opacity-20 text-sm w-full py-[12px] px-[22px] text-gray-900 inline-flex justify-center dark:text-gray-200 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:ring-opacity-75 dark:hover:text-black"
          type="button"
          onClick={() => {
            setOpen((open) => !open)
          }}
        >
          {router.locale.toUpperCase()}
        </button>
      </div>
      {open && (
        <div
          className="divide-y bg-white rounded-md divide-gray-100 shadow-lg ring-black mt-2 origin-top-right right-0 ring-1 ring-opacity-5 w-14 z-20 absolute focus:outline-none"
          role="menu"
        >
          <div className="cursor-pointer py-1 px-1" role="none">
            {locales.map((locale) => (
              <a
                role="none"
                key={locale}
                className={locale == router.locale ? activeClasses : inactiveClasses}
                onClick={() => changeLanguage(locale)}
              >
                <span role="none">{locale.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default I18nSwitch
