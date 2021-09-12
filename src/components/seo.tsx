/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import FavIcon from '@/assets/images/logo.svg';
import useSiteMetadata from '@/hooks/useSiteMetadata';

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

const Seo: FunctionComponent<Props> = ({ description, lang, meta, title }) => {
  const { site } = useSiteMetadata();

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
      link={[{ rel: 'icon', type: 'image/ico', href: FavIcon }]}
    ></Helmet>
  );
};

Seo.defaultProps = {
  lang: `zh-Hans`,
  meta: [],
  description: ``
};

export default Seo;
