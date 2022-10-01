import EventEmitter from "eventemitter3";
import { AppsConnectionsOpenResponse, Block } from "@slack/web-api";
import { SocketModeOptions } from "@slack/socket-mode";

declare module "@slack/socket-mode" {
  /**
   * An Socket Mode Client allows programs to communicate with the
   * [Slack Platform's Events API](https://api.slack.com/events-api) over WebSocket connections.
   * This object uses the EventEmitter pattern to dispatch incoming events
   * and has a built in send method to acknowledge incoming events over the WebSocket connection.
   */
  export class SocketModeClient extends EventEmitter {
    /**
     * Whether or not the client is currently connected to the web socket
     */
    connected: boolean;
    /**
     * Whether or not the client has authenticated to the Socket Mode API.
     * This occurs when the connect method completes,
     * and a WebSocket URL is available for the client's connection.
     */
    authenticated: boolean;
    /**
     * Returns true if the underlying WebSocket connection is active.
     */
    isActive(): boolean;
    /**
     * The underlying WebSocket client instance
     */
    websocket: any;
    constructor({
      logger,
      logLevel,
      autoReconnectEnabled,
      pingPongLoggingEnabled,
      clientPingTimeout,
      serverPingTimeout,
      appToken,
      clientOptions,
    }?: SocketModeOptions);
    /**
     * Start a Socket Mode session app.
     * It may take a few milliseconds before being connected.
     * This method must be called before any messages can be sent or received.
     */
    start(): Promise<AppsConnectionsOpenResponse>;
    /**
     * End a Socket Mode session. After this method is called no messages will be sent or received
     * unless you call start() again later.
     */
    disconnect(): Promise<void>;
    protected onWebSocketMessage({ data }: { data: string }): Promise<void>;

    /**
     * @@@@@@ custom typings @@@@@@
     */

    /** listening event */
    on<T extends SlackEventTypes>(
      event: T,
      fn: SlackEventListenerFn<T>,
      context?: any
    ): this;
  }

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

  export type SlackInteractiveBody = {
    type: string;
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
      state: any;
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

  export type SlackViewSubmissionListenerArgs = {
    body: SlackInteractiveBody;
    ack: Ack;
  };
}
