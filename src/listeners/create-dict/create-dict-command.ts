import { webClient } from "../../clients/web-client";
import { SlackEventListenerFn } from "../../types/slack-listener";
import {
  CREATE_DICT_CALLBACK_ID,
  CREATE_DICT_DESC_BLOCK_ID,
  CREATE_DICT_TITLE_BLOCK_ID,
} from "./constants";

export const createDictCommandLinstener: SlackEventListenerFn<
  "slash_commands"
> = async ({ body, ack }) => {
  await ack();
  if (body.command !== "/create-dict") {
    return;
  }

  await webClient.views.open({
    trigger_id: body.trigger_id,
    view: {
      type: "modal",
      callback_id: CREATE_DICT_CALLBACK_ID,
      title: {
        type: "plain_text",
        text: "사전에 단어 추가하기",
      },
      submit: {
        type: "plain_text",
        text: "추가",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "닫기",
      },
      blocks: [
        {
          type: "header",
          block_id: CREATE_DICT_TITLE_BLOCK_ID,
          text: {
            type: "plain_text",
            text: body.text,
            emoji: true,
          },
        },
        {
          type: "input",
          block_id: CREATE_DICT_DESC_BLOCK_ID,
          label: {
            type: "plain_text",
            text: `'${body.text}'에 대해 설명을 작성해주세요 :)`,
            emoji: true,
          },
          element: {
            type: "plain_text_input",
            multiline: true,
            focus_on_load: true,
            max_length: 1000,
          },
        },
      ],
    },
  });
};
