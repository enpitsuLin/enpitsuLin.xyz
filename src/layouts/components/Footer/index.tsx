import React from 'react';
import { Row, Col } from 'react-bootstrap';
import List from './List';
import Introduction from './introduction';
import styled from 'styled-components';

const Container = styled.footer`
  /* text-align: center; */
  color: white;
  background-color: var(--skobeloff);
  padding: 32px 0;
  hr {
    color: white;
  }
  .footer-contents {
    max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FooterBottom = styled.p`
  text-align: center;
  padding-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.24rem;
`;

interface Props {
  siteMetadata: Partial<GatsbyTypes.SiteSiteMetadata>;
}

const poweredBy = [
  { name: 'React', link: 'https://reactjs.org/' },
  { name: 'Gatsby', link: 'https://www.gatsbyjs.org/' },
  { name: 'GitHub Pages', link: 'https://pages.github.com/' },
  { name: 'Typescript', link: 'https://www.typescriptlang.org/' }
];
const themedWith = [
  { name: 'styled-components', link: 'https://www.styled-components.com/' },
  { name: 'React Icons', link: 'https://react-icons.github.io/react-icons/' },
  { name: 'React Bootstrap', link: 'https://react-bootstrap.github.io/' },
  { name: 'Bootstrap', link: 'https://getbootstrap.com/' }
];

const Footer: React.FC<Props> = ({ siteMetadata }) => {
  const { title } = siteMetadata;

  return (
    <Container id="footer">
      <Row className="footer-contents">
        <Col>
          <Introduction />
        </Col>
        <Col className="d-none d-sm-none d-md-block" md={3} sm={0}>
          <h6>🚀 强力驱动</h6>
          <List links={poweredBy} />
        </Col>
        <Col className="d-none d-sm-none d-md-block" md={3} sm={0}>
          <h6>🎨 描绘主题</h6>
          <List links={themedWith} />
        </Col>
      </Row>
      <FooterBottom>
        &copy;{new Date().getFullYear()} | {title}
      </FooterBottom>
    </Container>
  );
};

export default Footer;
