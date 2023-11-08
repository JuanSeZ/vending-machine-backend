import {Service} from "./service";
import {CreateProductDto, ProductDto, VendingMachineDto} from "./dto";
import {Repository} from "./repository";


export class ServiceImpl implements Service {
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
}
