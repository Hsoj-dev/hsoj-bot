// src\commands\figlet.js
import figlet from "figlet";
import extractKeyword from "../helpers/extractKeyword.js";

export default function figletApp(app) {
  app.command("/hsoj-figlet", async ({ command, ack, respond }) => {
    await ack();

    try {
      const fonts = figlet.fontsSync();
      
      const { keyword: font, remainingText } = extractKeyword(
        command.text,
        fonts
      );

      const text = remainingText?.trim() || "Hi! I am Hsoj.";
      
      const ascii = await figlet.text(text, {
        font: font || "standard"
      });

      await respond({
        text: `\`\`\`\n${ascii}\n\`\`\``
      });
    } catch (error) {
      await respond({
        text: `Failed to generate ASCII art :(`
      });
    }
  });
}