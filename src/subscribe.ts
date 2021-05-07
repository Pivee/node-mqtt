import * as mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  client.subscribe("hello");

  console.log("Client has subscribed");
});

client.on("message", (topic, message: any) => {
  console.log(message.toString());
});
