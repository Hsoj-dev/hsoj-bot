// src/commands/ship.js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const postError = async (command, text) => {
  await fetch(command.response_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      replace_original: false,
    }),
  });
};

export default function shiplaunch(app) {
  app.command("/hsoj-shiplaunch", async ({ command, ack, client }) => {
    await ack();

    try {
      const channel = command.channel_id;
      const seconds = Math.min(Number(command.text) || 10, 15);
  
      const post = (text) =>
        client.chat.postMessage({
          channel,
          text,
        });
  
      await post(`🚀 T-minus *${seconds}* seconds...`);
      await sleep(1000);
  
      for (let i = seconds - 1; i > 0; i--) {
        await post(`🚀 ${i}...`);
        await sleep(1000);
      }
  
      await post("🔥 Ignition...");
      await sleep(1000);
  
      await post("🌌 Liftoff...");
      await sleep(1000);
  
      for (let i = 3; i > 0; i--) {
        await post(`🚀 ${i}...`);
        await sleep(1000);
      }
  
      await post("🚀✨🚀✨🚀✨ *THE SHIP HAS LAUNCHED!* ✨🚀✨🚀✨🚀");
    } catch (error) {
      const shipErrorMessages = [
        `🚨 Houston, we have a problem... the ship refuses to launch.\nPlease invite @Hsoj App to this channel so mission control can proceed 🚀`,
        `🛑 Launch aborted!\nThe rocket is lonely 😔🚀\nPlease invite @Hsoj App to this channel so we can continue the mission to space`,
        `👽 ERROR: Alien authorities blocked the launch 😭\n🚀 Invite @Hsoj App to this channel to negotiate safe passage through space`,
        `🚀 Mission Control Alert: Launch sequence failed.\nReason: missing crew member (@Hsoj App).\nPlease invite them to the channel to proceed with liftoff.`
      ];

      await postError(
        command,
        shipErrorMessages[Math.floor(Math.random() * shipErrorMessages.length)]
      );
    }
  });
}