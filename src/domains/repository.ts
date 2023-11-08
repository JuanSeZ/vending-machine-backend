import {CreateProductDto, ProductDto, VendingMachineDto} from "./dto";

export interface Repository {
    createProduct: (data: CreateProductDto) => Promise<ProductDto>;
    getAll: () => Promise<VendingMachineDto[]>;
    getByName: (name: string) => Promise<VendingMachineDto | null>;
    createVendingMachine: (name: string) => Promise<VendingMachineDto>;
}
