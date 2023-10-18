"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onText = void 0;
const video_downloader_1 = require("@owl352/video-downloader");
const logger_helper_1 = require("./logger.helper");
const send_video_helper_1 = require("./send-video.helper");
const send_error_helper_1 = require("./send-error.helper");
const send_status_helper_1 = require("./send-status.helper");
const classes_1 = require("../classes");
const constants_helper_1 = require("./constants.helper");
function onText(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const msg = yield ctx.reply("Видео поставленно в очередь!");
        let prevStatus = "";
        const sChanger = new classes_1.StatusChanger((status) => {
            if (status != "" && status != prevStatus) {
                prevStatus = status;
                ctx.telegram.editMessageText(ctx.message.chat.id, msg.message_id, null, status + ` [${new Date().toLocaleTimeString()}]`);
            }
        }, 800);
        try {
            const url = new URL(ctx.message.text);
            new logger_helper_1.Logger("bot").log("new link: " + ctx.message.text);
            if (url.host.includes("yt") || url.host.includes("you")) {
                (0, video_downloader_1.downloadVideoFromYoutube)(ctx.message.text, ctx.message.from.id, constants_helper_1.outDir, (fname) => (0, send_video_helper_1.sendVideo)(fname, ctx, sChanger, msg), (fname) => (0, send_error_helper_1.sendError)("yotube", ctx), (data) => (0, send_status_helper_1.sendStatus)(data, ctx, sChanger));
            }
            else if (url.hostname.includes("dzen")) {
                (0, video_downloader_1.downloadVideoFromDzen)(ctx.message.text, ctx.message.from.id, constants_helper_1.outDir !== null && constants_helper_1.outDir !== void 0 ? constants_helper_1.outDir : "./videos", (fname) => (0, send_video_helper_1.sendVideo)(fname, ctx, sChanger, msg), (fname) => (0, send_error_helper_1.sendError)("dzen", ctx), (data) => (0, send_status_helper_1.sendStatus)(data, ctx, sChanger));
            }
            else if (url.hostname.includes("vk")) {
                (0, video_downloader_1.downloadVideoFromVk)(ctx.message.text, ctx.message.from.id, constants_helper_1.outDir !== null && constants_helper_1.outDir !== void 0 ? constants_helper_1.outDir : "./videos", (fname) => (0, send_video_helper_1.sendVideo)(fname, ctx, sChanger, msg), (fname) => (0, send_error_helper_1.sendError)("vk", ctx), (data) => (0, send_status_helper_1.sendStatus)(data, ctx, sChanger));
            }
            else {
                ctx.reply(`Эта ссылка не принадлежит ни одному из 3х сервисов 😡, как минимум на момент написния кода..\n${ctx.message.text}`);
            }
        }
        catch (error) {
            ctx.reply(`Это не ссылка 😡\n${ctx.message.text}`);
        }
    });
}
exports.onText = onText;
