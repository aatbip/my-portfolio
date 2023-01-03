import React from "react";
import InputBox from "../components/InputBox/InputBox";
import styles from "../styles/Homepage.module.css";

const Page404 = () => {
  return (
    <div className={styles.homepage}>
      <p className={styles.heading}>
        ERROR 404: 
      </p>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <InputBox links={["home", "about", "works", "blogs"]} from={"home"} />
      </div>
    </div>
  );
};

export default Page404;
