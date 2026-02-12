const quotes = [
  "Stay focused. Stay dangerous.",
  "Consistency builds power.",
  "Small progress is still progress.",
  "Discipline creates freedom."
];

module.exports = async (sock, msg) => {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  await sock.sendMessage(msg.key.remoteJid, { text: `🔥 ${q}` });
};
