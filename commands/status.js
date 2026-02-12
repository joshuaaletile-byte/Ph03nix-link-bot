module.exports = async (sock, msg) => {
  await sock.sendMessage(msg.key.remoteJid, {
    text: "✅ PH03NIX System Online\nServer: Railway\nState: ACTIVE"
  });
};
