import { Context } from "telegraf";

export async function onStart(ctx: Context){
    await ctx.replyWithMarkdownV2('Привет 👋\nЯ бот для загрузки видео с таких платформ как:\n\n*• YouTube*\n*• Yandex Dzen*\n*• VK*\n\nПросто отправь мне ссылку на видео\\!')
}