import path from "path";
import { promises as fs } from "fs";
import { IContent } from "../interfaces/interface";

const getContents = async (type: string) => {
  //   const { type } = req.query;
  const fileDirectory = path.join(process.cwd(), "data", `${type}`);

  const files = await fs.readdir(fileDirectory);
  let arrayOfFile: IContent[] = [];

  const convertToJson = (myFile: string) => {
    let obj: IContent = {
      id: "",
      date: "",
      heading: "",
      github_link: "",
      live_link: "",
      short_description: "",
      description: [],
    };
    let desc: string[] = [];
    let arr = myFile.split("\n");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].split(":")[0] === "id") {
        obj["id"] = arr[i].split(":")[1];

        arr = arr.filter((el) => el !== arr[i]);
      }

      if (arr[i].split(":")[0] === "date") {
        obj["date"] = arr[i].split(":")[1];

        arr = arr.filter((el) => el !== arr[i]);
      }

      if (arr[i].split(":")[0] === "heading") {
        obj["heading"] = arr[i].split(":")[1];

        arr = arr.filter((el) => el !== arr[i]);
      }

      if (arr[i].split(":")[0] === "github_link") {
        obj["github_link"] = arr[i].split(":")[1];

        arr = arr.filter((el) => el !== arr[i]);
      }

      if (arr[i].split(":")[0] === "live_link") {
        obj["live_link"] = arr[i].split(":")[1];

        arr = arr.filter((el) => el !== arr[i]);
      }

      if (arr[i].split(":")[0] === "short_description") {
        obj["short_description"] = arr[i].split(":")[1];

        arr = arr.filter((el) => el !== arr[i]);
      }
      if (arr[i].split(":")[0] === "description") {
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].split(":")[0] === "description") {
            desc = [...desc, arr[j].split(":")[1]];

            arr = arr.filter((el) => el !== arr[j]);
          }
          desc = [...desc, arr[j]];

          obj["description"] = desc;
        }
      }
    }
    arrayOfFile = [...arrayOfFile, obj];
  };
  for (const file of files) {
    convertToJson(await fs.readFile(fileDirectory + `/${file}`, "utf8"));
  }
  return arrayOfFile;
};

export default getContents;