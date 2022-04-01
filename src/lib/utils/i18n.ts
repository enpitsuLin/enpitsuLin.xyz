import { i18n } from 'next-i18next.config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export function i18nPaths(paths: any[]) {
  return paths
    .map((path) => {
      return i18n.locales.map((locale) => ({ ...path, locale }))
    })
    .flat()
}
export async function serverSideI18nProps(locale: string) {
  const ret = await serverSideTranslations(locale, ['common', 'header'])
  return ret
}
