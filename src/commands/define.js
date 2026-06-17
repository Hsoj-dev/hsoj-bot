// src\commands\define.js
import axios from "axios";

export default function define(app) {
  app.command("/hsoj-define", async ({ command, ack, respond }) => {
    await ack();

    const word = command.text?.trim() || "star";

    try {
      const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
      );

      let text = `> 📖  *${data[0].word}*\n> `;

      const phonetic = data[0].phonetic ||
        data[0].phonetics?.find(p => p.text)?.text;

      if (phonetic) {
        text += `_${phonetic}_\n> `;
      }

      text += "\n> ";

      const seen = new Set();
      
      for (const entry of data) {
        for (const meaning of entry.meanings) {
          if (seen.has(meaning.partOfSpeech)) continue;
          seen.add(meaning.partOfSpeech);
          
          text += `*${meaning.partOfSpeech}*\n> `;
          text += `• ${meaning.definitions[0].definition}\n> \n> `;
        }
      }

      await respond({
        text: text.trim()
      });
    } catch (error) {
      await respond({
        text: `🤔 I couldn't find a definition for *${word}*.`
      });
    }
  });
}