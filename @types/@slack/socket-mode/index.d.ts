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
}
