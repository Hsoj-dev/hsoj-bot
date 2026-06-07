// src\commands\cowsay.js
import cowsay from "cowsay";

export default function cowsayApp(app) {
  app.command("/hsoj-cowsay", async ({ command, ack, respond }) => {
    await ack();

    const text = command.text || "Moo!";
    
    await respond({
      text: `\`\`\`\n${cowsay.say({text})}\n\`\`\``
    });
  });
}