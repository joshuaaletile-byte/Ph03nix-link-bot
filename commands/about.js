module.exports = async (sock, msg) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `
This automation node enhances communication,
moderation and coordination across platforms.

Engineered for reliable digital operations.

POWERED BY PH03NIX🔥`
  });
};
