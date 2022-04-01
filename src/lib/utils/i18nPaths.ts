import { i18n } from 'next-i18next.config'
export function i18nPaths(paths: any[]) {
  return paths
    .map((path) => {
      return i18n.locales.map((locale) => ({ ...path, locale }))
    })
    .flat()
}
