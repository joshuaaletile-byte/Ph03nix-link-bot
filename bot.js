const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

// Import Commands
const menu = require("./commands/menu");
const complaint = require("./commands/complaint");
const motivate = require("./commands/motivate");
const joke = require("./commands/joke");
const time = require("./commands/time");
const rules = require("./commands/rules");
const tagall = require("./commands/tagall");
const poll = require("./commands/poll");
const status = require("./commands/status");
const about = require("./commands/about");
const adminhelp = require("./commands/adminhelp");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({ auth: state });

  sock.ev.on("creds.update", saveCreds);

  console.log("PH03NIX BOT STARTED...");

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const command = text.trim().toLowerCase();

    if (command === "/menu") return menu(sock, msg);
    if (command === "/complaint") return complaint(sock, msg);
    if (command === "/motivate") return motivate(sock, msg);
    if (command === "/joke") return joke(sock, msg);
    if (command === "/time") return time(sock, msg);
    if (command === "/rules") return rules(sock, msg);
    if (command === "/tagall") return tagall(sock, msg);
    if (command.startsWith("/poll")) return poll(sock, msg, text);
    if (command === "/status") return status(sock, msg);
    if (command === "/about") return about(sock, msg);
    if (command === "/adminhelp") return adminhelp(sock, msg);
  });
}

startBot();
