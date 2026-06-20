// src\commands\advice.js
import axios from "axios";

export default function advice(app) {
  app.command("/hsoj-advice", async ({ ack, respond }) => {
    await ack();

    try {
      const { data } = await axios.get(
        `https://api.adviceslip.com/advice`
      );
      
      await respond({
        text: `💡 *Advice Slip*\n> _*${data.slip.advice}*_`
      });
    } catch (error) {
      await respond({
        text: `🤔 The advice machine is out of wisdom right now. Try again later!`
      }); 
    }
  });
}