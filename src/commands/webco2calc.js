// src\commands\webco2calc.js
import axios from "axios";

function ensureHttp(url = "") {
  const trimmed = url.trim();

  if (!trimmed) return "";

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default function webco2calc(app) {
  app.command("/hsoj-webco2calc", async ({ command, ack, respond }) => {
    await ack();

    const url = ensureHttp(command.text) || "https://stardance.hackclub.com";

    try {
      const pageResponse = await axios.get(url, {
        responseType: "arraybuffer",
      });

      const bytes = pageResponse.data.length;

      const apiRes = await axios.get(
        `https://api.websitecarbon.com/data`,
        {
          params: {
            bytes,
            green: 0,
          },
        }
      );

      const data = apiRes.data;

      const rating = data.rating;
      const cleanerThan = Math.round(data.cleanerThan * 100);

      const co2 = data.gco2e?.toFixed(3);

      const ratingEmoji =
          rating === "A+"
          ? "🟢"
          : rating === "A"
          ? "🟢"
          : rating === "B"
          ? "🟡"
          : rating === "C"
          ? "🟠"
          : rating === "D"
          ? "🔴"
          : rating === "E"
          ? "☠️"
          : "💀";
      
      await respond({
        text: [
          `>🌎 *WEBSITE CARBON REPORT*`,
          `> `,
          `>- 🔗 URL: ${url}`,
          `>- 📦 Size: ${(bytes / 1024).toFixed(1)} KB`,
          `>- 💨 CO2: ${co2} g per view`,
          `>- 📊 Rating: ${ratingEmoji} ${rating}`,
          `>- 🌱 Cleaner than: ${cleanerThan}% of web pages`,
        ].join("\n")
      });
    } catch (error) {
      await respond({
        text: "❌ Failed to analyze website :( Make sure the URL is valid."
      });
    }
  });
}