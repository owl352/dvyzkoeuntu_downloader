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
const timestring_to_ms_1 = require("@lexxxell/timestring-to-ms");
const constants_helper_1 = require("./constants.helper");
function sendVideo(fname, ctx, statusChanger, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        ctx.telegram.editMessageText(ctx.message.chat.id, msg.message_id, null, "100%");
        for (let f of fs_1.default.readdirSync("./videos/")) {
            console.log(f);
            if (f.includes(fname)) {
                new logger_helper_1.Logger("send video").info("./videos/" + f);
                yield ctx.reply("http://download.vkytdz.online/" + f);
                statusChanger.destroy();
                setTimeout(() => fs_1.default.rmSync("./videos/" + f), (0, timestring_to_ms_1.timeStringToMs)(constants_helper_1.fileLifeTime));
            }
        }
    });
}
exports.sendVideo = sendVideo;
