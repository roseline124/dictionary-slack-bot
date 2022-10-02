import { webClient } from "../clients/web-client";
import { SlackBotEvent, SlackEventListenerFn } from "../types/slack-listener";

export const allMessageLinstener: SlackEventListenerFn<"message"> = async ({
  event,
  ack,
}) => {
  await ack();

  // ignore all bot message
  if ((event as SlackBotEvent).bot_profile) {
    return;
  }

  await webClient.chat.postMessage({
    text: "hi",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Welcome to the channel, <@${event.user}>. We're here to help. Let us know if you have an issue.`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Get Help",
          },
          value: "get_help",
        },
      },
    ],
    channel: event.channel,
  });
};
