import styles from "../styles/Homepage.module.css";
import React from "react";
import InputBox from "../components/InputBox/InputBox";
import store from "../redux/store";
import { unsetLinkText, unshowKeyboard } from "../redux/input/inputSlice";
import { isMobile } from "react-device-detect";
import Head from "next/head";


const Home: React.FC = () => {
  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());
  }, []);
  return (
    <>
    <Head>
      <title>Home | anantabipal.dev</title>
    </Head>
      <div className={styles.homepage}>
        <p className={styles.heading}>Hello, I am Ananta Bipal</p>
        <p className={styles.text}>a software engineer</p>
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <InputBox links={["about", "works", "blogs"]} from="home" />
        </div>
      </div>
    </>
  );
};

export default Home;
