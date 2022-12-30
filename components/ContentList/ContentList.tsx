import React from "react";
import { useSelector } from "react-redux";
import { IContent } from "../../interfaces/interface";
import {
  selectInput,
  unsetFromAndContent,
  unsetLinkText,
} from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "./css/ContentList.module.css";
interface IProp {
  data: IContent;
  from?: string;
}
const ContentList: React.FC<IProp> = ({ data, from }) => {
  const { linkText, content } = useSelector(selectInput);
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    store.dispatch(unsetLinkText());
  }, []);

  React.useEffect(() => {
    setLink("");

    let _link = linkText.replace("@", "");

    let link = content?.filter((el: any) =>
      el.heading
        .toUpperCase()
        .replace(/\s+/g, "")
        .includes(_link.toUpperCase().replace(/\s+/g, ""))
    );
    if (link?.length == 1) setLink(link[0]?.heading);
  }, [linkText]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_list}>
        <div
          className={`${
            link
              ?.toUpperCase()
              .replace(/\s+/g, "")
              .includes(data.heading.toUpperCase().replace(/\s+/g, ""))
              ? styles.selected_square
              : styles.square
          }`}
        ></div>
        <aside className={styles.aside}>
          <p
            id={data.heading}
            className={`${styles.heading}`}
            style={
              link?.toUpperCase() === data.heading.toUpperCase()
                ? {
                    color: "#ffff00",
                    fontSize: "40px",
                    transition: "font-size 0.5s",
                  }
                : undefined
            }
          >
            {data.heading.split("").map((el, index) => {
              return (
                <span
                  key={index}
                  className={`${
                    linkText
                      .toUpperCase()
                      .replace(/\s+/g, "")
                      .includes(el.toUpperCase())
                      ? styles.selected_link
                      : null
                  } `}
                >
                  {el}
                </span>
              );
            })}
          </p>
          {from === "blogs" && (
            <p
              className={`${
                link
                  .toUpperCase()
                  .replace(/\s+/g, "")
                  .includes(data.heading.toUpperCase().replace(/\s+/g, ""))
                  ? styles.selected_short_description
                  : null
              }`}
              style={{ fontSize: "12px" }}
            >
              {data.date}
            </p>
          )}
        </aside>
      </div>
      <section className={styles.short_description_section}>
        <p
          className={`${
            link
              ?.toUpperCase()
              .replace(/\s+/g, "")
              .includes(data.heading.toUpperCase().replace(/\s+/g, ""))
              ? styles.selected_short_description
              : null
          }`}
        >
          {data.short_description}
        </p>
      </section>
    </div>
  );
};

export default ContentList;
