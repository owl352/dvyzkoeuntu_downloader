import { initBot } from "./helpers/init-bot.helper";
import { outDir } from "./helpers/constants.helper";
import "dotenv/config";
import path from "path";
import fs from "fs";

function main() {
  fs.readdir(outDir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      if (file !== ".keep") {
        fs.unlink(path.join(outDir, file), (err) => {
          if (err) throw err;
          console.log(`Удален файл ${file}`);
        });
      }
    }
  });
  initBot();
}

main();
