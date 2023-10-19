import {
  downloadVideoFromDzen,
  downloadVideoFromVk,
  downloadVideoFromYoutube,
} from "@owl352/video-downloader";
import { Logger } from "./logger.helper";
import { Context } from "vm";
import { sendVideo } from "./send-video.helper";
import { sendError } from "./send-error.helper";
import { sendStatus } from "./send-status.helper";
import { StatusChanger } from "../classes";
import { outDir } from "./constants.helper";

export async function onText(ctx: Context) {
  const msg = await ctx.reply("Видео поставленно в очередь!");
  let prevStatus = "";
  const sChanger: StatusChanger = new StatusChanger((status: string) => {
    if (status != "" && status != prevStatus) {
      prevStatus = status;
      ctx.telegram.editMessageText(
        ctx.message.chat.id,
        msg.message_id,
        null,
        status + ` [${new Date().toLocaleTimeString()}]`
      );
    }
  }, 800);
  try {
    const url = new URL(ctx.message.text);
    new Logger("bot").log("new link: " + ctx.message.text);
    if (url.host.includes("yt") || url.host.includes("you")) {
      if (url.host.includes("&index=")) {
        ctx.reply(
          `Пожалуйста, не отправляйте целый плейлист!\n${ctx.message.text}`
        );
      } else {
        downloadVideoFromYoutube(
          ctx.message.text,
          ctx.message.from.id,
          outDir,
          (fname: string) => sendVideo(fname, ctx, sChanger, msg),
          (fname: string) => sendError("yotube", ctx),
          (data: string) => sendStatus(data, ctx, sChanger)
        );
      }
    } else if (url.hostname.includes("dzen")) {
      downloadVideoFromDzen(
        ctx.message.text,
        ctx.message.from.id,
        outDir ?? "./videos",
        (fname: string) => sendVideo(fname, ctx, sChanger, msg),
        (fname: string) => sendError("dzen", ctx),
        (data: string) => sendStatus(data, ctx, sChanger)
      );
    } else if (url.hostname.includes("vk")) {
      downloadVideoFromVk(
        ctx.message.text,
        ctx.message.from.id,
        outDir ?? "./videos",
        (fname: string) => sendVideo(fname, ctx, sChanger, msg),
        (fname: string) => sendError("vk", ctx),
        (data: string) => sendStatus(data, ctx, sChanger)
      );
    } else {
      ctx.reply(
        `Эта ссылка не принадлежит ни одному из 3х сервисов 😡, как минимум на момент написния кода..\n${ctx.message.text}`
      );
    }
  } catch (error) {
    ctx.reply(`Это не ссылка 😡\n${ctx.message.text}`);
  }
}
