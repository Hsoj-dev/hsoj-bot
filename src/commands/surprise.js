// src\commands\suprise.js
export default function surprise(app) {
  app.command("/hsoj-surprise", async ({ ack, respond }) => {
    await ack();
    await respond({
      text: `> 🎉 Congratulations! You have won a prize!\n> 🎁 *<http://tiny.cc/alb5101|Click here to claim your reward>*`
    });
  });
}