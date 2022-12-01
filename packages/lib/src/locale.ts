/// <reference lib="dom" />

export const formatDate = (date: string, locales?: Intl.LocalesArgument) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const now = new Date(date).toLocaleDateString(locales, options);

  return now;
};
