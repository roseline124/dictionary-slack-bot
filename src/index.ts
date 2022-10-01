import { SocketModeClient } from "@slack/socket-mode";
require("dotenv").config();

// Read a token from the environment variables
const appToken = process.env.SLACK_APP_TOKEN;

// Initialize
const socketModeClient = new SocketModeClient({ appToken });

socketModeClient.on("message", async ({ event, body, ack }) => {
  console.log({ body, event });
  await ack({ text: "I got it!" });
});

(async () => {
  // Connect to Slack
  console.log("🔥 socket mode is running");
  await socketModeClient.start();
})();
