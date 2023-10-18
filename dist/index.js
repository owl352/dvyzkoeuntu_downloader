"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_bot_helper_1 = require("./helpers/init-bot.helper");
const constants_helper_1 = require("./helpers/constants.helper");
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function main() {
    fs_1.default.readdir(constants_helper_1.outDir, (err, files) => {
        if (err)
            throw err;
        for (const file of files) {
            if (file !== ".keep") {
                fs_1.default.unlink(path_1.default.join(constants_helper_1.outDir, file), (err) => {
                    if (err)
                        throw err;
                    console.log(`Удален файл ${file}`);
                });
            }
        }
    });
    (0, init_bot_helper_1.initBot)();
}
main();
