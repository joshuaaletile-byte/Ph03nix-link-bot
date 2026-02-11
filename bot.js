const { OWNER_ID } = require("./config");
const startMessage = require("./messages/start");
const helpMessage = require("./messages/help");
const { isOwner } = require("./utils/permissions");

module.exports = function (bot) {

  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, startMessage, {
      parse_mode: "Markdown"
    });
  });

  bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, helpMessage, {
      parse_mode: "Markdown"
    });
  });

  bot.onText(/\/stats/, (msg) => {
    if (!isOwner(msg.from.id)) {
      return bot.sendMessage(msg.chat.id, "⛔ Access denied.");
    }

    bot.sendMessage(
      msg.chat.id,
      "📊 System operational.\nAll core services are running.\n\nPOWERED BY PH03NIX🔥"
    );
  });

};
