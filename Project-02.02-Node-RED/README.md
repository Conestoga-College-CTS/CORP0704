# Hands-On Activity - Node-RED


1. Install Node-RED

    Using Docker:

    ```
    docker run -it -p 1880:1880 -v node_red_data_vol:/data --name nr nodered/node-red
    ```

    Using npm:

    ```
    npm install -g node-red
    ```
    
    After installing node-red as a global package start node-red server by running:

    ```
    npx node-red
    ```

2. Creating Your First Flow 
    
    Import Flow-1-Basic.json to Node-RED workspace.

3. Debugging & Logging

    Import Flow-2-Logging_Debugging.json to Node-RED workspace.

    - Flow context variable and how to view and delete from UI sidebar
    - Log message on UI and console
    - Log message using console.log
    - Disable flow, disable node
    - Filter logs by flow and node

4. Enhancing Flows with Logic

    Import Flow-3-Temperature_Converter.json to Node-RED workspace.
    Import Flow-4-Multi_Conversion.json to Node-RED workspace.

5. Using Subflow
    
    Import Subflow-1-Temperature_Converter.json to Node-RED workspace.
    Import Flow-5-Using_Subflow.json to Node-RED workspace.

6. MQTT Integration
    
    Import Flow-6-MQTT_Integration.json to Node-RED workspace.
    Import Flow-7-MQTT_Unit Conversion.json to Node-RED workspace.
    - Show reading MQTT messages

7. MQTT Integration - Aggregation 

    Import Flow-8-MQTT_Aggregation.json to Node-RED workspace.
    - Calculate average temperature over a specific time
    - Add function to library


8. Database Integraton - Save MQTT data to 
  
    a. Get MySQL database as docker container
          
      ```
      docker run --name mysqldb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=iotdb -d mysql:latest
      ```

    b. Create a table in database

    ```
    docker cp table.sql mysqldb:/table.sql

    docker exec -it mysqldb mysql -uroot -ppassword < /create_table.sql

    docker exec -it mysqldb bash

    mysql -uroot -ppassword < /table.sql

    mysql -uroot -ppassword -e "USE iotdb; SHOW TABLES"
    ```

    c. Install Node-RED mysql plugin inside node-red docker
    
    ```
    docker exec -it nr npm install node-red-node-mysql
    ```

    d. Restart node-RED
    ```
    docker restart nr
    ```

    e. Import Flow-9-MQTT_to_DB.json to Node-RED workspace.

    f. Check data in database table

    ```
    docker exec -it mysqldb mysql -uroot -ppassword -e "USE iotdb; select * from sensor_data where device_id = 'device_1'"
    ```
10. LinkNode

    Import Flow-10-Link-Nodes.json to Node-RED workspace.


11. Dashboard

    a. Install Node-RED dashboard
            
      ```
      docker exec -it nr npm install node-red-dashboard
      ```

    b. Create a function to prepare data for a chart

      ```
      let topicParts = msg.topic.split('/');
      let deviceId = topicParts[0];
      console.log(msg);

      msg.timestamp = msg.payload.timestamp;
      msg.payload = msg.payload.value;

      msg.topic = deviceId;

      return msg;
      ```

    c. Add the chart node from Dashboard section to the flow, and wire the output of above function to its input.

    d. View dashboard from : http://localhost:1880/ui