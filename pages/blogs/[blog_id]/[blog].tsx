import React from "react";
import { IContent } from "../../../interfaces/interface";

interface IProp {
  data: IContent;
}

const BlogDetail: React.FC<IProp> = ({ data }) => {
  console.log(data);
  return <div>BlogDetail</div>;
};

export default BlogDetail;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/getcontents?type=blogs");

  const data = await res.json();
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
  const res = await fetch(
    `http://localhost:3000/api/getonecontent?type=blogs&filename=${params.blog}.txt`
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}
