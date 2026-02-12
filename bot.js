const express = require("express");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

// Keep Railway Alive
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("PH03NIX BOT RUNNING"));
app.listen(PORT, () => console.log("🌐 Server running on", PORT));

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection } = update;

    if (connection === "open") {
      console.log("✅ WhatsApp Connected Successfully!");
    }

    if (connection === "close") {
      console.log("❌ Connection closed, restarting...");
      startBot();
    }
  });

  // 🔑 THIS GENERATES PAIRING CODE
  if (!sock.authState.creds.registered) {
    const phoneNumber = "2349169158769"; // PUT YOUR NUMBER HERE

    const code = await sock.requestPairingCode(phoneNumber);
    console.log("🔐 Pairing Code:", code);
    console.log("Enter this code in WhatsApp Linked Devices.");
  }
}

startBot();
