// src\commands\daysleft.js
export default function daysleft(app) {
  app.command("/hsoj-daysleft", async ({ ack, respond }) => {
    await ack();

    const today = new Date();
    const target = new Date("2026-09-30");
    const diffMs = target - today;
    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const dayWord = daysLeft === 1 ? "day" : "days";
    
    await respond({
      text: `> 🗓️  *${daysLeft} ${dayWord}* left until September 30, 2026.`
    });
  });
}