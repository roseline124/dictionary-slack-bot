require("dotenv").config(); // 항상 맨 첫째줄에

import { socketClient } from "./clients/socket-client";
import { allMessageLinstener } from "./listeners/message";
import { createDictCommandLinstener } from "./listeners/create-dict/create-dict-slash-command";
import { createDictSubmissionListener } from "./listeners/create-dict/create-dict-submission";
import { createDictButtonLinstener } from "./listeners/create-dict/create-dict-button-action";

socketClient.on("message", allMessageLinstener);
socketClient.on("slash_commands", createDictCommandLinstener);
socketClient.on("interactive", createDictSubmissionListener);
socketClient.on("interactive", createDictButtonLinstener);

(async () => {
  // Connect to Slack
  console.log("🔥 socket mode is running");
  await socketClient.start();
})();
