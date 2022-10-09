require("dotenv").config(); // always place it into first line

import { socketClient } from "./clients/socket-client";
import { allMessageLinstener } from "./listeners/message";
import { createDictCommandLinstener } from "./listeners/create-dict/create-dict-slash-command";
import { createDictSubmissionListener } from "./listeners/create-dict/create-dict-submission";
import { createDictButtonLinstener } from "./listeners/create-dict/create-dict-button-action";
import { updateDictCommandLinstener } from "./listeners/update-dict/update-dict-slash-command";
import { updateDictSubmissionListener } from "./listeners/update-dict/update-dict-submission";

socketClient.on("app_mention", allMessageLinstener);
socketClient.on("slash_commands", createDictCommandLinstener);
socketClient.on("slash_commands", updateDictCommandLinstener);
socketClient.on("interactive", createDictSubmissionListener);
socketClient.on("interactive", updateDictSubmissionListener);
socketClient.on("interactive", createDictButtonLinstener);

(async () => {
  // Connect to Slack
  console.log("🔥 socket mode is running");
  await socketClient.start();
})();
