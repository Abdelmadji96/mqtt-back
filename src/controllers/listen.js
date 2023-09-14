import { io } from '../app.js';
import { mqttClient } from '../config/connectToBroker.js';


const getMessages = async (req, res, next) => {
  try {
    mqttClient.on("message", (topic, message, packet) => {
      console.log(
        "Received Message: " + message.toString() + "\nOn topic: " + topic,
      );
      io.emit('messages', message.toString()); // send messages to client side (device)
    });
  } catch (error) {
    return console.log('Error when getMessages', error);
  }
};
const subscribeToTopic = async (req, res, next) => {
  const { params: { id } } = req;
  mqttClient.subscribe(`/test/${id}/events`, { qos: 0 });
  next();
};

export {
  subscribeToTopic,
  getMessages,
};
