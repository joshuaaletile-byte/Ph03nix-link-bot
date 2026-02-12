const express = require("express");
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");

const app = express();
const PORT = process.env.PORT || 8080;

// Keep Railway Alive
app.get("/", (req, res) => res.send("PH03NIX BOT RUNNING"));
app.listen(PORT, () => console.log("🌐 Server running on port", PORT));

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    browser: ["PH03NIX", "Chrome", "1.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "connecting") {
      console.log("🔄 Connecting to WhatsApp...");
    }

    if (connection === "open") {
      console.log("✅ WhatsApp Connected!");
    }

    // ✅ ONLY request pairing AFTER 5 seconds delay
    if (!sock.authState.creds.registered && connection === "connecting") {
      console.log("⏳ Preparing pairing request...");

      setTimeout(async () => {
        try {
          const phoneNumber = "2349169158769"; // PUT YOUR NUMBER HERE

          console.log("📱 Requesting Pairing Code...");
          const code = await sock.requestPairingCode(phoneNumber);

          console.log("🔐 YOUR PAIRING CODE:", code);
          console.log("➡️ Go to WhatsApp > Linked Devices > Link with Code");

        } catch (err) {
          console.log("⚠️ Pairing retrying in 5s...");
          setTimeout(() => startBot(), 5000);
        }
      }, 5000); // ← THIS DELAY FIXES ERROR 428
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
}

startBot();
