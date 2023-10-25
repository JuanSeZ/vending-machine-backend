import Product from "@domains/model";

export interface Repository {
    create: (data: Product) => Promise<Product>;
    getAll: () => Promise<Product[]>;
    getByName: (name: string) => Promise<Product | null>;
}
