import { createSlice, current } from "@reduxjs/toolkit";
import Router from "next/router";
import { IContent } from "../../interfaces/interface";
import { RootState } from "../store";

type url = {
  github_link: string;
  frontend_link: string;
  backend_link: string;
  live_link: string;
};

interface IInitialState {
  linkText: string;
  isFocused: boolean;
  showKeyboard: boolean;
  showModal: boolean;
  from: string;
  content: IContent[];
  url: url;
}

const initialState: IInitialState = {
  linkText: "",
  isFocused: false,
  showKeyboard: false,
  showModal: false,
  from: "",
  content: [],
  url: {
    github_link: "",
    frontend_link: "",
    backend_link: "",
    live_link: "",
  },
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setLinkText: (state, action) => {
      state.linkText = action.payload;
    },
    setFromAndContent: (state, action) => {
      state.content = action.payload.content;
      state.from = action.payload.from;
    },
    unsetFromAndContent: (state) => {
      state.content = [];
      state.from = "";
    },
    setURL: (state, action) => {
      state.url = {
        github_link: action.payload.github_link,
        frontend_link: action.payload.frontend_link,
        backend_link: action.payload.backend_link,
        live_link: action.payload.live_link,
      };
    },
    unsetLinkText: (state) => {
      state.linkText = "";
    },
    setIsFocused: (state, action) => {
      state.isFocused = action.payload;
    },
    handleShowKeyboard: (state) => {
      state.showKeyboard = !state.showKeyboard;
      state.linkText = "";
      if (state.isFocused) state.isFocused = !state.isFocused;
    },

    closeModal: (state) => {
      state.showModal = false;
    },

    unshowKeyboard: (state) => {
      state.showKeyboard = false;
      state.linkText = "";
      if (state.isFocused) state.isFocused = !state.isFocused;
    },
    keyboardUpdateLinkText: (state, action) => {
      if (action.payload !== "@")
        if (state.linkText.split("")[0] !== "@") return;
      if (action.payload === "@") state.isFocused = true;
      if (action.payload === "Space") {
        state.linkText = state.linkText + " ";
        return;
      }
      if (action.payload === "BS") {
        if (
          state.linkText.split("").length === 1 &&
          state.linkText.split("")[0] === "@"
        )
          return;

        state.linkText = state.linkText.slice(0, -1);
        return;
      }
      state.linkText = state.linkText + action.payload.toLowerCase();
    },
    handleSubmit: (state, action) => {
      const { e } = action?.payload;
      e?.preventDefault();

      let _link = state.linkText.replace("@", "");
      if (_link.toUpperCase() === "HOME") {
        Router.push("/");
      }
      if (_link.toUpperCase() === "ABOUT") {
        Router.push("/about");
      }
      if (_link.toUpperCase() === "BLOGS") {
        Router.push("/blogs");
      }

      if (_link.toUpperCase() === "WORKS") {
        Router.push("/works");
      }

      if (state.content) {
        let link = state.content.filter((el: any) =>
          el.heading
            .toUpperCase()
            .replace(/\s+/g, "")
            .includes(_link.toUpperCase().replace(/\s+/g, ""))
        );
        if (link.length == 0 || link.length > 1) return;
        if (state.from === "works")
          Router.push(
            `/works/${link[0]?.id}/${link[0]?.heading.replace(/\s+/g, "")}`
          );
        if (state.from === "blogs")
          Router.push(
            `/blogs/${link[0]?.id}/${link[0]?.heading.replace(/\s+/g, "")}`
          );
      }

      if (state.url) {
        if (_link.toLowerCase() === "images") state.showModal = true;

        if (_link.toUpperCase().replace(/\s/g, "").includes("GITHUBREPO"))
          window.open(`https://${state.url.github_link}`, "blank");

        if (_link.toUpperCase().replace(/\s/g, "").includes("LIVELINK"))
          window.open(`https://${state.url.live_link}`, "blank");
        if (_link.toUpperCase().replace(/\s/g, "").includes("FRONTENDREPO"))
          window.open(`https://${state.url.frontend_link}`, "blank");

        if (_link.toUpperCase().replace(/\s/g, "").includes("BACKENDREPO"))
          window.open(`https://${state.url.backend_link}`, "blank");
      }

      if (state.from === "about-page") {
        if (_link.toLowerCase() === "github")
          window.open("https://www.github.com/aatbip", "blank");

        if (_link.toLowerCase() === "linkedin")
          window.open("https://www.linkedin.com/in/anantabipal");

        if (_link.toLowerCase() === "resume") window.open("/file/resume.pdf", "download");
      }
    },
  },
});

export const selectInput = (state: RootState) => state.input;

export const {
  setLinkText,
  setFromAndContent,
  unsetFromAndContent,
  setURL,
  unsetLinkText,
  handleShowKeyboard,
  closeModal,
  unshowKeyboard,
  keyboardUpdateLinkText,
  setIsFocused,
  handleSubmit,
} = inputSlice.actions;

export default inputSlice.reducer;
