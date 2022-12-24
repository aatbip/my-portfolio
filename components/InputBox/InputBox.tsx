import { AnimatePresence, motion } from "framer-motion";
import Router from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { IContent } from "../../interfaces/interface";

import {
  handleSubmit,
  selectInput,
  setFromAndContent,
  setIsFocused,
  setLinkText,
  unsetLinkText,
} from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "./css/InputBox.module.css";

interface IInputBox {
  links: string[];
  content?: IContent[];
  from: string;
}
interface KeyboardEvent {
  key: string;
}
const InputBox: React.FC<IInputBox> = ({ links, content, from }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { linkText, isFocused } = useSelector(selectInput);

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === "@") {
      store.dispatch(setIsFocused(true));
    }
    if (event.key === "Escape") {
      store.dispatch(setIsFocused(false));
      store.dispatch(unsetLinkText());
    }
  };

  React.useEffect(() => {
    store.dispatch(setFromAndContent({ from, content }));
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      if (!inputRef.current) return;
      inputRef.current.focus();
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (!linkText) setIsFocused(false);
  }, [linkText]);

  return (
    <>
      <form
        onSubmit={(e) => store.dispatch(handleSubmit({ e, content, from }))}
      >
        <input
          className={`${styles.input}  ${
            !isFocused ? styles.input_animated : null
          }`}
          type="text"
          placeholder="press @ to start..."
          disabled={!isFocused ? true : false}
          ref={inputRef}
          autoFocus={false}
          value={linkText}
          onChange={(e) => {
            store.dispatch(setLinkText(e.target.value));
          }}
        />
        {isFocused && from === "home" && (
          <p style={{ fontSize: "8px" }}>Type link and hit enter to navigate</p>
        )}
        {isFocused && (from === "works" || from === "blogs") && (
          <p className={styles.links} style={{ fontSize: "8px" }}>
            Type title or links to navigate
          </p>
        )}
      </form>
      <AnimatePresence>
        {links && isFocused && (
          <motion.div
            className={styles.links}
            initial={{ y: -100, x: 0, opacity: 0 }}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={{ y: -100, x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {links &&
              links.map((link, ind) => {
                return (
                  <p key={ind}>
                    {link.split("").map((el, index) => {
                      return (
                        <span
                          key={index}
                          className={`${
                            linkText.includes(el) ? styles.selected_link : null
                          } ${
                            linkText.includes(link)
                              ? styles.selected_link_font
                              : null
                          }`}
                        >
                          {el}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InputBox;
