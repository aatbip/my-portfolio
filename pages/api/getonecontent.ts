import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { IContent } from "../../interfaces/interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, filename } = req.query;
  const fileDirectory = path.join(process.cwd(), "data", `${type}`);

  //   let arrayOfFile: IContent[] = [];

  convertToJson(await fs.readFile(fileDirectory + `/${filename}`, "utf8"));

  function convertToJson(myFile: string) {
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
    // arrayOfFile = [...arrayOfFile, obj];
    res.status(200).json(obj);
  }
}
