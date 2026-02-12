module.exports = async (sock, msg) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: `Submit complaints here:
https://joshuaaletile-byte.github.io/docs

POWERED BY PH03NIX🔥`
  });
};
