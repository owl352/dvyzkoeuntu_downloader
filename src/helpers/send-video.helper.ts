import fs from "fs";
import { StatusChanger } from "../classes";
import { Logger } from "./logger.helper";

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
      if (fs.statSync("./videos/" + f).size / (1024 * 1024) > 45) {
        await ctx.reply(
          "Ваше видео доступно превышает 50 мб и будет доступно по ссылке ниже.\n Оно доступно в течении 30 минут http://download.vkytdz.online/" +
            f
        );
      }else{
        await ctx.replyWithVideo(
          { source: "./videos/" + f },
          {
            caption: "Ваше видео!",
          }
        );
      }
      statusChanger.destroy();
    }
  }
}
