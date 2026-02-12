const express = require("express");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const pino = require("pino");

// ✅ Ensure session folder exists
if (!fs.existsSync("./session")) {
  fs.mkdirSync("./session", { recursive: true });
}

// Keep Railway alive
const app = express();
const PORT = process.env.PORT || 8080;
app.get("/", (req, res) => res.send("PH03NIX BOT ACTIVE"));
app.listen(PORT, () => console.log("🌐 Keep-alive server running on port", PORT));

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    browser: ["PH03NIX BOT", "Chrome", "1.0"]
  });

  console.log("🚀 PH03NIX BOT STARTING...");

  sock.ev.on("creds.update", saveCreds);

  let pairingRequested = false;

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "connecting") console.log("🔄 Connecting to WhatsApp...");
    if (connection === "open") console.log("✅ WhatsApp Connected Successfully!");

    if (!sock.authState.creds.registered && !pairingRequested && connection === "connecting") {
      pairingRequested = true;

      // Request text-based pairing code
      try {
        console.log("⏳ Preparing pairing request...");
        const phoneNumber = await sock.requestPairingCode();
        console.log("🔐 YOUR PAIRING CODE:", phoneNumber);
        console.log("➡️ Open WhatsApp → Linked Devices → Link with Code → Type the code above");
      } catch (err) {
        console.log("⚠️ Pairing code request failed, retrying in 5s...");
        setTimeout(() => startBot(), 5000);
      }
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      console.log("❌ Connection closed. Reason:", reason);

      if (reason !== DisconnectReason.loggedOut) {
        console.log("🔄 Reconnecting...");
        startBot();
      }
    }
  });

  // Message listener (example)
  sock.ev.on("messages.upsert", async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (text.toLowerCase() === "/menu") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🔥 PH03NIX ACTIVE\nType /help to explore commands\nPOWERED BY PH03NIX🔥"
      });
    }
  });
}

startBot();
