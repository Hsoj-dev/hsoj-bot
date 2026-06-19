// src\commands\dogfact.js
import axios from "axios";

export default function dogfact(app) {
  app.command("/hsoj-dogfact", async ({ ack, respond }) => {
    await ack();

    try {
      const { data } = await axios.get(
        `https://dogapi.dog/api/v1/facts?number=1`
      );

      const fact = data.facts[0];
      
      await respond({
        text: `🐶 *Dog Fact*\n> ${fact}`
      }); 
    } catch (error) {
      await respond({
        text: `> 🐶 Couldn't fetch a dog fact right now. Try again later!`
      }); 
    }
  });
}