import { HeaderBlock } from "@slack/web-api";
import { lowDb } from "../../db/lowdb";
import { SlackEventListenerFn } from "../../types/slack-listener";
import {
  CREATE_DICT_CALLBACK_ID,
  CREATE_DICT_DESC_BLOCK_ID,
  CREATE_DICT_TITLE_BLOCK_ID,
} from "./constants";

export const createDictSubmissionListener: SlackEventListenerFn<
  "interactive"
> = async ({ body, ack }) => {
  await ack();

  if (
    body.type !== "modal" ||
    body.view.callback_id !== CREATE_DICT_CALLBACK_ID
  ) {
    return;
  }

  const desc = Object.values(
    body.view.state.values[CREATE_DICT_DESC_BLOCK_ID]
  )[0].value;

  const titleBlock = body.view.blocks.find(
    (block) => block.block_id === CREATE_DICT_TITLE_BLOCK_ID
  );
  const title = (titleBlock as HeaderBlock).text.text;

  await lowDb.save("words", { title, desc });
};
