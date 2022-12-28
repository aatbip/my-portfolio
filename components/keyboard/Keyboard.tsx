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
import { isMobile } from "react-device-detect";

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

  const { showKeyboard, linkText } = useSelector(selectInput);

  return (
    <>
      {isMobile && (
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
                    <>
                      <div
                        key={ind}
                        onTouchStartCapture={() => setCaptureSelectedKey(ind)}
                        onClick={() =>
                          store.dispatch(keyboardUpdateLinkText(key))
                        }
                        className={`${styles.keys_hover} `}
                        style={
                          captureSelectedKey === ind
                            ? {
                                background: "var(--font-color)",
                                color: "#000",
                                position: "relative",
                                boxShadow: "5px 10px #888888",
                              }
                            : {
                                background: "",
                                color: "",
                              }
                        }
                        onTouchEndCapture={() => setCaptureSelectedKey(null)}
                      >
                        {key}

                        {captureSelectedKey === ind && (
                          <div key={ind} className={styles.capture_selected}>
                            {key}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
                <div
                  onClick={() => store.dispatch(keyboardUpdateLinkText("BS"))}
                  className={`${styles.keys_hover}`}
                  onTouchStartCapture={() => {
                    setCaptureSelectedKey(99);
                  }}
                  onTouchEndCapture={() => setCaptureSelectedKey(null)}
                  style={
                    captureSelectedKey === 99
                      ? {
                          background: "var(--font-color)",
                          color: "#000",
                          boxShadow: "5px 10px #888888",
                        }
                      : {
                          background: "",
                          color: "",
                        }
                  }
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
                        className={`${styles.keys_hover}`}
                        onTouchStartCapture={() => setCaptureSelectedKey(ind)}
                        onTouchEndCapture={() => setCaptureSelectedKey(null)}
                        key={ind}
                        style={
                          captureSelectedKey === ind
                            ? {
                                background: "var(--font-color)",
                                color: "#000",
                                position: "relative",
                                boxShadow: "5px 10px #888888",
                              }
                            : {
                                background: "",
                                color: "",
                              }
                        }
                      >
                        {key}

                        {captureSelectedKey === ind && (
                          <div key={ind} className={styles.capture_selected}>
                            {key}
                          </div>
                        )}
                      </div>
                    );
                })}
                <div
                  onClick={(e) => store.dispatch(handleSubmit(e))}
                  className={`${styles.keys_hover}`}
                  onTouchStartCapture={() => setCaptureSelectedKey(100)}
                  onTouchEndCapture={() => setCaptureSelectedKey(null)}
                  style={
                    captureSelectedKey === 100
                      ? {
                          background: "var(--font-color)",
                          color: "#000",
                          boxShadow: "5px 10px #888888",
                        }
                      : {
                          background: "",
                          color: "",
                        }
                  }
                >
                  <b>GO</b>
                </div>
              </div>
              <div className={`${styles.keys_align} ${styles.keys_margin}`}>
                {keys.map((key, ind) => {
                  if (ind > 18)
                    return (
                      <div
                        onClick={() =>
                          store.dispatch(keyboardUpdateLinkText(key))
                        }
                        className={`${styles.keys_hover} `}
                        onTouchStartCapture={() => setCaptureSelectedKey(ind)}
                        onTouchEndCapture={() => setCaptureSelectedKey(null)}
                        key={ind}
                        style={
                          captureSelectedKey === ind
                            ? {
                                background: "var(--font-color)",
                                color: "#000",
                                position: "relative",
                                boxShadow: "5px 10px #888888",
                              }
                            : {
                                background: "",
                                color: "",
                              }
                        }
                      >
                        {key}

                        {captureSelectedKey === ind && (
                          <div key={ind} className={styles.capture_selected}>
                            {key}
                          </div>
                        )}
                      </div>
                    );
                })}
                <div
                  onClick={() => store.dispatch(keyboardUpdateLinkText("@"))}
                  className={`${styles.keys_hover}`}
                  onTouchStartCapture={() => setCaptureSelectedKey(101)}
                  onTouchEndCapture={() => setCaptureSelectedKey(null)}
                  style={
                    captureSelectedKey === 101
                      ? {
                          background: "var(--font-color)",
                          color: "#000",
                          position: "relative",
                          boxShadow: "5px 10px #888888",
                        }
                      : {
                          background: "",
                          color: "",
                        }
                  }
                >
                  <b> &#64; </b>

                  {captureSelectedKey === 101 && (
                    <div className={styles.capture_selected}>
                      <b> &#64; </b>
                    </div>
                  )}
                </div>
              </div>
              <div
                onClick={() => store.dispatch(keyboardUpdateLinkText("Space"))}
                className={styles.space_key}
                onTouchStartCapture={() => setCaptureSelectedKey(102)}
                onTouchEndCapture={() => setCaptureSelectedKey(null)}
                style={
                  captureSelectedKey === 102
                    ? {
                        opacity: "0.8",
                        boxShadow: "5px 10px #888888",
                      }
                    : {
                        opacity: "",
                      }
                }
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {children}
    </>
  );
};

export default Keyboard;
