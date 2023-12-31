import { Request, Response, Router } from 'express'
import HttpStatus from 'http-status'
import {Service} from "./service";
import {ServiceImpl} from "./service.impl";
import {RepositoryImpl} from "./repository.impl";
import { PrismaClient } from '@prisma/client';


export const router = Router()

// Use dependency injection
const db = new PrismaClient()
const service: Service = new ServiceImpl(new RepositoryImpl(db))

service.createVendingMachine('Vending Machine 1');

router.get('/', async (req: Request, res: Response) => {

    const posts = await service.getAll();
    return res.status(HttpStatus.OK).json(posts)

})

router.get('/:name', async (req: Request, res: Response) => {
    const { name } = req.params

    const post = await service.getByName(name)

    return res.status(HttpStatus.OK).json(post)
})

router.post('/', async (req: Request, res: Response) => {
    const data = req.body

    const post = await service.createProduct(data)

    return res.status(HttpStatus.CREATED).json(post)
})
