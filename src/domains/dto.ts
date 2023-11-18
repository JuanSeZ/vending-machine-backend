import { VendingMachine} from "@prisma/client";
import {ProductModel, VendingMachineModel} from "@model/model";

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
}

