import React from "react";
import { useSelector } from "react-redux";
import { IContent } from "../../interfaces/interface";
import { selectInput, unsetLinkText } from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "./css/ContentList.module.css";
interface IProp {
  data: IContent;
  from?: string;
}
const ContentList: React.FC<IProp> = ({ data, from }) => {
  const { linkText } = useSelector(selectInput);
  React.useEffect(() => {
    store.dispatch(unsetLinkText());
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content_list}>
        <div
          className={`${
            linkText
              .toUpperCase()
              .replace(/\s+/g, "")
              .includes(data.heading.toUpperCase().replace(/\s+/g, ""))
              ? styles.selected_square
              : styles.square
          }`}
        ></div>
        <aside className={styles.aside}>
          <p id={data.heading} className={`${styles.heading} `}>
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
                  } ${
                    linkText
                      .toUpperCase()
                      .replace(/\s+/g, "")
                      .includes(data.heading.toUpperCase().replace(/\s+/g, ""))
                      ? styles.selected_link_font
                      : null
                  }`}
                >
                  {el}
                </span>
              );
            })}
          </p>
          {from === "blogs" && (
            <p
              className={`${
                linkText
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
            linkText
              .toUpperCase()
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
