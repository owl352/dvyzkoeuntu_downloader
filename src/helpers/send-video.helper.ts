import fs from "fs";
import { StatusChanger } from "../classes";

export async function sendVideo(
  fname: string,
  ctx: any,
  statusChanger: StatusChanger
) {
  for (let f of fs.readdirSync("./videos/")) {
    console.log(f);
    if (f.includes(fname)) {
      await ctx.replyWithVideo(
        { source: "./videos/" + f },
        {
          caption: "Ваше видео!",
        }
      );
      statusChanger.destroy();
      fs.rmSync("./videos/" + f);
    }
  }
}
