import Head from "next/head";
import React from "react";
import ContentList from "../../components/ContentList/ContentList";
import InputBox from "../../components/InputBox/InputBox";
import { IContent } from "../../interfaces/interface";
import getContents from "../../lib/getContents";
import {
  unsetLinkText,
  handleShowKeyboard,
  unshowKeyboard,
} from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "./css/Works.module.css";

interface IProp {
  data: IContent[];
}

const Work: React.FC<IProp> = ({ data }) => {
  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());
  }, []);
  return (
    <>
      <Head>
        <title>My Works | anantabipal.dev</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.input_box}>
          <InputBox
            content={data}
            links={["home", "about", "blogs"]}
            from="works"
          />
        </div>
        {data.map((el, ind) => {
          return <ContentList key={ind} data={el} />;
        })}
      </div>
    </>
  );
};

export default Work;

export async function getStaticProps() {
  const data = await getContents("works");
  return {
    props: {
      data: data,
    },
  };
}
