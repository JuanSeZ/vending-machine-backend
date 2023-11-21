import * as mqtt from "mqtt";
import * as process from "process";
import {ServiceImpl} from "../domains/service.impl";
export function startMosquitto(service: ServiceImpl) {

 const client = mqtt.connect(process.env.MQTT_URL || 'mqtt://35.174.87.19:1883');

 client.subscribe("vending-machine");
 client.subscribe("vending-machine-restock");
 client.subscribe("vending-machine-credit")

 client.on('message', async (topic, message) => {
     if (topic === "vending-machine") {
         const data = JSON.parse(message.toString());
         const vendingMachineDto = await service.deleteProduct("Vending Machine",data.product)
         console.log(vendingMachineDto)
     }
     if (topic === "vending-machine-restock") {
         const vendingMachineDto = await service.restockVendingMachine("Vending Machine")
         console.log(vendingMachineDto)
     }
     if (topic === "vending-machine-credit") {
         service.credit += 50
         console.log(service.credit)
     }
 })
}
