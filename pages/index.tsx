import styles from "../styles/Homepage.module.css";
import React from "react";
import InputBox from "../components/InputBox/InputBox";
import store from "../redux/store";
import { unsetLinkText, unshowKeyboard } from "../redux/input/inputSlice";
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
        <p className={styles.heading}>Hey, there! My name is Ananta Bipal</p>
        <p className={styles.text}>I am a software engineer</p>
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
