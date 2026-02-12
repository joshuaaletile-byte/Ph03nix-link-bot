module.exports = async (sock, msg) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: "@everyone Please check this message."
  });
};
