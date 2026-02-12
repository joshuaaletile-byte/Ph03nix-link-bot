module.exports = async (sock, msg, text) => {
  const question = text.replace("/poll", "").trim();

  if (!question) {
    return sock.sendMessage(msg.key.remoteJid, {
      text: "Usage: /poll Your question here"
    });
  }

  await sock.sendMessage(msg.key.remoteJid, {
    text: `📊 POLL:\n${question}\n\nReply YES or NO`
  });
};
