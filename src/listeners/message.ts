import { KnownBlock } from "@slack/web-api";
import { webClient } from "../clients/web-client";
import { lowDb } from "../db/lowdb";
import { SlackEventListenerFn } from "../types/slack-listener";
import { CREATE_DICT_CALLBACK_ID } from "./constants";

const SLACK_APP_ID = process.env.SLACK_APP_ID;
const SLACK_APP_NAME = process.env.SLACK_APP_NAME;

export const allMessageLinstener: SlackEventListenerFn<"app_mention"> = async ({
  event,
  ack,
}) => {
  await ack();

  // ignore all bot message
  if (
    event.type !== "app_mention" ||
    !event.text.includes(`<@${SLACK_APP_ID}>`) ||
    event.user === SLACK_APP_ID
  ) {
    return;
  }

  const title = event.text.replace(`<@${SLACK_APP_ID}>`, "").trim();
  if (!title) {
    const fallbackMessage =
      `how to call ${SLACK_APP_NAME}: ` +
      "`" +
      `@${SLACK_APP_NAME} <word>` +
      "`";
    await webClient.chat.postMessage({
      text: "dictionary-slack-bot",
      blocks: [
        { type: "section", text: { type: "mrkdwn", text: fallbackMessage } },
      ],
      channel: event.channel,
    });

    return;
  }

  const word = await lowDb.getOne("words", { title });

  const blocks: KnownBlock[] = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: word?.desc
          ? `*${word?.title}*\n${word?.desc}`
          : "hmmm... I don't know",
      },
    },
  ];

  if (!word?.desc) {
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "create word", emoji: true },
          value: title,
          action_id: CREATE_DICT_CALLBACK_ID,
        },
      ],
    });
  }

  await webClient.chat.postMessage({
    text: `create word`,
    blocks,
    channel: event.channel,
  });
};
