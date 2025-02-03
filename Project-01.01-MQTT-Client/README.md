# MQTT Sensor Data Publisher and Subscriber

This project contains two Node.js scripts for simulating and receiving sensor data using MQTT. One script simulates sensor data and publishes it to an MQTT broker, while the other subscribes to that broker to receive and display the data.

## Features

- Sensor Data Simulation: Simulates random sensor data (temperature and humidity).
- MQTT Integration: Uses MQTT protocol to send and receive sensor data.
- Interval Publishing: Sends new data every 5 seconds.

## Prerequisites

Ensure you have installed the latest version of [Node.js](https://nodejs.org/).

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory and install the dependencies:

    ```bash
    npm install
    ```

3. Run the sensor data receiver program:

    ```bash
    npm start receiver
    ```

    or 

    ```bash
    node receiveSensorData.js
    ```

4. Run the sensor data sender program:

    ```bash
    npm start sender
    ```

    or 

    ```bash
    node sendSensorData.js
    ```