import React from "react";
import { IContent } from "../../../interfaces/interface";
import getContents from "../../../lib/getContents";
import getOneContent from "../../../lib/getOneContent";

interface IProp {
  data: IContent;
}

const WorkDetail: React.FC<IProp> = ({ data }) => {
  return <div style={{ color: "#fff" }}>{data.description}</div>;
};

export default WorkDetail;

export async function getStaticPaths() {
  const arrayOfFiles = await getContents("works");
  const paths = arrayOfFiles.map((el: IContent) => {
    return {
      params: {
        work_id: el.id,
        work: el.heading.replace(/\s+/g, ""),
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

  const data = await getOneContent("works", `${params.work}.txt`);
  return {
    props: {
      data: data,
    },
  };
}
