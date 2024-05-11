const mqtt = require('mqtt');
const schedule = require('node-schedule');
const config = require('./config.json');

// Function to generate temperature within a specified range
function generateTemperature(min, max) {
  return min + Math.random() * (max - min);
}

// Function to generate temperature data based on the config
function generateTemperatureData() {
  // Define temperature units and select one randomly
  const units = Object.keys(config.temperatureSettings);
  const unit = units[Math.floor(Math.random() * units.length)];

  // Decide if the value should be out of bound based on outOfBoundRate
  const outOfBound = Math.random() < config.outOfBoundRate;
  const range = outOfBound ? config.temperatureSettings[unit].outOfBoundRange : config.temperatureSettings[unit].normalRange;

  // Generate temperature value within the specified range
  const temperature = generateTemperature(range[0], range[1]);

  return { temperature, unit };
}

// Function to simulate a device
function simulateDevice(deviceId) {
  const { temperature, unit } = generateTemperatureData();
  const payload = {
    // convet to 2 decimal places in number
    value: Number.parseFloat(temperature.toFixed(2)),
    unit: unit,
    timestamp: new Date().toISOString()
  };

  const client = mqtt.connect(config.mqttServer);
  client.on('error', (error) => {
    console.error(`Device ${deviceId} error: ${error}`);
  });
  client.on('connect', () => {
    const topic = config.topicBase.replace('device_id', deviceId);
    client.publish(topic, JSON.stringify(payload), () => {
      console.log(`Device ${deviceId} published: ${JSON.stringify(payload)}`);
      client.end();
    });
  });
}

// Schedule device simulation
schedule.scheduleJob(config.publishInterval, () => {
  for (let i = 1; i <= config.numberOfDevices; i++) {
    simulateDevice(`device_${i}`);
  }
});
