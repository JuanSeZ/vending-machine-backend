import {CreateProductDto, ProductDto, VendingMachineDto} from "@domains/dto";

export interface Service {
    createProduct: (data: CreateProductDto) => Promise<ProductDto>;
    getAll: () => Promise<VendingMachineDto[]>;
    getByName: (name: string) => Promise<VendingMachineDto | null>;
}
