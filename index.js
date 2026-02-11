const TelegramBot = require("node-telegram-bot-api");
const registerCommands = require("./bot");
const { BOT_TOKEN } = require("./config");

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing!");
}

// Start bot in polling mode
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Register all commands
registerCommands(bot);

console.log("🔥 PH03NIX Bot is running...");
