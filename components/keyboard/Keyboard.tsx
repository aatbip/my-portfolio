import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import {
  handleSubmit,
  keyboardUpdateLinkText,
  selectInput,
} from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "./css/Keyboard.module.css";
import backspace from "../../public/backspace.svg";
import Image from "next/image";

interface IProps {
  children: React.ReactNode;
}

const Keyboard: React.FC<IProps> = ({ children }) => {
  const [keys, setKeys] = React.useState([
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ]);

  const { showKeyboard, linkText } = useSelector(selectInput);
  return (
    <>
      <AnimatePresence>
        {showKeyboard && (
          <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.keys_align}>
              {keys.map((key, ind) => {
                if (ind > 9) return;
                return (
                  <div
                    onClick={() => store.dispatch(keyboardUpdateLinkText(key))}
                    className={styles.keys_hover}
                    key={ind}
                  >
                    {key}
                  </div>
                );
              })}
              <div
                onClick={() => store.dispatch(keyboardUpdateLinkText("BS"))}
                className={styles.keys_hover}
              >
                &#8617;
              </div>
            </div>
            <div className={styles.keys_align}>
              {keys.map((key, ind) => {
                if (ind > 18) return;
                if (ind > 9)
                  return (
                    <div
                      onClick={() =>
                        store.dispatch(keyboardUpdateLinkText(key))
                      }
                      className={styles.keys_hover}
                      key={ind}
                    >
                      {key}
                    </div>
                  );
              })}
              <div
                onClick={(e) => store.dispatch(handleSubmit(e))}
                className={styles.keys_hover}
              >
                <b>GO!</b>
              </div>
            </div>
            <div className={`${styles.keys_align} ${styles.keys_margin}`}>
              <div
                onClick={() => store.dispatch(keyboardUpdateLinkText("@"))}
                className={styles.keys_hover}
              >
                <b> &#64; </b>
              </div>
              {keys.map((key, ind) => {
                if (ind > 18)
                  return (
                    <div
                      onClick={() =>
                        store.dispatch(keyboardUpdateLinkText(key))
                      }
                      className={styles.keys_hover}
                      key={ind}
                    >
                      {key}
                    </div>
                  );
              })}
            </div>
            <div
              onClick={() => store.dispatch(keyboardUpdateLinkText("Space"))}
              className={styles.space_key}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
};

export default Keyboard;