const TelegramBot = require("node-telegram-bot-api");
const registerCommands = require("./bot");

// We will store the token safely on Render (NOT inside code)
const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error("BOT_TOKEN is missing!");
}

// Start bot in polling mode
const bot = new TelegramBot(token, { polling: true });

// Load commands
registerCommands(bot);

console.log("🔥 PH03NIX Bot is running...");
