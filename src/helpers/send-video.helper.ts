import fs from "fs";
import { StatusChanger } from "../classes";
import { Logger } from "./logger.helper";
import { remvoeVideo } from "./remove-video-helper";

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
        await ctx.replyWithHTML(
          `<b>Ваше видео скачано!</b>\nТак как файл превышает 50Мб, его можно\n<a href="http://download.vkytdz.online/${f}">СКАЧАТЬ ТУТ</a>.\n<i>Ссылка работает в течении 30 минут</i>`
        );
      } else {
        await ctx.replyWithVideo(
          { source: "./videos/" + f },
          {
            caption: "Ваше видео!",
          }
        );
      }
      remvoeVideo(f);
      statusChanger.destroy();
    }
  }
}
