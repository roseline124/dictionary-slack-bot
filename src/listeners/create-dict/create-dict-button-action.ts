import { SlackEventListenerFn } from "../../types/slack-listener";
import { CREATE_DICT_CALLBACK_ID } from "./constants";
import { openCreateDictModal } from "./open-create-dict-modal";

export const createDictButtonLinstener: SlackEventListenerFn<
  "interactive"
> = async ({ body, ack }) => {
  await ack();
  if (
    body.type !== "block_actions" ||
    body.actions[0].action_id !== CREATE_DICT_CALLBACK_ID
  ) {
    return;
  }

  await openCreateDictModal(body.trigger_id, body.actions[0].value);
};
