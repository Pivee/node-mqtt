import { MqttClient } from "./client/client";

const client = new MqttClient("mqtt://localhost:1883");

function publishHelloWorldMessage() {
  const interval = 5000;
  let timeCounter = 0;

  setInterval(() => {
    timeCounter = timeCounter + interval / 1000;

    const message = `Hello World! (${timeCounter}s).`;

    client.publish("hello", message, { logging: true });
  }, interval);
}

publishHelloWorldMessage();
