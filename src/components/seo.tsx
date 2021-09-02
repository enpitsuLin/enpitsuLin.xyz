/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Meta {
  name?: string;
  property?: string;
  content?: string;
}

interface Props {
  title: string;
  lang?: string;
  meta?: Meta[];
  keywords?: string[];
  description?: string;
}

const Seo: React.FC<Props> = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery<GatsbyTypes.Query>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site?.siteMetadata?.description;
  const defaultTitle = site?.siteMetadata?.title;
  const defaultMeta: Meta[] = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: site?.siteMetadata?.social?.twitter || ``
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ];

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={defaultMeta.concat(meta ? meta : [])}
      link={[{ rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css' }]}
    />
  );
};

Seo.defaultProps = {
  lang: `zh-Hans`,
  meta: [],
  description: ``
};

export default Seo;
