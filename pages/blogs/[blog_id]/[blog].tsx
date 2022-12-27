import React from "react";
import { useSelector } from "react-redux";
import InputBox from "../../../components/InputBox/InputBox";
import { IContent } from "../../../interfaces/interface";
import getContents from "../../../lib/getContents";
import getOneContent from "../../../lib/getOneContent";
import {
  selectInput,
  unsetLinkText,
  unshowKeyboard,
} from "../../../redux/input/inputSlice";
import store from "../../../redux/store";
import styles from "../../../styles/Details.module.css";

interface IProp {
  data: IContent;
}

const BlogDetail: React.FC<IProp> = ({ data }) => {
  const { linkText } = useSelector(selectInput);

  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.input_box}>
        <InputBox
          links={["home", "about", "blogs", "works"]}
          from="details-page"
        />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.heading}>{data.heading}</p>
        <p
          style={{
            marginLeft: "20px",
          }}
        >
          {data.date}
        </p>

        <div className={styles.short_description_container}>
          <hr />
          <p>{data.short_description}</p>
        </div>
        <div className={styles.description_container}>
          {data.description.map((el, ind) => {
            return <p key={ind}>{el}</p>;
          })}
        </div>
      </div>
    </div>
  );
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
