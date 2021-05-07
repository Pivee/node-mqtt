import * as mqtt from "mqtt";

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  const interval = 5000;
  let timeCounter = 0;

  setInterval(() => {
    timeCounter = timeCounter + interval / 1000;
    client.publish("hello", `Hello World! (${timeCounter}s).`);
  }, interval);
});
