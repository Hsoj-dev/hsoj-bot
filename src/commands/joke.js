// src\commands\joke.js
import axios from "axios";

export default function joke(app) {
  app.command("/hsoj-joke", async ({ ack, respond }) => {
    await ack();

    try {
      const { data } = await axios.get(
        `https://v2.jokeapi.dev/joke/Programming?type=twopart`
      );
      
      await respond({
        text: `💻 *Programming Joke*\n> ${data.setup}\n>\n> *${data.delivery}*`
      });
    } catch (error) {
      await respond({
        text: `> 🤖 Oops! The joke compiler crashed. Try again later!`
      }); 
    }
  });
}