"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBot = void 0;
const telegraf_1 = require("telegraf");
const logger_helper_1 = require("./logger.helper");
const on_start_helper_1 = require("./on-start.helper");
const on_text_helper_1 = require("./on-text.helper");
function initBot() {
    const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
    bot.start(on_start_helper_1.onStart);
    bot.on("text", on_text_helper_1.onText);
    bot.catch((err) => {
        new logger_helper_1.Logger("bot").error(err);
    });
    bot.launch();
    new logger_helper_1.Logger("bot launch").log("Bot successfully launched!");
}
exports.initBot = initBot;
