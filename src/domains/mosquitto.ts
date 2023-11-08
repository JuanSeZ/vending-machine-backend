import * as mqtt from "mqtt";
import * as process from "process";
function mosquittoStart() {
 const client = mqtt.connect(process.env.MQTT_URL || '');

    client.on("connect", () => {
        client.subscribe("+", (err) => {
            if (!err) {
                console.log("Client connected");
            }
        });
    });
}
