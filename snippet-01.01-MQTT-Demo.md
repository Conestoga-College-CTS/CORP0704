# Hands-On Activity - MQTT 

1. Install HiveMQ using Docker

```bash
docker run -d --name hivemq -p 6883:1883 -p 8000:8000 hivemq/hivemq-ce

docker run -d --name hivemq -p 6883:1883 -p 8000:8000 -v $(pwd)/logback.xml:/opt/hivemq/conf/logback.xml hivemq/hivemq-ce
```

2. Install Mosquitto using Docker

```bash
docker run -d --name mosquitto -p 5884:1883 eclipse-mosquitto
```

Get the IP address of hivemq:
```bash
docker inspect hivemq
```

3. Demonstrate Simple Publishing and Subscribing
Open two separate terminal sessions for the subscriber and the publisher.

Subscriber:
```bash
docker exec -it mosquitto mosquitto_sub -h 172.17.0.2 -i 'subscriber1' -t 'plant_1/line_2/motor_1/temperature'
```

Publisher:
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_1/temperature' -m '35 deg.C'
```

4. Demonstrate Topic Wildcard

Use + for single-level wildcard

Subscribe using wildcard:
```bash
docker exec -it mosquitto mosquitto_sub -h 172.17.0.2 -i 'subscriber1' -t 'plant_1/line_2/+/temperature'
```

Publish 
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_3/temperature'  -m '35 deg.C'

docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_4/temperature'  -m '49.12 deg.C'

docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_3/motor_4/temperature'  -m '18.12 deg.C'

docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_4/run_time'  -m '0 min'
```

Use # for multi-level wildcard

Subscribe using wildcard:
```bash
docker exec -it mosquitto mosquitto_sub -h 172.17.0.2 -i 'subscriber1' -t 'plant_1/line_2/#'
```

Publish 
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_3/temperature'  -m '35 deg.C'

docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_4/temperature'  -m '49.12 deg.C'

docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_3/motor_4/temperature'  -m '18.12 deg.C'

docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_3/motor_4/run_time'  -m '0 min'
```

5. Demonstrate QoS 0, 1, 2 Messages
Use the -q option in mosquitto_pub and mosquitto_sub commands to specify QoS levels.

QoS 0 (At most once):
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_1/temperature' -m 'QoS 0 message' -q 0
```

QoS 1 (At least once):
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_1/temperature' -m 'QoS 1 message' -q 1
```

QoS 2 (Exactly once):
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'plant_1/line_2/motor_1/temperature' -m 'QoS 2 message' -q 2
```

Change QoS when subscribing from MQTTX app.

6. Demonstrate LWT (Last Will and Testament)

Set up LWT when connecting:
```bash
docker exec -it mosquitto mosquitto_sub -h 172.17.0.2 -i 'subscriber1' -t 'test/lwt' --will-topic 'test/lwt' --will-payload 'Disconnected' --will-qos 2
```


Disconnect ungracefully to trigger LWT:
```bash
docker stop mosquitto
```

8. Demonstrate Retained Messages

Publish a retained message:
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'test/retain' -m 'Retained Message' -r
```
To clear, publish an empty retained message:

```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -t 'test/retain' -n -r
```

9. Persistence Session

Connect with clean session set to false and subscribe to a topic (-c : disable clean session/enable persistent client mode)
```bash
docker exec -it mosquitto mosquitto_sub -h 172.17.0.2 -i 'persistent_subscriber' -t 'test/persist' -c -q 2
```

Publish
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'test/persist' -m 'A new message' -c -q 2
```

Disconnect subscriber and publish another message
```bash
docker exec -it mosquitto mosquitto_pub -h 172.17.0.2 -i 'publisher1' -t 'test/persist' -m 'A new message' -c -q 2
```

Connect again
```bash
docker exec -it mosquitto mosquitto_sub -h 172.17.0.2 -i 'persistent_subscriber' -t 'test/persist' -c -q 2
```




