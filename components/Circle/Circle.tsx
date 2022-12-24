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
  return (
    <>
      <MobileView>
        <Draggable>
          <div
            onClick={() => store.dispatch(handleShowKeyboard())}
            className={styles.circle}
          >
            <Image
              src={keyboardImage}
              draggable={false}
              alt="keyboard"
              width={20}
              height={20}
            />
          </div>
        </Draggable>
      </MobileView>

      {children}
    </>
  );
};

export default Circle;
