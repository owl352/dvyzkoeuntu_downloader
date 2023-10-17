"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStatus = void 0;
function sendStatus(data, ctx, stChanger) {
    if (data.toString().includes("ETA")) {
        const st = data.toString().split("[download]");
        stChanger.changeStatus(st[st.length - 1]);
    }
}
exports.sendStatus = sendStatus;
