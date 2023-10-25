import {Repository} from "@domains/repository";
import {Db, MongoClient} from "mongodb";
import Product from "@domains/model";

export class RepositoryImpl implements Repository {
    constructor(private readonly db: Db ) {}

    async create(data: Product): Promise<Product> {
        const result = await this.db.collection('products').insertOne(data);
        return new Product(data.name, data.price, data.stock, result.insertedId);
    }

    async getAll(): Promise<Product[]> {
        const products = await this.db.collection('products').find().toArray();
        return products.map(product => new Product(product.name, product.price, product.stock, product._id));
    }

    async getByName(name: string): Promise<Product | null> {
        const product = await this.db.collection('products').findOne({name});
        return product ? new Product(product.name, product.price, product.stock, product._id) : null;
    }
}
