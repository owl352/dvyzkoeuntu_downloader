import { Telegraf } from "telegraf";
import { Logger } from "./logger.helper";
import { onStart } from "./on-start.helper";
import { onText } from "./on-text.helper";

export function initBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN!);

  bot.start(onStart);
  bot.on("text", onText);
  bot.catch((err) => {
    new Logger("bot").error(err);
  });
  bot.launch();
  new Logger("bot launch").log("Bot successfully launched!");
}
