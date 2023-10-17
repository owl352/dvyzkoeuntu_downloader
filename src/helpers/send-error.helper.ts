import { Logger } from "./logger.helper";

export function sendError(name: string, ctx: any) {
  ctx.reply("Ошибка скачивания видео!");
  new Logger("video youtube").error("downloading video error!");
}
