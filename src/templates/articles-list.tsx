import React, { FunctionComponent } from 'react';
import { graphql, PageRendererProps } from 'gatsby';
import { BasicLayout } from '@/layouts';
import Seo from '@/components/seo';
import AnimatedContent from '@/components/AnimatedContent';
import ArticleItemList from '@/components/Article/ArticleItemList';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';

interface Props extends PageRendererProps {
  data: {
    allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection;
  };
  pageContext: {
    pageCount: number;
    pageIndex: number;
  };
}

const BlogPostTemplate: FunctionComponent<Props> = ({ data, location, pageContext }) => {
  const articles = data.allMarkdownRemark.nodes as GatsbyTypes.MarkdownRemark[];
  const { pageCount, pageIndex } = pageContext;

  return (
    <BasicLayout location={location}>
      <Seo title="文章" />
      <AnimatedContent>
        <Container fluid="xl">
          <Row className="pt-4">
            <Col md={8}>
              <ArticleItemList articles={articles} pageCount={pageCount} pageIndex={pageIndex} />
            </Col>
            <Col md={4} className="d-none d-md-block">
              <div>
                <Card>
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>There to be search card</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>There to be tag card</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>There to be tag card</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </AnimatedContent>
    </BasicLayout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query articlesByIds($ids: [String], $limit: Int) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { id: { in: $ids } }
      limit: $limit
    ) {
      nodes {
        id
        excerpt(format: HTML, truncate: true)
        html
        frontmatter {
          title
          date(formatString: "YYYY 年 MM月 DD日 ")
          description
          tags
        }
        fields {
          slug
        }
        timeToRead
        wordCount {
          words
        }
      }
      pageInfo {
        totalCount
        currentPage
        totalCount
        perPage
      }
    }
  }
`;
