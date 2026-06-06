// src\index.js
import dotenv from "dotenv";
import { App } from "@slack/bolt";

import ping from "./commands/ping.js";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

ping(app);

await app.start();

console.log("bot is running!");