import { Helmet } from 'react-helmet-async';
import { usePageContext } from '~/hooks/usePageContext';
import { Post } from '~/lib/types';
import { siteMeta } from '~/package.json';

interface CommonSEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
}

const CommonSEO = ({ title, description = siteMeta.description, canonicalUrl }: CommonSEOProps) => {
  const context = usePageContext();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl ? canonicalUrl : `http://enpitsulin.xyz${context.urlPathname}`} />
    </Helmet>
  );
};

interface PageSEOProps {
  title: string;
  description?: string;
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  return <CommonSEO title={title} description={description} />;
};

export const TagSEO = ({ title, description }: PageSEOProps) => {
  const context = usePageContext();
  return (
    <>
      <CommonSEO title={title} description={description} />
      <Helmet>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`/feed?tag=${context.routeParams?.tag}`}
        />
      </Helmet>
    </>
  );
};
interface BlogSeoProps extends Post {
  images?: string[];
  canonicalUrl?: string;
  lastmod?: string;
}

export const PostSEO = ({ title, summary, date, lastmod, slug, images = [], canonicalUrl }: BlogSeoProps) => {
  const publishedAt = new Date(date).toISOString();
  const modifiedAt = new Date(lastmod || date).toISOString();

  const featuredImages = images.map((img) => {
    return {
      '@type': 'ImageObject',
      url: `${siteMeta.siteUrl}${img}`
    };
  });

  const authorList = {
    '@type': 'Person',
    name: siteMeta.author
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteMeta.siteUrl}/blog/${slug}`
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: siteMeta.author,
      logo: {
        '@type': 'ImageObject',
        url: `${siteMeta.siteUrl}$/static/images/logo.png`
      }
    },
    description: summary
  };

  return (
    <>
      <CommonSEO title={title} description={summary} canonicalUrl={canonicalUrl} />
      <Helmet>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2)
          }}
        />
      </Helmet>
    </>
  );
};
