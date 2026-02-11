const { OWNER_ID } = require("./config");
const startMessage = require("./messages/start");
const helpMessage = require("./messages/help");
const { isOwner } = require("./utils/permissions");

function registerCommands(bot) {

  // START COMMAND
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, startMessage, {
      parse_mode: "Markdown"
    });
  });

  // HELP COMMAND
  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, helpMessage, {
      parse_mode: "Markdown"
    });
  });

  // COMPLAINT COMMAND
  bot.onText(/\/complaint/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      `🛡 PH03NIX Complaint Channel

Submit your report securely here:
https://joshuaaletile-byte.github.io/ph03nix-link-bot/

POWERED BY PH03NIX🔥`
    );
  });

  // Optional owner-only command example
  bot.onText(/\/stats/, (msg) => {
    if (!isOwner(msg.from.id)) return bot.sendMessage(msg.chat.id, "⛔ Access denied.");

    bot.sendMessage(
      msg.chat.id,
      "📊 System operational.\nAll core services are running.\n\nPOWERED BY PH03NIX🔥"
    );
  });

  // Unknown command handler
  bot.on('message', (msg) => {
    if (!msg.text.startsWith('/')) return;
    // do nothing, or you can add unknown command reply
  });
}

// ✅ Export function properly
module.exports = registerCommands;
