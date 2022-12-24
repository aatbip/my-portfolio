import React from "react";
import { IContent } from "../../../interfaces/interface";
import getContents from "../../../lib/getContents";
import getOneContent from "../../../lib/getOneContent";

interface IProp {
  data: IContent;
}

const BlogDetail: React.FC<IProp> = ({ data }) => {
  return <div style={{ color: "#fff" }}>{data.description}</div>;
};

export default BlogDetail;

export async function getStaticPaths() {
  const data = await getContents("blogs");
  const paths = data.map((el: IContent) => {
    return {
      params: {
        blog_id: el.id,
        blog: el.heading.replace(/\s+/g, ""),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const { params } = context;

  const data = await getOneContent("blogs", `${params.blog}.txt`);
  return {
    props: {
      data: data,
    },
  };
}
