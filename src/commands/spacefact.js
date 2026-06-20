// src\commands\uselessfact.js
import axios from "axios";

export default function spacefact(app) {
  app.command("/hsoj-spacefact", async ({ ack, respond }) => {
    await ack();

    const celestialBodies = [
      "mercury",
      "venus",
      "earth",
      "sun",
      "moon",
      "mars",
      "jupiter",
      "saturn",
      "uranus"
    ];

    const celestialBody = celestialBodies[Math.floor(Math.random() * celestialBodies.length)];
    
    try {
      const { data } = await axios.get(
        `https://api.bootprint.space/all/${celestialBody}`
      );
      
      await respond({
        blocks: [
          {
            type: "image",
            image_url: data.image,
            alt_text: `A photo of ${data.object}`,
          },
        ],
      });
      
      await respond({
        text: `🪐 *Space Fact: ${
          data.object.charAt(0).toUpperCase() + data.object.slice(1)
        }*\n> ${data.fact}`,
      });
    } catch (error) {
      await respond({
        text: `> 🚀 Houston, we have a problem... the space facts satellite is offline. Try again later!`
      }); 
    }
  });
}