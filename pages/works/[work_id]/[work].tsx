import React from "react";
import { IContent } from "../../../interfaces/interface";

interface IProp {
  data: IContent;
}

const WorkDetail: React.FC<IProp> = ({ data }) => {
  console.log(data);
  return <div>WorkDetail</div>;
};

export default WorkDetail;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/getcontents?type=works");

  const data = await res.json();
  const paths = data.map((el: IContent) => {
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
  const res = await fetch(
    `http://localhost:3000/api/getonecontent?type=works&filename=${params.work}.txt`
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
}
