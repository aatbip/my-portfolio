import { createSlice } from "@reduxjs/toolkit";
import Router from "next/router";
import { IContent } from "../../interfaces/interface";
import { RootState } from "../store";

type url = {
  github_link: string;
  live_link: string;
};

interface IInitialState {
  linkText: string;
  isFocused: boolean;
  showKeyboard: boolean;
  from: string;
  content: IContent[];
  url: url;
}

const initialState: IInitialState = {
  linkText: "",
  isFocused: false,
  showKeyboard: false,
  from: "",
  content: [],
  url: {
    github_link: "",
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
    setURL: (state, action) => {
      state.url = {
        github_link: action.payload.github_link,
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
        if (link.length == 0) return;
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
        if (
          _link.toUpperCase().includes("GITHUBREPO") ||
          _link.toUpperCase().includes("GITHUB REPO")
        )
          window.open(`https://${state.url.github_link}`, "blank");

        if (
          _link.toUpperCase().includes("LIVE LINK") ||
          _link.toUpperCase().includes("LIVELINK")
        )
          window.open(`https://${state.url.github_link}`, "blank");
      }

      if (state.from === "about-page") {
        if (_link === "github")
          window.open("https://www.github.com/aatbip", "blank");

        if (_link === "linkedin")
          window.open("https://www.linkedin.com/in/anantabipal");

        if (_link === "resume") window.open("/file/resume.pdf", "download");
      }
    },
  },
});

export const selectInput = (state: RootState) => state.input;

export const {
  setLinkText,
  setFromAndContent,
  setURL,
  unsetLinkText,
  handleShowKeyboard,
  unshowKeyboard,
  keyboardUpdateLinkText,
  setIsFocused,
  handleSubmit,
} = inputSlice.actions;

export default inputSlice.reducer;
