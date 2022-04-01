import { useState } from 'react'
import { i18n } from 'next-i18next.config'
import { useRouter } from 'next/router'
import Link from 'next/link'

const locales = i18n.locales

const I18nSwitch = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const inactiveClasses =
    'group flex rounded-md items-center w-full px-2 py-2 text-sm justify-center text-gray-900 hover:bg-gray-100'
  const activeClasses = [inactiveClasses, 'bg-gray-200'].join(' ')

  const changeLanguage = (locale: string) => {
    router.push(router.asPath, router.asPath, { locale })
    setOpen(false)
  }
  return (
    <div className="relative inline-block text-center">
      <div>
        <button
          className="inline-flex justify-center w-full px-[22px] py-[12px] text-sm font-medium text-gray-500 rounded-md bg-opacity-20 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-100 focus-visible:ring-opacity-75"
          id="headlessui-menu-button-10"
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
          aria-controls="headlessui-menu-items-20"
          onClick={() => {
            setOpen((open) => !open)
          }}
        >
          {router.locale.toUpperCase()}
        </button>
      </div>
      {open && (
        <div
          className="absolute right-0 w-14 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div className="px-1 py-1 " role="none">
            {locales.map((locale) => (
              <a
                role="none"
                key={locale}
                className={locale == router.locale ? activeClasses : inactiveClasses}
                onClick={() => changeLanguage(locale)}
              >
                <span role="none" className="cursor-pointer">
                  {locale.toUpperCase()}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default I18nSwitch
