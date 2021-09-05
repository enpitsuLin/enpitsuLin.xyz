import React from 'react';
import classNames from 'classnames';
import LinkList from './LinkList';

interface Props {
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
}

const Footer: React.FC<Props> = ({ siteMetadata }) => {
  const { title } = siteMetadata;

  const linksTitleCls = classNames('my-1', 'text-sm');
  const PoweredList = [
    { name: 'React', link: 'https://reactjs.org/' },
    { name: 'Gatsby', link: 'https://www.gatsbyjs.org/' },
    { name: 'Typescript', link: 'https://www.typescriptlang.org/' }
  ];
  const ThemeList = [
    { name: 'Tailwind', link: 'https://www.tailwindcss.com/' },
    { name: 'ReactIcons', link: 'https://react-icons.github.io/react-icons/' },
    { name: 'Sass', link: 'https://sass-lang.com/' }
  ];
  return (
    <footer id="footer" className="text-white dark:bg-skobeloff">
      <div className={classNames('mx-auto max-w-7xl p-2', 'flex flex-row')}>
        <div className="py-4 w-4/6">
          <p className={linksTitleCls}>📲 联系我</p>
          <div>404 not found</div>
        </div>
        <div className="w-2/6 hidden md:block">
          <div className="py-4">
            <p className={linksTitleCls}>🚀强力驱动</p>
            <LinkList links={PoweredList} />
          </div>
          <div className="py-4">
            <p className={linksTitleCls}>🎨 描绘主题</p>
            <LinkList links={ThemeList} />
          </div>
        </div>
      </div>
      <p className="text-center pb-4">
        &copy;{new Date().getFullYear()} | {title}
      </p>
    </footer>
  );
};

export default Footer;
