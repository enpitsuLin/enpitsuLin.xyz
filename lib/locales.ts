export { extractLocale };

export const locales = ['zh', 'en'];
export const localeDefault = 'zh';

const zh = {
  common: {
    about: '关于',
    blog: '文章',
    home: '主页',
    tags: '标签'
  },
  exception: {
    back: '返回首页',
    desc: '不过不用着急，你可以返回首页找到很多其他更精彩的东西。',
    'not-found': '糟糕!这个页面好像消失了.',
    'internal-except': "我去! 怎么又有个bug."
  },
  post: {
    all: '全部文章',
    latest: '最新文章',
    'no-post': '暂无文章',
    page: {
      next: '下一页',
      previous: '上一页'
    },
    'published-on': '发布于',
    'reading-time': '阅读时间',
    'reading-time-var': '约 {{time}} 分钟',
    tags: '标签',
    'words-count': '字数统计',
    'words-count-var': '约 {{words}} 字'
  },
  search: {
    placeholder: '搜索文章'
  },
  toc: '文章目录',
  welcome: '你好'
};
const en: typeof zh = {
  common: {
    about: 'About',
    blog: 'Blog',
    home: 'Home',
    tags: 'Tags'
  },
  exception: {
    back: 'Back to homepage',
    desc: 'But dont worry, you can find plenty of other things on our homepage.',
    'not-found': "Oops! That page can't be found.",
    'internal-except': "Dam* it! Another problem."
  },
  post: {
    all: 'all posts',
    latest: 'Latest',
    'no-post': 'No posts found.',
    page: {
      next: 'Next',
      previous: 'Previous'
    },
    'published-on': 'Published on',
    'reading-time': 'ReadingTime',
    'reading-time-var': '{{time}} min read',
    tags: 'Tags',
    'words-count': 'Word count',
    'words-count-var': '{{words}} words'
  },
  search: {
    placeholder: 'Search articles'
  },
  toc: 'Table of Contents',
  welcome: 'Hello'
};

export const resources = { zh, en };

function extractLocale(url: string) {
  const urlPaths = url.split('/');

  let locale;
  let urlWithoutLocale;
  const firstPath = urlPaths[1];
  if (locales.filter((locale) => locale !== localeDefault).includes(firstPath)) {
    locale = firstPath;
    urlWithoutLocale = '/' + urlPaths.slice(2).join('/');
  } else {
    locale = localeDefault;
    urlWithoutLocale = url;
  }

  return { locale, urlWithoutLocale };
}
