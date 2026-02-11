const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN } = require("./config");
const registerBotHandlers = require("./bot");

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN is missing");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log("🔥 PH03NIX LINK BOT IS LIVE");

registerBotHandlers(bot);
