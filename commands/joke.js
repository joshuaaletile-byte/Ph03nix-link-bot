const jokes = [
  "Why did the phone go to school? To improve its connection.",
  "My code works… I just don’t know why.",
  "Debugging is like being a detective."
];

module.exports = async (sock, msg) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  await sock.sendMessage(msg.key.remoteJid, { text: joke });
};
