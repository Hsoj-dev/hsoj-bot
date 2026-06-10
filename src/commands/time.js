// src\commands\time.js
export default function time(app) {
  app.command("/hsoj-time", async ({ ack, respond }) => {
    await ack();

    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
    
    await respond({
      text: `> 🕑  Time: ${time}`
    });
  });
}