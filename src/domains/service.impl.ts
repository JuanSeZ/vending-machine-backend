import {Service} from "@domains/service";
import {CreateProductDto, ProductDto, VendingMachineDto} from "@domains/dto";
import {Repository} from "@domains/repository";

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
}
