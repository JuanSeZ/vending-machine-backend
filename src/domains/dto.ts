import {HistoryModel, ProductHistoryModel, ProductModel, VendingMachineModel} from "@model/model";

export class CreateProductDto {
    name: string;
    price: number;
    quantity: number;
    vendingMachineId: string;

    constructor(name: string, price: number, quantity: number, vendingMachineId: string) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.vendingMachineId = vendingMachineId;
    }
}

export class ProductDto {
    id: string;
    name: string;
    price: number;
    quantity: number;

    constructor(product:  ProductModel) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    static createFromProduct(product:  ProductModel): ProductDto {
        return new ProductDto(product);
    }
}
export class VendingMachineDto {
    constructor(vendingMachine: VendingMachineModel) {
        this.id = vendingMachine.id;
        this.name = vendingMachine.name;
        this.products = vendingMachine.products.map(product => ProductDto.createFromProduct(product));
    }


    id: string;
    name: string;
    products: ProductDto[];
    credit = 0;
}

export class ProductHistoryDto {
    name: string;
    price: number;
    quantitySold: number;

    constructor(name: string, price: number, quantitySold: number) {
        this.name = name;
        this.price = price;
        this.quantitySold = quantitySold;
    }

    static createFromProductHistory(product: ProductHistoryModel) {
        return new ProductHistoryDto(product.name, product.price, product.quantitySold);
    }
}

export class HistoryDto {
    constructor(history: HistoryModel) {
        this.id = history.id;
        this.name = history.name;
        this.products = history.products.map(product => ProductHistoryDto.createFromProductHistory(product));
    }

    id: string;
    name: string;
    products: ProductHistoryDto[];
    totalIncome = 0;
}

