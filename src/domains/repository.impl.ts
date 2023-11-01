import {Repository} from "@domains/repository";
import { PrismaClient } from "@prisma/client";
import {CreateProductDto, ProductDto, VendingMachineDto} from "@domains/dto";

export class RepositoryImpl implements Repository {
    constructor(private readonly db: PrismaClient ) {}

    async createProduct(data: CreateProductDto): Promise<ProductDto> {
        const product = await this.db.product.create({
            data: {
                name: data.name,
                price: data.price,
                quantity: data.quantity,
                vendingMachineId: data.vendingMachineId
            }
        });
        return Promise.resolve(new ProductDto(product));
    }

    async getAll(): Promise<VendingMachineDto[]> {
        const vendingMachines = await this.db.vendingMachine.findMany({
            include: {
                products: true
            }
        });
        return Promise.resolve(vendingMachines.map(vendingMachine => new VendingMachineDto(vendingMachine)));
        }

    async getByName(name: string): Promise<VendingMachineDto | null> {
        const vendingMachine = await this.db.vendingMachine.findUnique({
            where: {
                name: name
            },
            include: {
                products: true
            }
        });
        if (vendingMachine) {
            return Promise.resolve(new VendingMachineDto(vendingMachine));
        }
        return Promise.resolve(null);
    }

}
