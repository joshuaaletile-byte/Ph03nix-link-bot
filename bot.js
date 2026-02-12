const express = require("express");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

// ✅ Keep Railway Alive
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => res.send("PH03NIX BOT ACTIVE"));
app.listen(PORT, () => console.log("🌐 Server running on port", PORT));

// ✅ Start WhatsApp Bot
async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    browser: ["PH03NIX", "Chrome", "1.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  let pairingRequested = false;

  sock.ev.on("connection.update", async (update) => {
    const { connection } = update;

    if (connection === "connecting") {
      console.log("🔄 Connecting to WhatsApp...");
    }

    if (connection === "open") {
      console.log("✅ WhatsApp Connected Successfully!");
    }

    // ✅ Ask for pairing ONLY after connection starts
    if (!sock.authState.creds.registered && !pairingRequested) {
      pairingRequested = true;

      const phoneNumber = "2349169158769"; // <-- PUT YOUR NUMBER

      console.log("📱 Requesting Pairing Code...");
      const code = await sock.requestPairingCode(phoneNumber);

      console.log("🔐 YOUR PAIRING CODE:", code);
      console.log("➡️ Open WhatsApp > Linked Devices > Link with Code");
    }

    if (connection === "close") {
      console.log("❌ Connection closed. Restarting...");
      startBot();
    }
  });
}

startBot();
