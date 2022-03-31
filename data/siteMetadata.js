const siteMetadata = {
  title: "enpitsulin's Blog",
  author: 'enpitsulin',
  headerTitle: "enpitsulin's Blog",
  description: 'Make Things happy',
  language: 'zh-Hans',
  theme: 'system', // system, dark or light
  siteUrl: 'https://enpitsulin.github.io',
  siteRepo: 'https://github.com/enpitsulin/enpitsulin.github.io',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'enpitsulin@gmail.com',
  github: 'https://github.com/enpitsulin',
  qq: 'http://wpa.qq.com/msgrd?v=3&uin=1092199651&site=qq&menu=yes',
  zhihu: 'https://zhihu.com/people/enpitsulin',
  bilibili: 'https://space.bilibili.com/423632',
  steam: 'https://steamcommunity.com/profiles/76561198338250608/',
  locale: 'zh-Hans',
  analytics: {
    plausibleDataDomain: '',
    simpleAnalytics: false,
    umamiWebsiteId: '',
    googleAnalyticsId: '',
  },
  comment: {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
    repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    mapping: 'pathname', // supported options: pathname, url, title
    reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
    metadata: '0',
    theme: 'light',
    inputPosition: 'bottom',
    lang: 'zh-CN',
    darkTheme: 'transparent_dark',
    themeURL: '',
  },
  lastUpdateTime: new Date(),
}

module.exports = siteMetadata
