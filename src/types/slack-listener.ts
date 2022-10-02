import { Block } from "@slack/web-api";

/**
 * @@@@@@ custom typings @@@@@@
 */

export type SlackEventTypes = "message" | "slash_commands" | "interactive";

export type SlackEventListenerFn<EventType extends SlackEventTypes> = (
  args: SlackEventListenerFnArgs<EventType>
) => Promise<void>;

export type Ack = ({ text }?: { text: string }) => Promise<void>;

export type SlackEvent = {
  client_msg_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  team: string;
  blocks: Block[];
  channel: string;
  event_ts: string;
  channel_type: string;
};

export type SlackBotEvent = {
  bot_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  app_id: string;
  team: string;
  bot_profile: {
    id: string;
    deleted: boolean;
    name: string;
    updated: number;
    app_id: string;
    icons: any[];
    team_id: string;
  };
  blocks: Block[];
  channel: string;
  event_ts: string;
  channel_type: string;
};

export type SlackEventListenerFnArgs<EventType extends SlackEventTypes> =
  EventType extends "slash_commands"
    ? SlackCommandListenerArgs
    : EventType extends "message"
    ? SlackMessageListenerArgs
    : EventType extends "interactive"
    ? SlackViewSubmissionListenerArgs
    : { event: any; body: any; ack: Ack };

export type SlackCommandListenerArgs = {
  body: {
    token: string;
    team_id: string;
    team_domain: string;
    channel_id: string;
    channel_name: string;
    user_id: string;
    user_name: string;
    command: string;
    text: string;
    api_app_id: string;
    is_enterprise_install: string;
    response_url: string;
    trigger_id: string;
  };
  ack: Ack;
};

export type SlackMessageListenerArgs = {
  event: SlackEvent | SlackBotEvent;
  body: {
    token: string;
    team_id: string;
    api_app_id: string;
    event: SlackEvent | SlackBotEvent;
    type: string;
    event_id: string;
    event_time: number;
    authorizations: any;
    is_ext_shared_channel: boolean;
    event_context: string;
  };
  ack: Ack;
};

export type SlackInteractiveModalBody = {
  type: "view_submission" | "modal";
  team: { id: string; domain: string };
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  api_app_id: string;
  token: string;
  trigger_id: string;
  view: {
    id: string;
    team_id: string;
    type: string;
    blocks: Block[];
    private_metadata: string;
    callback_id: string;
    state: {
      values: {
        [blockId: string]: {
          [randomValue: string]: { type: string; value: string };
        };
      };
    };
    hash: string;
    title: any;
    clear_on_close: false;
    notify_on_close: false;
    close: any;
    submit: any;
    previous_view_id: null;
    root_view_id: string;
    app_id: string;
    external_id: string;
    app_installed_team_id: string;
    bot_id: string;
  };
  response_urls: [];
  is_enterprise_install: false;
  enterprise: null;
};

export type SlackInteractiveButtonBody = {
  type: "block_actions";
  user: {
    id: string;
    username: string;
    name: string;
    team_id: string;
  };
  api_app_id: string;
  token: string;
  container: {
    type: string;
    message_ts: string;
    channel_id: string;
    is_ephemeral: false;
  };
  trigger_id: string;
  team: { id: string; domain: string };
  enterprise: null;
  is_enterprise_install: false;
  channel: { id: string; name: string };
  message: {
    bot_id: string;
    type: string;
    text: string;
    user: string;
    ts: string;
    app_id: string;
    team: string;
    blocks: Block[];
  };
  state: { values: {} };
  response_url: string;
  actions: {
    action_id: string;
    block_id: string;
    text: {
      type: string;
      text: string;
      emoji: true;
    };
    value: string;
    type: string;
    action_ts: string;
  }[];
};

export type SlackViewSubmissionListenerArgs = {
  body: SlackInteractiveModalBody | SlackInteractiveButtonBody;
  ack: Ack;
};
