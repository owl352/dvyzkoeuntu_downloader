import fs from "fs";
import { StatusChanger } from "../classes";
import { Logger } from "./logger.helper";
import { timeStringToMs } from "@lexxxell/timestring-to-ms";
import { fileLifeTime } from "./constants.helper";

export async function sendVideo(
  fname: string,
  ctx: any,
  statusChanger: StatusChanger,
  msg: any
) {
  ctx.telegram.editMessageText(
    ctx.message.chat.id,
    msg.message_id,
    null,
    "100%"
  );
  for (let f of fs.readdirSync("./videos/")) {
    console.log(f);
    if (f.includes(fname)) {
      new Logger("send video").info("./videos/" + f);
      await ctx.reply("http://download.vkytdz.online/" + f);
      statusChanger.destroy();
      setTimeout(
        () => fs.rmSync("./videos/" + f),
        timeStringToMs(fileLifeTime)
      );
    }
  }
}
