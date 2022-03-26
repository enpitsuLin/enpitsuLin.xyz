import { Helmet, HelmetProps } from "react-helmet";
import FavIcon from "@/assets/images/logo.svg";

interface Props extends HelmetProps {
  title?: string;
  description?: string;
  lang?: string;
}

const Seo: React.FC<Props> = ({ title, description, lang, ...helmet }) => {
  const metaDescription = description || "";
  const defaultMeta: HelmetProps["meta"] = [
    { name: `description`, content: metaDescription },
    { property: `og:title`, content: title },
    { property: `og:description`, content: metaDescription },
    { property: `og:type`, content: `website` }
  ];
  return (
    <Helmet
      title={title}
      htmlAttributes={{ lang }}
      meta={defaultMeta.concat(helmet.meta || [])}
      link={[{ rel: "icon", type: "image/ico", href: FavIcon }]}
      {...helmet}
    />
  );
};

Seo.defaultProps = {
  lang: "zh-Hans",
  description: ``
};

export default Seo;
