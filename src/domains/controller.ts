import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
import {Service} from "./service";
import {ServiceImpl} from "./service.impl";
import {RepositoryImpl} from "./repository.impl";
import mongoose from "mongoose";


export const router = Router()

startMongoose().then(() => {
    console.log('Connected to database')
    const service: Service = new ServiceImpl(new RepositoryImpl())


    router.get('/', async (req: Request, res: Response) => {

        const posts = await service.getAll();
        return res.status(HttpStatus.OK).json(posts)

    })

    router.get('/:name', async (req: Request, res: Response) => {
        const {name} = req.params

        const post = await service.getByName(name)

        return res.status(HttpStatus.OK).json(post)
    })

    router.post('/:name', async (req: Request, res: Response) => {
        const {name} = req.params

        const vendingMachineDto = await service.createVendingMachine(name)

        return res.status(HttpStatus.CREATED).json(vendingMachineDto)
    })

    router.post('/vending/:name', async (req: Request, res: Response) => {
        const {name} = req.params

        const vendingMachineDto = await service.restockVendingMachine(name)

        return res.status(HttpStatus.CREATED).json(vendingMachineDto)
    })

    router.delete('/:name', async (req: Request, res: Response) => {
        const {name} = req.params
        await service.deleteVendingMachine(name)

        return res.status(HttpStatus.OK)
    })


    router.post('/:vendingMachineName/:productName', async (req: Request, res: Response) => {
        const {vendingMachineName, productName} = req.params

        const vendingMachineDto = await service.deleteProduct(vendingMachineName, productName)

        return res.status(HttpStatus.CREATED).json(vendingMachineDto)
    })


}).catch((err) => {
    console.log(err)
    process.exit(1)
});
async function startMongoose() {
    await mongoose.connect(process.env.DATABSE_URL || 'mongodb://admin:admin@107.21.196.254:27017/vending-machine-db');
}
