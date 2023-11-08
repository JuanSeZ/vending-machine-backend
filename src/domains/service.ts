import {CreateProductDto, ProductDto, VendingMachineDto} from "./dto";

export interface Service {
    createProduct: (data: CreateProductDto) => Promise<ProductDto>;
    getAll: () => Promise<VendingMachineDto[]>;
    getByName: (name: string) => Promise<VendingMachineDto | null>;
    createVendingMachine: (name: string) => Promise<VendingMachineDto>;
}
