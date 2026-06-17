// src\commands\dogpic.js
import axios from "axios";

export default function dogpic(app) {
  app.command("/hsoj-dogpic", async ({ ack, respond }) => {
    await ack();

    try {
      const { data } = await axios.get(
        `https://random.dog/woof.json`
      );

      const url = data.url;

      await respond({
        blocks: [
          {
            type: "image",
            image_url: url,
            alt_text: "random dog",
          },
        ],
        text: "🐶 Random dog pic",
      });
    } catch (error) {
      await respond({
        text: `😭 Failed to fetch a dog pic. Try again!`
      });
    }
  });
}