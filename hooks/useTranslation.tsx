import { createContext, useContext, PropsWithChildren, useCallback } from 'react';
import { localeDefault, resources } from '~/lib/locales';

export { I18nContextProvider };
export { useTranslation };

type Locales = keyof typeof resources;
type LocaleDict = typeof resources[typeof localeDefault];

type Definitions = {};

type ValueOf<T> = T[keyof T];
type Concat<T, U> = `${string & T}.${string & U}`;
type LangRec<D extends string | Definitions> = D extends string
  ? ''
  : //@ts-expect-error
    `${ValueOf<{ [k in keyof D]: Concat<k, LangRec<D[k]>> }>}`;
type RemoveTrailingDot<T extends string> = T extends `${infer U}.` ? U : T;
type LangIdsOf<D extends Definitions> = RemoveTrailingDot<LangRec<D>>;

const Context = createContext<string>(localeDefault);

function I18nContextProvider({ locale: lang, children }: PropsWithChildren<{ locale: string }>) {
  return <Context.Provider value={lang}>{children}</Context.Provider>;
}

function useTranslation() {
  const locale = useContext(Context);
  // why locale undefined ??
  const translationDict = resources[(locale || localeDefault) as Locales] as LocaleDict;

  const t = useCallback(
    function t<Id extends LangIdsOf<LocaleDict>>(id: Id, arg?: Record<string, string | number>) {
      if (arg) return replacePlaceholders(getDefinition(translationDict, id), arg);
      return getDefinition(translationDict, id);
    },
    [locale, resources]
  );
  return { t, locale, translationDict };
}

const getDefinition = (definitions: Definitions, id: string): string => {
  if (typeof definitions === 'undefined') {
    // debugger
    throw Error(`definitions resources is not valid`);
  }
  let content = definitions;
  for (const key of id.split('.')) {
    if (typeof content === 'undefined') {
      throw Error(`Id ${id} is not valid`);
    }
    //@ts-expect-error
    content = content[key] as any;
  }
  if (typeof content !== 'string') {
    throw Error(`Id ${id} is not valid`);
  }
  return content;
};

const replacePlaceholders = (definition: string, args: Record<string, string | number>): string => {
  Object.entries(args).forEach(([key, val]) => {
    const searcher = new RegExp(`\{\{${key}\}\}`);
    definition = definition.replace(searcher, val.toString());
  });
  return definition;
};