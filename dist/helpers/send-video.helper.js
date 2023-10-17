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
function sendVideo(fname, ctx, statusChanger) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let f of fs_1.default.readdirSync("./videos/")) {
            console.log(f);
            if (f.includes(fname)) {
                yield ctx.replyWithVideo({ source: "./videos/" + f }, {
                    caption: "Ваше видео!",
                });
                statusChanger.destroy();
                fs_1.default.rmSync("./videos/" + f);
            }
        }
    });
}
exports.sendVideo = sendVideo;
