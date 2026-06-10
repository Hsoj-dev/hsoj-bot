// src\commands\date.js
export default function date(app) {
  app.command("/hsoj-date", async ({ ack, respond }) => {
    await ack();

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    
    await respond({
      text: `> 🗓️  Date: ${date}`
    });
  });
}