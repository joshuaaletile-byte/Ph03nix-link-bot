module.exports = async (sock, msg) => {
  const rules = `
📜 GROUP RULES

• No spam
• Be respectful
• No illegal content
• Stay relevant

POWERED BY PH03NIX🔥
`;

  await sock.sendMessage(msg.key.remoteJid, { text: rules });
};
