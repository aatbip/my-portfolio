import Link from "next/link";
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

const WorkDetail: React.FC<IProp> = ({ data }) => {
  const { linkText } = useSelector(selectInput);

  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());
  }, []);

  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.input_box}>
        <InputBox
          links={["home", "about", "blogs", "works"]}
          from="details-page"
          url={{
            github_link: data.github_link,
            live_link: data.live_link,
          }}
        />
      </div>
      <div className={styles.wrapper}>
        <p className={styles.heading}>{data.heading}</p>
        <div className={styles.link_container}>
          <p>
            {"github repo".split("").map((el) => {
              return (
                <span
                  className={`${
                    linkText
                      .toUpperCase()
                      .replace(/\s+/g, "")
                      .includes(el.toUpperCase())
                      ? styles.selected_link
                      : null
                  } ${
                    linkText
                      .toUpperCase()
                      .replace(/\s+/g, "")
                      .includes("GITHUBREPO")
                      ? styles.selected_link_font
                      : null
                  }`}
                >
                  {el}
                </span>
              );
            })}
          </p>
          {data.live_link && (
            <p>
              {"live link".split("").map((el) => {
                return (
                  <span
                    className={`${
                      linkText
                        .toUpperCase()
                        .replace(/\s+/g, "")
                        .includes(el.toUpperCase())
                        ? styles.selected_link
                        : null
                    } ${
                      linkText
                        .toUpperCase()
                        .replace(/\s+/g, "")
                        .includes("LIVELINK")
                        ? styles.selected_link_font
                        : null
                    }`}
                  >
                    {el}
                  </span>
                );
              })}
            </p>
          )}
        </div>
        <div className={styles.short_description_container}>
          <hr />
          <p>{data.short_description}</p>
        </div>
        <div className={styles.description_container}>
          {data.description.map((el) => {
            return <p>{el}</p>;
          })}
        </div>
      </div>
    </div>
  );
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
