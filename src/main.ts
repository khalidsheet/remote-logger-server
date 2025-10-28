#!/usr/bin/env node

import { WebSocketServer } from "ws";
import chalk from "chalk";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4455;
const wss = new WebSocketServer({ port: PORT });

const end = (text: string) => {
  return text.split("/").pop() || text;
};

const logger = (color: any, prefix: string, ...message: any[]) => {
  console.log(
    chalk.gray(
      new Intl.DateTimeFormat("en-US", { timeStyle: "medium" }).format(
        new Date()
      )
    ),
    color(prefix),
    ...message
  );
};

logger(chalk.green, "INFO", `Remote Logger service started on port ${PORT}`);

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    try {
      const { app = "Default", message, caller } = JSON.parse(data.toString());
      logger(chalk.blue, `[${app}]`, `[${end(caller)}]`, ...message);
    } catch (error) {
      logger(chalk.red, "ERROR", `Error processing message: ${error}`);
    }
  });
});
