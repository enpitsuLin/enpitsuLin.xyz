import React from 'react';
import classNames from 'classnames';
import LinkList from './LinkList';
import Introduction from './introduction';

interface Props {
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
}

const Footer: React.FC<Props> = ({ siteMetadata }) => {
  const { title } = siteMetadata;

  const PoweredList = [
    { name: 'React', link: 'https://reactjs.org/' },
    { name: 'Gatsby', link: 'https://www.gatsbyjs.org/' },
    { name: 'Typescript', link: 'https://www.typescriptlang.org/' }
  ];
  const ThemeList = [
    { name: 'Tailwind', link: 'https://www.tailwindcss.com/' },
    { name: 'React-Icons', link: 'https://react-icons.github.io/react-icons/' },
    { name: 'Sass', link: 'https://sass-lang.com/' }
  ];
  return (
    <footer id="footer" className="text-white dark:bg-skobeloff">
      <div className={classNames('mx-auto max-w-7xl p-2', 'flex flex-row')}>
        <Introduction className="py-4 w-full text-center md:w-4/6 md:text-left" />
        <div className="w-2/6 hidden md:block">
          <div className="py-4">
            <p className="mb-2">🚀 强力驱动</p>
            <LinkList links={PoweredList} />
          </div>
          <div className="py-4">
            <p className="mb-2">🎨 描绘主题</p>
            <LinkList links={ThemeList} />
          </div>
        </div>
      </div>
      <p className="text-center pb-4 text-sm">
        &copy;{new Date().getFullYear()} | {title}
      </p>
    </footer>
  );
};

export default Footer;
