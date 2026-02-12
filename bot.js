const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const pino = require("pino");

// ✅ Ensure session folder exists (VERY IMPORTANT FOR RAILWAY)
if (!fs.existsSync("./session")) {
  fs.mkdirSync("./session", { recursive: true });
}

// Load commands
const commands = {};
fs.readdirSync("./commands").forEach(file => {
  const command = require(`./commands/${file}`);
  commands[command.name] = command;
});

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    browser: ["PH03NIX BOT", "Chrome", "1.0"]
  });

  console.log("🚀 PH03NIX BOT STARTED...");
  console.log("📡 Connecting to WhatsApp...");

  // Save session automatically
  sock.ev.on("creds.update", saveCreds);

  // Handle connection updates
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("📱 Scan the QR code from Railway logs to connect.");
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log("❌ Connection closed. Reconnecting:", shouldReconnect);

      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === "open") {
      console.log("✅ WhatsApp Connected Successfully!");
    }
  });

  // Listen for messages
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    const args = text.trim().split(" ");
    const commandName = args[0].toLowerCase();

    if (commands[commandName]) {
      commands[commandName].execute(sock, msg, args);
    }
  });
}

// Start bot
startBot();
