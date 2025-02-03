import mqtt from 'mqtt';

// MQTT broker configuration
const brokerUrl = 'mqtt://broker.hivemq.com'; // Change to your broker's URL
const topic = 'sensor/data';

// Connect to the broker
const client = mqtt.connect(brokerUrl);

// Subscribe to the topic
client.on('connect', () => {
  console.log('Connected to broker');
  client.subscribe(topic, (err) => {
    if (err) {
      console.error('Failed to subscribe:', err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  try {
    const sensorData = JSON.parse(message.toString());
    console.log('Received sensor data:', sensorData);
  } catch (err) {
    console.error('Failed to parse message:', err);
  }
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});
