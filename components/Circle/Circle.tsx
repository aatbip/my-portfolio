import Image from "next/image";
import React from "react";
import Draggable from "react-draggable";
import styles from "./css/Circle.module.css";
import keyboardImage from "../../public/keyboard.svg";
import store from "../../redux/store";
import { handleShowKeyboard } from "../../redux/input/inputSlice";
import { MobileView } from "react-device-detect";

interface IProp {
  children: React.ReactNode;
}

const Circle: React.FC<IProp> = ({ children }) => {
  const nodeRef = React.useRef(null);
  const [boundingBox, setBoundingBox] = React.useState({ top: "", left: "" });

  const handleStart = (e: any) => {
    setBoundingBox(e.target.getBoundingClientRect());
  };

  const handleStop = (e: any) => {
    const { top, left } = e.target.getBoundingClientRect();

    if (top === boundingBox.top && left === boundingBox.left) {
      store.dispatch(handleShowKeyboard());
    }
  };

  return (
    <>
      {/* <MobileView> */}
        <Draggable nodeRef={nodeRef} onStart={handleStart} onStop={handleStop}>
          <div
            onClick={() => store.dispatch(handleShowKeyboard())}
            className={styles.circle}
            ref={nodeRef}
          >
            <Image
              onClick={() => store.dispatch(handleShowKeyboard())}
              src={keyboardImage}
              draggable={false}
              alt="keyboard"
              width={20}
              height={20}
            />
          </div>
        </Draggable>
      {/* </MobileView> */}

      {children}
    </>
  );
};

export default Circle;
