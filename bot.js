const express = require("express");
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");

// ✅ THIS PART KEEPS RAILWAY RUNNING
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("PH03NIX BOT IS RUNNING");
});

app.listen(PORT, () => console.log("🌐 Keep-alive server started on port", PORT));

// ✅ WHATSAPP BOT STARTS HERE
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  console.log("⚡ PH03NIX BOT STARTED...");

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log("📱 Scan this QR code with WhatsApp");
    }

    if (connection === "open") {
      console.log("✅ WhatsApp Connected!");
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      console.log("❌ Disconnected. Reconnecting...", reason);

      if (reason !== DisconnectReason.loggedOut) {
        startBot();
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      "";

    if (text.toLowerCase() === "/menu") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "🔥 PH03NIX ACTIVE\nType commands to begin.\nPOWERED BY PH03NIX🔥"
      });
    }
  });
}

startBot();
