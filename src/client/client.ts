import * as mqtt from "mqtt";
import { v4 as generateUuid } from "uuid";

export class MqttClient {
  private id: string;
  private broker;
  private client: mqtt.Client;
  private topics: string[] = [];
  private controllers: IController[] = [];

  constructor(
    url: string,
    {
      topics,
      controllers,
    }: { topics?: string[]; controllers?: IController[] } = {}
  ) {
    this.id = generateUuid().split("-")[0];

    this.broker = url;

    if (topics) this.topics = topics;
    if (controllers) this.controllers = controllers;

    this.client = mqtt.connect(this.broker);
  }

  publish(topic: string, message: any, { logging = false } = {}) {
    this.client.publish(topic, message);
    if (logging) this.logPublishedMessage(topic, message);
  }

  subscribe({ logging = false } = {}) {
    this.topics.forEach((topic) => {
      this.subscribeToTopic(topic, { logging });
    });

    this.controllers.forEach((controller) => {
      this.client.on("message", controller);
    });
  }

  private subscribeToTopic(topic: string, { logging = false } = {}) {
    this.client.on("connect", () => {
      this.client.subscribe(topic);
      if (logging) this.logSubscribedTopic(topic);
    });
  }

  private logSubscribedTopic(topic: string) {
    console.debug(`Client (${this.id}) subscribed to ${this.broker}/${topic}`);
  }

  private logPublishedMessage(topic: string, message: any) {
    console.debug(
      `Client (${this.id}) published to ${this.broker}/${topic}\nMessage:\n`,
      message,
      "\n"
    );
  }
}
