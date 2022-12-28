import React from "react";
import { useSelector } from "react-redux";
import { closeModal, selectInput } from "../../redux/input/inputSlice";
import Modal from "react-modal";
import store from "../../redux/store";
import styles from "./css/ImageSlideshow.module.css";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface KeyboardEvent {
  key: string;
}

interface IProp {
  images: string[];
}

const ImageSlideshow: React.FC<IProp> = ({ images }) => {
  const { showModal } = useSelector(selectInput);
  const [slideShow, setSlideShow] = React.useState<string[]>(images);
  const [count, setCount] = React.useState<number>(0);

  const toLeft = () => {
    if (count == 0) {
      setCount(slideShow.length - 1);
      return;
    }
    setCount((prev) => prev - 1);
  };

  const toRight = () => {
    if (count == slideShow.length - 1) {
      console.log("hello");
      setCount(0);
      return;
    }
    setCount((prev) => prev + 1);
  };

  const handleImageSlide = (event: KeyboardEvent): void => {
    if (event.key === "ArrowRight") {
      toRight();
    }
    if (event.key === "ArrowLeft") {
      toLeft();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleImageSlide);

    return () => window.removeEventListener("keydown", handleImageSlide);
  }, [count]);

  return (
    <Modal
      id="#image-modal"
      style={customStyles}
      isOpen={showModal}
      onRequestClose={() => store.dispatch(closeModal())}
    >
      <div>
        <div className={styles.wrapper}>
          <Image
            src={`/images/${slideShow[count]}`}
            alt="project images"
            width="800"
            height="420"
            style={{
              objectFit: "cover",
            }}
            className={styles.image}
          />
          <div onClick={toLeft} className={styles.left}>
            <BsFillArrowLeftSquareFill color="#000" size={30} />
          </div>
          <div onClick={toRight} className={styles.right}>
            <BsFillArrowRightSquareFill color="#000" size={30} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageSlideshow;
