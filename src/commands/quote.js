// src\commands\quote.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default function quote(app) {
  app.command("/hsoj-quote", async ({ ack, respond }) => {
    await ack();

    try {
      const { data } = await axios.get(
        "https://www.quoterism.com/api/quotes/random",
        {
          headers: {
            "X-API-Key": process.env.QUOTERISM_API_KEY
          }
        }
      );

      await respond({
        text: `> "_${data.text}_"\n> — *${data.author.name}*`
      });
    } catch (error) {
      await respond({
        text: `✨ Even the wisest quotes need a day off sometimes. Please try again later."`
      });
    }
  });
}