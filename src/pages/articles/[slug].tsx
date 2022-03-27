import React from "react";
import { posts } from "../../libs/post";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";

export const getStaticProps: GetStaticProps<any, { slug: string }> = async ({ params }) => {
  const slug = params.slug;
  if (!slug) return { props: {}, revalidate: 1 };
  const { compiledSource, frontmatter, scope } = await serialize(posts[slug], {
    parseFrontmatter: true
  });

  return { props: { slug, source: compiledSource } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NODE_ENV == "development") {
    return {
      paths: [],
      fallback: true
    };
  }
  return { paths: [], fallback: true };
};

const Article: NextPage<{ source: string; slug: string }> = ({ source, slug }) => {
  if (!source) {
    return <div>loading</div>;
  }
  return (
    <div>
      <MDXRemote compiledSource={source} />
    </div>
  );
};
export default Article;
