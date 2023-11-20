import * as mqtt from "mqtt";
import * as process from "process";
import {ServiceImpl} from "../domains/service.impl";
function mosquittoStart(service: ServiceImpl) {

 const client = mqtt.connect(process.env.MQTT_URL || '');

 client.subscribe("vending-machine");
 client.subscribe("vending-machine-restock");
 client.subscribe("vending-machine-credit")

 client.on('message', async (topic, message) => {

     if (topic === "vending-machine") {
         const data = JSON.parse(message.toString());
         const vendingMachineDto = await service.deleteProduct("Vending Machine",data.name)
         console.log(vendingMachineDto)
     }
     if (topic === "vending-machine-restock") {
         const data = JSON.parse(message.toString());
         const vendingMachineDto = await service.restockVendingMachine("Vending Machine")
         console.log(vendingMachineDto)
     }
     if (topic === "vending-machine-credit") {
         const data = JSON.parse(message.toString());
         console.log(data)
         service.credit += data.credit
     }

 })
}
