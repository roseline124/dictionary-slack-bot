import { KnownBlock } from "@slack/web-api";
import { webClient } from "../clients/web-client";
import { lowDb } from "../db/lowdb";
import { SlackEventListenerFn } from "../types/slack-listener";
import { CREATE_DICT_CALLBACK_ID, SLACK_APP_ID } from "./constants";

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
  if (title === "") {
    await webClient.chat.postMessage({
      text: "나는야 스피드웨건!",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "스피드웨건 봇 부르는 방법: `@스피드웨건 봇 <궁금한 단어>`",
          },
        },
      ],
      channel: event.channel,
    });

    return;
  }

  const word = await lowDb.getOne("words", { title });

  const blocks: KnownBlock[] = [
    {
      type: "section",
      text: { type: "mrkdwn", text: word?.desc ?? "흠... 잘 모르겠군!" },
    },
  ];

  if (!word?.desc) {
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "단어 추가하기", emoji: true },
          value: title,
          action_id: CREATE_DICT_CALLBACK_ID,
        },
      ],
    });
  }

  await webClient.chat.postMessage({
    text: "나는야 스피드웨건!",
    blocks,
    channel: event.channel,
  });
};
