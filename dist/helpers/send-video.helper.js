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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVideo = void 0;
const fs_1 = __importDefault(require("fs"));
const logger_helper_1 = require("./logger.helper");
const remove_video_helper_1 = require("./remove-video-helper");
function sendVideo(fname, ctx, statusChanger, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.telegram.editMessageText(ctx.message.chat.id, msg.message_id, null, "100%");
        for (let f of fs_1.default.readdirSync("./videos/")) {
            console.log(f);
            if (f.includes(fname)) {
                new logger_helper_1.Logger("send video").info("./videos/" + f);
                if (fs_1.default.statSync("./videos/" + f).size / (1024 * 1024) > 45) {
                    yield ctx.reply("Ваше видео доступно превышает 50 мб и будет доступно по ссылке ниже.\n Оно доступно в течении 30 минут http://download.vkytdz.online/" +
                        f);
                }
                else {
                    yield ctx.replyWithVideo({ source: "./videos/" + f }, {
                        caption: "Ваше видео!",
                    });
                }
                (0, remove_video_helper_1.remvoeVideo)(f);
                statusChanger.destroy();
            }
        }
    });
}
exports.sendVideo = sendVideo;
