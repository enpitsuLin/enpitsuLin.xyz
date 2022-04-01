import { locales } from 'i18n'

export function i18nPaths(paths: any[]) {
  return paths
    .map((path) => {
      return locales.map((locale) => ({ ...path, locale }))
    })
    .flat()
}
