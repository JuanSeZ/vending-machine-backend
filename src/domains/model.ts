import {ObjectId} from "mongodb";

export default class Product {
    public readonly id?: ObjectId;
    public readonly name: string;
    public readonly price: number;
    public readonly stock: number;

    constructor(name: string, price: number, stock: number, id?: ObjectId) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.id = id;
    }
}
