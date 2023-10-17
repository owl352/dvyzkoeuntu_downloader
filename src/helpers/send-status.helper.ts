import { StatusChanger } from "../classes";

export function sendStatus(data: any, ctx: any, stChanger: StatusChanger) {
  if (data.toString().includes("ETA")) {
    const st: string[] = data.toString().split("[download]");
    stChanger.changeStatus(st[st.length - 1]);
  }
}
