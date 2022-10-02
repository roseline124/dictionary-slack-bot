require("dotenv").config(); // 항상 맨 첫째줄에

import { socketClient } from "./clients/socket-client";
import { allMessageLinstener } from "./listeners/message";
import { createDictCommandLinstener } from "./listeners/create-dict/create-dict-command";
import { createDictSubmissionListener } from "./listeners/create-dict/create-dict-submission";

socketClient.on("message", allMessageLinstener);
socketClient.on("slash_commands", createDictCommandLinstener);
socketClient.on("interactive", createDictSubmissionListener);

(async () => {
  // Connect to Slack
  console.log("🔥 socket mode is running");
  await socketClient.start();
})();
