import {Service} from "./service";
import {CreateProductDto, ProductDto, VendingMachineDto} from "./dto";
import {Repository} from "./repository";
import {Promise} from "mongoose";


export class ServiceImpl implements Service {
    credit: number = 0;

    constructor (private readonly repository: Repository) {}
    createProduct(data: CreateProductDto): Promise<ProductDto> {
        return this.repository.createProduct(data);
    }

    getAll(): Promise<VendingMachineDto[]> {
        return this.repository.getAll();
    }

    getByName(name: string): Promise<VendingMachineDto | null> {
        return this.repository.getByName(name);
    }

    createVendingMachine(name: string): Promise<VendingMachineDto> {
        return this.repository.createVendingMachine(name);
    }

    async deleteVendingMachine(name: string): Promise<void> {
        await this.repository.deleteVendingMachine(name);
        return
    }

    restockVendingMachine(name: string): Promise<VendingMachineDto> {
        return this.repository.restockVendingMachine(name);
    }

    deleteProduct(vendingMachineName: string, productName: string): Promise<VendingMachineDto> {
        return this.repository.deleteProduct(vendingMachineName, productName);
    }
}
