import Head from "next/head";
import React from "react";
import InputBox from "../../components/InputBox/InputBox";
import { unsetLinkText, unshowKeyboard } from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "../../styles/DecorumPage.module.css";

const About = () => {
  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());
  }, []);

  return (
    <>
      <Head>
        <title>Decorum Technology and Research Center</title>
        <link rel="favicon" href="/keyboard.svg" />
      </Head>
      <div className={styles.container}>
        <div className={styles.input_box}>
          <InputBox links={["home", "about", "blogs", "works"]} from="about-page" />
        </div>
        <div className={styles.wrapper}>
          <img
            src={"/images/decorum_logo.png"}
            alt="myself"
            className={styles.logo}
          />
        </div>
        <div className={styles.content_container}>
          <div className={styles.line}></div>
          <div className={styles.content}>
            <p>
              Decorum Technology and Research Centre was established in 2021 A.D. by Ananta Bipal Subedi (a software engineer) and Adriana Luisa Dela Cruz (a product designer).
              We want to provide top-notch technological solutions to the partners and clients through design, development, and research.
              We are excellent at 'quickly' forming dedicated teams to solve unique problems in driving any businesses through technology.
              Our dedicated teams are contractors distributed around the globe working remotely to solve challenging problems and delivering quality results.
            </p>
            <div style={{ padding: '10px 0px', display: 'flex', alignItems: 'center', flexDirection: 'row', cursor: 'pointer', columnGap: '12px' }}
              onClick={() => {
                window.open("/file/decorum.pdf", "download");
              }}
            >
              <p>Click here to see our profile </p>
              <div style={{ paddingTop: '10px' }}><img src={"/images/right-arrow.svg"} color='#fff' /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
