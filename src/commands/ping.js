// src\commands\ping.js
export default function ping(app) {
  app.command("/hsoj-ping", async ({ ack, respond }) => {
    const start = Date.now();
    
    await ack();
    
    const latency = Date.now() - start;
    
    await respond({
      text: [
        `> 🏓 HSOJ Ping!`,
        `> ⚡ Latency: ${ latency }ms`,
        `> 🕑 Time: ${new Date().toLocaleTimeString()}`,
        `> 🟢 Status: Online`
      ].join("\n")
    });
  }); 
}
