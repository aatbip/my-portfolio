import Image from "next/image";
import React from "react";
import Draggable from "react-draggable";
import styles from "./css/Circle.module.css";
import keyboardImage from "../../public/keyboard.svg";
import store from "../../redux/store";
import { handleShowKeyboard } from "../../redux/input/inputSlice";
import { isMobile, MobileView } from "react-device-detect";

interface IProp {
  children: React.ReactNode;
}

const Circle: React.FC = () => {
  const nodeRef = React.useRef(null);
  const [boundingBox, setBoundingBox] = React.useState({ top: "", left: "" });
  const [isMob, setIsMob] = React.useState(false);

  const handleStart = (e: any) => {
    setBoundingBox(e.target.getBoundingClientRect());
  };

  const handleStop = (e: any) => {
    const { top, left } = e.target.getBoundingClientRect();

    if (top === boundingBox.top && left === boundingBox.left) {
      store.dispatch(handleShowKeyboard());
    }
  };

  React.useEffect(() => {
    if (isMobile) setIsMob(true);
  }, []);

  if (!isMob) return null;

  return (
    <>
      {isMobile && (
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
      )}
    </>
  );
};

export default Circle;
