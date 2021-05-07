import { MqttClient } from "./client/client";

const client = new MqttClient("mqtt://localhost:1883", {
  topics: ["hello"],
  controllers: [
    (topic: string, message: any) => {
      console.log(message.toString());
    },
  ],
});

client.subscribe({ logging: true });
