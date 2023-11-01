import {Product, VendingMachine} from "@prisma/client";

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
    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class VendingMachineDto {
    constructor(vendingMachine: VendingMachineDto) {
        this.id = vendingMachine.id;
        this.name = vendingMachine.name;
        this.products = vendingMachine.products;
    }

    id: string;
    name: string;
    products: ProductDto[];
}

