import React from 'react';

interface Props {
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
}

const Footer: React.FC<Props> = ({ siteMetadata }) => {
  const { title } = siteMetadata;
  return (
    <footer id="footer" className="relative mt-4 pb-14 pt-3">
      <div className="text-gray-600">
        Copyright &copy; {new Date().getFullYear()} .{' '}
        <a rel="nofollow" href="">
          {title}
        </a>{' '}
        . Powered by{' '}
        <a href="https://www.gatsbyjs.com/" target="_blank">
          Gatsby.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
