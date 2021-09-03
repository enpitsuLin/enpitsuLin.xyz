import React from 'react';

interface Props {
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
}

const Footer: React.FC<Props> = ({ siteMetadata }) => {
  const { title } = siteMetadata;
  return (
    <footer id="footer">
      <div className="container">
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
