import { SlackEventListenerFn } from "../../types/slack-listener";
import {
  CREATE_DICT_CALLBACK_ID,
  CREATE_DICT_DESC_BLOCK_ID,
} from "./constants";

export const createDictSubmissionListener: SlackEventListenerFn<
  "interactive"
> = async ({ body, ack }) => {
  await ack();

  if (body.view.callback_id !== CREATE_DICT_CALLBACK_ID) {
    return;
  }

  const value = Object.values(
    body.view.state.values[CREATE_DICT_DESC_BLOCK_ID]
  )[0].value;

  console.log({ value });
};
