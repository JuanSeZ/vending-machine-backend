import { Repository } from "./repository";
import {Model, Promise} from "mongoose";
import { CreateProductDto, ProductDto, VendingMachineDto } from "./dto";
import { Product, ProductModel, VendingMachine, VendingMachineModel } from '../model/model';



export class RepositoryImpl implements Repository {
    constructor() {}

    async createProduct(data: CreateProductDto): Promise<ProductDto> {
        const product : ProductModel = new Product({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            vendingMachineId: data.vendingMachineId,
        });
        await product.save();
        return new ProductDto(product);
    }


    async getAll(): Promise<VendingMachineDto[]> {
        const vendingMachines: VendingMachineModel[] = await VendingMachine
            .find()
            .populate("products")
            .exec();

        return vendingMachines.map((vendingMachine) => new VendingMachineDto(vendingMachine));
    }


    async getByName(name: string): Promise<VendingMachineDto | null> {
        const vendingMachine: VendingMachineModel | null = await VendingMachine
            .findOne({ name: name })
            .populate("products")
            .exec();

        return vendingMachine ? new VendingMachineDto(vendingMachine) : null;
    }

    async createVendingMachine(name: string): Promise<VendingMachineDto> {
        // Step 1: Save Products
        const savedProducts = await Product.insertMany([
            {
                name: "Ibuprofen",
                price: 80,
                quantity: 10,
                vendingMachineId: null, // Provide a default value or handle this according to your logic
            },
            {
                name: "Aspirin",
                price: 70,
                quantity: 10,
                vendingMachineId: null,
            },
            {
                name: "Diphemhydramine",
                price: 90,
                quantity: 10,
                vendingMachineId: null,
            },
            {
                name: "Paracetamol",
                price: 50,
                quantity: 10,
                vendingMachineId: null,
            },
            {
                name: "Pepto Bismol",
                price: 60,
                quantity: 10,
                vendingMachineId: null,
            },
        ]);

        // Step 2: Get Product IDs
        const productIds = savedProducts.map((product) => product._id);

        // Step 3: Create VendingMachine with Product IDs
        const vendingMachine = await VendingMachine.create({
            name: name,
            products: productIds,
        });

        // Step 4: Update Product documents with the VendingMachine ID
        await Product.updateMany(
            { _id: { $in: productIds } },
            { vendingMachineId: vendingMachine._id }
        );

        return new VendingMachineDto(vendingMachine);
    }

    async deleteVendingMachine(name: string): Promise<void> {
        await VendingMachine.deleteMany();
    }

    async restockVendingMachine(name: string): Promise<VendingMachineDto> {
        const vendingMachine = await VendingMachine.findOne({name: name}).exec();
        if (vendingMachine) {
            vendingMachine.products.forEach(async (product) => {
                await Product.updateOne(
                    { _id: product },
                    { quantity: 10 }
                );
            });
         return new VendingMachineDto(vendingMachine);
        }
        return Promise.resolve(null);
    }

    async deleteProduct(vendingMachineName: string, productName: string): Promise<VendingMachineDto> {
        const vendingMachine = await VendingMachine.findOne({name: vendingMachineName}).exec();
        if(vendingMachine) {
        //      Reduce the quantity of the product by 1
            vendingMachine.products.forEach(async (product) => {
                const productModel = await Product.findById(product).exec();
                if (productModel && productModel.name === productName) {
                    if (productModel.quantity > 0) {
                        await Product.updateOne(
                            { _id: product },
                            { quantity: productModel.quantity - 1 }
                        );
                    }
                }
            });
            return new VendingMachineDto(vendingMachine);
        }
        return Promise.resolve(null);
    }

}
