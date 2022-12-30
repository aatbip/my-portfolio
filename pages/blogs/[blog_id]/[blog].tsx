import { Markup } from "interweave";
import Head from "next/head";
import Image from "next/image";
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

  if (!data) return null;

  return (
    <>
      <Head>
        <title>{data.heading}</title>
      </Head>
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
              return (
                <div key={ind} dangerouslySetInnerHTML={{ __html: el }}></div>
              );
            })}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              // margin: "0 auto",
            }}
          >
            {data.images &&
              data.images.split(" ").map((img, el) => {
                return (
                  <Image
                    key={el}
                    src={`/images/blogs/${img}`}
                    alt="my blog image"
                    width={260}
                    height={500}
                    style={{
                      margin: "0 auto",

                      objectFit: "contain",
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;

export async function getStaticPaths() {
  const data = await getContents("blogs");
  const paths = data.map((el: IContent) => {
    return {
      params: {
        blog_id: `${el.id}`,
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
