import {CreateProductDto, ProductDto, VendingMachineDto} from "@domains/dto";

export interface Repository {
    createProduct: (data: CreateProductDto) => Promise<ProductDto>;
    getAll: () => Promise<VendingMachineDto[]>;
    getByName: (name: string) => Promise<VendingMachineDto | null>;
}
