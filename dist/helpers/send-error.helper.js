"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = void 0;
const logger_helper_1 = require("./logger.helper");
function sendError(name, ctx) {
    ctx.reply("Ошибка скачивания видео!");
    new logger_helper_1.Logger("video youtube").error("downloading video error!");
}
exports.sendError = sendError;
