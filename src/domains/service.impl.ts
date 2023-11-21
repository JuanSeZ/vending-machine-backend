import {Service} from "./service";
import {CreateProductDto, HistoryDto, ProductDto, VendingMachineDto} from "./dto";
import {Repository} from "./repository";
import {Promise} from "mongoose";


export class ServiceImpl implements Service {
    credit: number = 0;

    constructor (private readonly repository: Repository) {}
    createProduct(data: CreateProductDto): Promise<ProductDto> {
        return this.repository.createProduct(data);
    }

    async getAll(): Promise<VendingMachineDto[]> {
        const vendingMachines = await this.repository.getAll();
        vendingMachines.forEach(vendingMachine => {
            vendingMachine.credit = this.credit;
        });
        return vendingMachines;
    }

    getByName(name: string): Promise<VendingMachineDto | null> {
        return this.repository.getByName(name);
    }

    createVendingMachine(name: string): Promise<VendingMachineDto> {
        return this.repository.createVendingMachine(name);
    }

    async deleteVendingMachine(name: string): Promise<void> {
        await this.repository.deleteVendingMachine(name);
        return;
    }

    restockVendingMachine(name: string): Promise<VendingMachineDto> {
        return this.repository.restockVendingMachine(name);
    }

    async deleteProduct(vendingMachineName: string, productName: string): Promise<VendingMachineDto> {
        const product = await this.repository.getProductByName(productName);
        if (product) {
            if (this.credit >= product.price) {
                this.credit -= product.price;
                return this.repository.deleteProduct(vendingMachineName, productName);
            }
        }
        return await this.getAll().then(vendingMachines => {
            return vendingMachines.find(vendingMachine => vendingMachine.name === vendingMachineName);
        }
        ) as VendingMachineDto;
    }

    async getHistory(vendingMachineName: string): Promise<HistoryDto> {
        const history = await this.repository.getHistory(vendingMachineName);
        if (history) {
            history.totalIncome = this.calculateTotalIncome(history);
        }
        return history;
    }

    private calculateTotalIncome(history: HistoryDto): number {
        let totalIncome = 0;
        history.products.forEach(product => {
            totalIncome += product.quantitySold * product.price;
        });
        return totalIncome;
    }
}
