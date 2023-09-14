import mqtt from 'mqtt';

export let mqttClient;

export const connectToBroker = () => {
  const clientId = "client" + Math.random().toString(36).substring(7);
  const hostURL = `${process.env.PROTOCOL}://${process.env.MQTT_HOST}:${process.env.PORT}`;

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(hostURL, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
  });
};

