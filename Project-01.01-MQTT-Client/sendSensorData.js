import mqtt from 'mqtt';

// MQTT broker configuration
const brokerUrl = 'mqtt://broker.hivemq.com'; // Change to your broker's URL
const topic = 'sensor/data';

// Connect to the broker
const client = mqtt.connect(brokerUrl);

// Function to simulate sensor data
function generateSensorData() {
  return {
    temperature: (Math.random() * 30).toFixed(2),  // Random temperature between 0-30°C
    humidity: (Math.random() * 100).toFixed(2),  // Random humidity between 0-100%
    timestamp: new Date().toISOString()          // Timestamp in ISO format
  };
}

// Publish data every 5 seconds
client.on('connect', () => {
  console.log('Connected to broker');
  
  setInterval(() => {
    const sensorData = generateSensorData();
    console.log('Sending sensor data:', sensorData);
    client.publish(topic, JSON.stringify(sensorData));
  }, 5000);
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});
