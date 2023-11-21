import mongoose, { Document, Schema } from 'mongoose';

export interface ProductModel extends Document {
    name: string;
    price: number;
    quantity: number;
}

const productSchema = new Schema<ProductModel>({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const Product = mongoose.model<ProductModel>('Product', productSchema);

export { Product };

export interface VendingMachineModel extends Document {
    name: string;
    products: ProductModel[];
}

const vendingMachineSchema = new Schema<VendingMachineModel>({
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const VendingMachine = mongoose.model<VendingMachineModel>('VendingMachine', vendingMachineSchema);

export { VendingMachine };

export interface ProductHistoryModel extends Document {
    name: string;
    price: number;
    quantitySold: number;
}

const productHistorySchema = new Schema<ProductHistoryModel>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantitySold: { type: Number, required: true },
});

const ProductHistory = mongoose.model<ProductHistoryModel>('ProductHistory', productHistorySchema);

export { ProductHistory };

export interface HistoryModel extends Document {
    name: string;
    products: ProductHistoryModel[];
}

const historySchema = new Schema<HistoryModel>({
    name: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'ProductHistory' }],
});

const History = mongoose.model<HistoryModel>('History', historySchema);

export { History };
