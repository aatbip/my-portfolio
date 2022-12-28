import Head from "next/head";
import React from "react";
import ContentList from "../../components/ContentList/ContentList";
import InputBox from "../../components/InputBox/InputBox";
import { IContent } from "../../interfaces/interface";
import getContents from "../../lib/getContents";
import {
  handleShowKeyboard,
  unsetLinkText,
  unshowKeyboard,
} from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "../works/css/Works.module.css";

interface IProp {
  data: IContent[];
}

const Blog: React.FC<IProp> = ({ data }) => {
  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());
  }, []);

  return (
    <>
      <Head>
        <title>My Blogs | anantabipal.dev</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.input_box}>
          <InputBox
            content={data}
            links={["home", "about", "works"]}
            from="blogs"
          />
        </div>
        {data.map((el, ind) => {
          return <ContentList key={ind} data={el} from="blogs" />;
        })}
      </div>
    </>
  );
};

export default Blog;

export async function getStaticProps() {
  const data = await getContents("blogs");
  return {
    props: {
      data: data,
    },
  };
}
