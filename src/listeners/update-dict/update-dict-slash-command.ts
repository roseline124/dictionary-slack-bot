import { webClient } from "../../clients/web-client";
import { lowDb } from "../../db/lowdb";
import { SlackEventListenerFn } from "../../types/slack-listener";
import { openDictModal } from "../open-dict-modal";
import { UPDATE_DICT_CALLBACK_ID } from "../constants";

export const updateDictCommandLinstener: SlackEventListenerFn<
  "slash_commands"
> = async ({ body, ack }) => {
  await ack();
  if (body.command !== "/update-dict") {
    return;
  }

  const word = await lowDb.getOne("words", { title: body.text });
  if (!word) {
    await webClient.chat.postEphemeral({
      text: `내 사전에 '${body.text}'란 단어는 없다`,
      user: body.user_id,
      channel: body.channel_id,
    });
    return;
  }

  await openDictModal({
    triggerId: body.trigger_id,
    wordTitle: body.text,
    modal: {
      title: "사전에 있는 단어 수정하기",
      submitButtonText: "수정",
      defaultValue: word.desc,
    },
    callbackId: UPDATE_DICT_CALLBACK_ID,
  });
};
