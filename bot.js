const TelegramBot = require('node-telegram-bot-api');
const helpMessage = require('./help');

// 🔑 Replace with your bot token
const token = "YOUR BOT_TOKEN";

// 🌐 Replace with your complaint site link
const complaintLink = "https://joshuaaletilebyte.github.io/ph03nix-link-bot/";

const bot = new TelegramBot(token, { polling: true });

console.log("PH03NIX Bot is running...");

// START COMMAND
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const startMessage = `
🔥 PH03NIX System Initialized

Connection established successfully.
Command interface is now available.

Type /help to view available operations.
`;

    bot.sendMessage(chatId, startMessage);
});

// HELP COMMAND
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, helpMessage);
});

// COMPLAINT COMMAND (Redirect to Website)
bot.onText(/\/complaint/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId,
`To submit a complaint or report an issue,
please use the official PH03NIX portal below:

${complaintLink}

Our system will process your submission accordingly.

POWERED BY PH03NIX🔥`
    );
});

// OPTIONAL: UNKNOWN COMMAND HANDLER
bot.on('message', (msg) => {
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(msg.chat.id,
`Command not recognized.

Use /help to view available commands.

POWERED BY PH03NIX🔥`
        );
    }
});
