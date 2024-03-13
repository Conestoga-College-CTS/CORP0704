USE iotdb;
CREATE TABLE IF NOT EXISTS sensor_data (
    timestamp DATETIME,
    device_id VARCHAR(50),
    value DECIMAL(10, 2),
    unit VARCHAR(10)
);