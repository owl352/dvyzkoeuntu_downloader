"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remvoeVideo = void 0;
const timestring_to_ms_1 = require("@lexxxell/timestring-to-ms");
const constants_helper_1 = require("./helpers/constants.helper");
const fs_1 = __importDefault(require("fs"));
function remvoeVideo(f) {
    setTimeout(() => {
        if (fs_1.default.existsSync("./videos/!" + f)) {
            remvoeVideo(f);
        }
        else {
            fs_1.default.rmSync("./videos/" + f);
        }
    }, (0, timestring_to_ms_1.timeStringToMs)(constants_helper_1.fileLifeTime));
}
exports.remvoeVideo = remvoeVideo;
