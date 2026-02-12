module.exports = async (sock, msg) => {
  const text = `
⚡ PH03NIX COMMAND CENTER ⚡

/menu — Show commands
/motivate — Get motivation
/joke — Random joke
/time — Current time
/rules — View group rules
/poll — Create a poll
/tagall — Call everyone
/complaint — Submit complaint
/status — Bot status
/about — About system
/adminhelp — Admin tools

POWERED BY PH03NIX🔥
`;

  await sock.sendMessage(msg.key.remoteJid, { text });
};
