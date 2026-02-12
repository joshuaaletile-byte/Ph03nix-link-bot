module.exports = async (sock, msg) => {
  const text = `
🛠 ADMIN TOOLS

/tagall — Notify everyone
/poll — Start discussions
/rules — Remind members
/status — Check system

Use responsibly to maintain order.

POWERED BY PH03NIX🔥
`;

  await sock.sendMessage(msg.key.remoteJid, { text });
};
