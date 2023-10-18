import { timeStringToMs } from "@lexxxell/timestring-to-ms";
import { fileLifeTime } from "./constants.helper";
import fs from "fs";

export function remvoeVideo(f: string) {
  setTimeout(() => {
    // if (fs.existsSync("./videos/!" + f)) {
    //   remvoeVideo(f);
    // } else {
    //   fs.rmSync("./videos/" + f);
    // }
    fs.rmSync("./videos/" + f);
  }, timeStringToMs(fileLifeTime));
}
