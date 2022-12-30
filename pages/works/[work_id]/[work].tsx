import { Markup } from "interweave";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import ImageSlideshow from "../../../components/ImageSlideshow";
import InputBox from "../../../components/InputBox/InputBox";
import { IContent } from "../../../interfaces/interface";
import getContents from "../../../lib/getContents";
import getOneContent from "../../../lib/getOneContent";
import {
  closeModal,
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
  const [isWindow, setIsWindow] = React.useState(false);
  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());

    if (typeof window !== "undefined") setIsWindow(true);
  }, []);

  return (
    <>
      <Head>
        <title>{data.heading}</title>
      </Head>
      <div id="work-details" className={styles.container}>
        <div className={styles.input_box}>
          <InputBox
            links={["home", "about", "blogs", "works"]}
            from="details-page"
            url={{
              github_link: data.github_link,
              frontend_link: data.frontend_link,
              backend_link: data.backend_link,
              live_link: data.live_link,
            }}
          />
        </div>
        <div className={styles.wrapper}>
          <p className={styles.heading}>{data.heading}</p>
          <div className={styles.link_container}>
            {data.github_link && (
              <p>
                {"github repo".split("").map((el, ind) => {
                  return (
                    <span
                      key={ind}
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
            )}

            {data.frontend_link && (
              <p>
                {"frontend repo".split("").map((el, ind) => {
                  return (
                    <span
                      key={ind}
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
                          .includes("FRONTENDREPO")
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

            {data.backend_link && (
              <p>
                {"backend repo".split("").map((el, ind) => {
                  return (
                    <span
                      key={ind}
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
                          .includes("BACKENDREPO")
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
            {data.live_link && (
              <p>
                {"live link".split("").map((el, ind) => {
                  return (
                    <span
                      key={ind}
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

            {data.images && (
              <p>
                {"images".split("").map((el, ind) => {
                  return (
                    <span
                      key={ind}
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
                          .includes("IMAGES")
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
            {data.description.map((el, ind) => {
              return (
                <div key={ind} dangerouslySetInnerHTML={{ __html: el }}></div>
              );
            })}
          </div>
        </div>
      </div>
      {data.images && <ImageSlideshow images={data.images.split(" ")} />}
    </>
  );
};

export default WorkDetail;

export async function getStaticPaths() {
  const arrayOfFiles = await getContents("works");
  const paths = arrayOfFiles.map((el: IContent) => {
    return {
      params: {
        work_id: `${el.id}`,
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
