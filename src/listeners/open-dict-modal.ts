import { webClient } from "../clients/web-client";
import { DICT_DESC_BLOCK_ID, DICT_TITLE_BLOCK_ID } from "./constants";

export interface OpenDictModalArgs {
  triggerId: string;
  wordTitle: string;
  callbackId: string;
  modal?: {
    title?: string;
    submitButtonText?: string;
    defaultValue?: string;
  };
}

export const openDictModal = async (args: OpenDictModalArgs) => {
  const { triggerId, modal, wordTitle, callbackId } = args;
  await webClient.views.open({
    trigger_id: triggerId,
    view: {
      type: "modal",
      callback_id: callbackId,
      title: {
        type: "plain_text",
        text: modal?.title ?? "사전에 단어 추가하기",
      },
      submit: {
        type: "plain_text",
        text: modal?.submitButtonText ?? "추가",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "닫기",
      },
      blocks: [
        {
          type: "header",
          block_id: DICT_TITLE_BLOCK_ID,
          text: {
            type: "plain_text",
            text: wordTitle,
            emoji: true,
          },
        },
        {
          type: "input",
          block_id: DICT_DESC_BLOCK_ID,
          label: {
            type: "plain_text",
            text: `'${wordTitle}'에 대해 설명을 작성해주세요 :)`,
            emoji: true,
          },
          element: {
            type: "plain_text_input",
            multiline: true,
            focus_on_load: true,
            max_length: 1000,
            ...(modal?.defaultValue
              ? { initial_value: modal.defaultValue }
              : undefined),
          },
        },
      ],
    },
  });
};
