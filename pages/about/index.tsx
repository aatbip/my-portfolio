import Image from "next/image";
import React from "react";
import InputBox from "../../components/InputBox/InputBox";
import { unsetLinkText, unshowKeyboard } from "../../redux/input/inputSlice";
import store from "../../redux/store";
import styles from "../../styles/About.module.css";

const About = () => {
  React.useEffect(() => {
    store.dispatch(unsetLinkText());
    store.dispatch(unshowKeyboard());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.input_box}>
        <InputBox links={["home", "blogs", "works"]} from={"about-page"} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.content_container}>
          <div className={styles.image_container}>
            <Image
              src={"/images/me.jpg"}
              alt="myself"
              width="180"
              height="180"
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <p>Hi! Thank you for visiting my website.</p>
            <p>
              I am a software engineer proficient in JavaScript, TypeScript, and
              Go. I can build software applications with complex requirements
              and can handle new problems and challenges that may come in the
              process of development.
            </p>
            <p>
              I am always looking forward to involve myself in cool and exciting
              software projects.
            </p>
            <p
              style={{
                fontSize: "14px",
              }}
            >
              <b>
                <i>
                  Type "resume" to have my resume. Type "github" or "linkedin"
                  to visit my respective profiles.
                </i>
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
