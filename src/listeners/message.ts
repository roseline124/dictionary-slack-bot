import { webClient } from "../clients/web-client";
import { lowDb } from "../db/lowdb";
import { SlackBotEvent, SlackEventListenerFn } from "../types/slack-listener";
import { CREATE_DICT_CALLBACK_ID } from "./create-dict/constants";

export const allMessageLinstener: SlackEventListenerFn<"message"> = async ({
  event,
  body,
  ack,
}) => {
  await ack();

  // ignore all bot message
  if ((event as SlackBotEvent).bot_profile || !event.text.startsWith("?")) {
    return;
  }

  const title = event.text.slice(1);
  const word = await lowDb.getOne("words", { title });

  await webClient.chat.postMessage({
    text: "나는야 스피드웨건!",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: word?.desc ?? "흠... 잘 모르겠군!",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "단어 추가하기",
              emoji: true,
            },
            value: title,
            action_id: CREATE_DICT_CALLBACK_ID,
          },
        ],
      },
    ],
    channel: event.channel,
  });
};
