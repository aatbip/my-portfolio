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
  const [captureSelectedKey, setCaptureSelectedKey] = React.useState<
    number | null
  >();
  console.log(captureSelectedKey);
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
                    key={ind}
                    className={`${styles.keys_hover} ${
                      captureSelectedKey === ind ? styles.selected_key : ""
                    }`}
                    onTouchStartCapture={() => setCaptureSelectedKey(ind)}
                    onTouchEndCapture={() => setCaptureSelectedKey(null)}
                  >
                    {key}
                  </div>
                );
              })}
              <div
                onClick={() => store.dispatch(keyboardUpdateLinkText("BS"))}
                className={`${styles.keys_hover} ${
                  captureSelectedKey === 99 ? styles.selected_key : ""
                }`}
                onTouchStartCapture={() => setCaptureSelectedKey(99)}
                onTouchEndCapture={() => setCaptureSelectedKey(null)}
              >
                <b> &#8617; </b>
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
                      className={`${styles.keys_hover} ${
                        captureSelectedKey === ind ? styles.selected_key : ""
                      }`}
                      onTouchStartCapture={() => setCaptureSelectedKey(ind)}
                      onTouchEndCapture={() => setCaptureSelectedKey(null)}
                      key={ind}
                    >
                      {key}
                    </div>
                  );
              })}
              <div
                onClick={(e) => store.dispatch(handleSubmit(e))}
                className={`${styles.keys_hover} ${
                  captureSelectedKey === 100 ? styles.selected_key : ""
                }`}
                onTouchStartCapture={() => setCaptureSelectedKey(100)}
                onTouchEndCapture={() => setCaptureSelectedKey(null)}
              >
                <b>GO!</b>
              </div>
            </div>
            <div className={`${styles.keys_align}`}>
              {keys.map((key, ind) => {
                if (ind > 18)
                  return (
                    <div
                      onClick={() =>
                        store.dispatch(keyboardUpdateLinkText(key))
                      }
                      className={`${styles.keys_hover} ${
                        captureSelectedKey === ind ? styles.selected_key : ""
                      }`}
                      onTouchStartCapture={() => setCaptureSelectedKey(ind)}
                      onTouchEndCapture={() => setCaptureSelectedKey(null)}
                      key={ind}
                    >
                      {key}
                    </div>
                  );
              })}
              <div
                onClick={() => store.dispatch(keyboardUpdateLinkText("@"))}
                className={`${styles.keys_hover} ${
                  captureSelectedKey === 101 ? styles.selected_key : ""
                }`}
                onTouchStartCapture={() => setCaptureSelectedKey(101)}
                onTouchEndCapture={() => setCaptureSelectedKey(null)}
              >
                <b> &#64; </b>
              </div>
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
