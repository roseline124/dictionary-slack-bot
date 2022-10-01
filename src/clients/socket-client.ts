import { SocketModeClient } from "@slack/socket-mode";

const appToken = process.env.SLACK_APP_TOKEN;
export const socketClient = new SocketModeClient({ appToken });
