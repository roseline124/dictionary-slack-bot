import { SlackEventListenerFn } from "../../types/slack-listener";
import { openCreateDictModal } from "./open-create-dict-modal";

export const createDictCommandLinstener: SlackEventListenerFn<
  "slash_commands"
> = async ({ body, ack }) => {
  await ack();
  if (body.command !== "/create-dict") {
    return;
  }

  await openCreateDictModal(body.trigger_id, body.text);
};
