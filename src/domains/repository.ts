import {CreateProductDto, HistoryDto, ProductDto, VendingMachineDto} from "./dto";

export interface Repository {
    createProduct: (data: CreateProductDto) => Promise<ProductDto>;
    getAll: () => Promise<VendingMachineDto[]>;
    getByName: (name: string) => Promise<VendingMachineDto | null>;
    createVendingMachine: (name: string) => Promise<VendingMachineDto>;
    deleteVendingMachine: (name: string) => Promise<void>;
    restockVendingMachine: (name: string) => Promise<VendingMachineDto>;
    deleteProduct: (vendingMachineName: string, productName: string) =>  Promise<VendingMachineDto>;
    getHistory: (vendingMachineName: string) => Promise<HistoryDto>;
}
