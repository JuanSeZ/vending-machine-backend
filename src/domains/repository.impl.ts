import { Repository } from "./repository";
import { Model } from "mongoose";
import { CreateProductDto, ProductDto, VendingMachineDto } from "./dto";
import { Product, ProductModel, VendingMachine, VendingMachineModel } from '../model/model';

export class RepositoryImpl implements Repository {
    constructor() {}

    async createProduct(data: CreateProductDto): Promise<ProductDto> {
        const product = new Product({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            vendingMachineId: data.vendingMachineId,
        });
        await product.save();
        return Promise.resolve(new ProductDto(product));
    }


    async getAll(): Promise<VendingMachineDto[]> {
        const vendingMachines: VendingMachineModel[] = await VendingMachine
            .find()
            .populate("products")
            .exec();

        return Promise.resolve(
            vendingMachines.map(
                (vendingMachine) => new VendingMachineDto(vendingMachine)
            )
        );
    }

    async getByName(name: string): Promise<VendingMachineDto | null> {
        const vendingMachine: VendingMachineModel | null = await VendingMachine
            .findOne({ name: name })
            .populate("products")
            .exec();

        if (vendingMachine) {
            return Promise.resolve(new VendingMachineDto(vendingMachine));
        }

        return Promise.resolve(null);
    }

    async createVendingMachine(name: string): Promise<VendingMachineDto> {
        const vendingMachine = await VendingMachine.create({
            name: name,
        });

        return Promise.resolve(new VendingMachineDto(vendingMachine));
    }
}
