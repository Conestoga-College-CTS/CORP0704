# IoT Device Temperature Simulator

This project simulates IoT devices sending temperature data over MQTT. Each simulated device sends temperature data in either Celsius, Fahrenheit, or Kelvin at configurable intervals. The simulation includes the ability to generate out-of-bound temperature values to mimic faulty sensors.

docker run -d -p 3883:1883 --name hmq hivemq/hivemq-ce   

## Features

- Simulates multiple IoT devices sending temperature data.
- Configurable temperature units (Celsius, Fahrenheit, Kelvin).
- Configurable normal and out-of-bound temperature ranges for each unit.
- Configurable probability for generating out-of-bound temperature values.
- Temperature data includes value, unit, and timestamp.

## Prerequisites

Ensure you have installed the latest version of [Node.js](https://nodejs.org/).

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory and install the dependencies:

    ```bash
    npm install
    ```

3. Run the simulator:

    ```bash
    npm start
    ```

## Configuration

Modify the `config.json` file to set up your simulation parameters:

- `mqttServer`: The address of your MQTT broker.
- `topicBase`: The base MQTT topic for publishing temperature data. Use `device_id` as a placeholder for the device ID.
- `numberOfDevices`: The number of simulated IoT devices.
- `publishInterval`: The interval at which each device sends data (in cron format).
- `outOfBoundRate`: The probability of generating out-of-bound temperature values.
- `temperatureSettings`: Temperature ranges and out-of-bound limits for each unit (Celsius, Fahrenheit, Kelvin).

Example `config.json`:

```json
{
  "mqttServer": "mqtt://localhost:1883",
  "topicBase": "device_id/temperature/",
  "numberOfDevices": 5,
  "publishInterval": "*/5 * * * * *",
  "outOfBoundRate": 0.1,
  "temperatureSettings": {
    "C": {
      "normalRange": [10, 50],
      "outOfBoundRange": [-100, -50]
    },
    "F": {
      "normalRange": [14, 122],
      "outOfBoundRange": [-212, -58]
    },
    "K": {
      "normalRange": [263.15, 323.15],
      "outOfBoundRange": [-373.15, -223.15]
    }
  }
}
