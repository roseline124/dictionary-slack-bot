import { SlackEventListenerFn } from "../../types/slack-listener";
import { CREATE_DICT_CALLBACK_ID } from "../constants";
import { openDictModal } from "../open-dict-modal";

export const createDictCommandLinstener: SlackEventListenerFn<
  "slash_commands"
> = async ({ body, ack }) => {
  await ack();
  if (body.command !== "/create-dict") {
    return;
  }

  await openDictModal({
    triggerId: body.trigger_id,
    wordTitle: body.text,
    callbackId: CREATE_DICT_CALLBACK_ID,
  });
};
