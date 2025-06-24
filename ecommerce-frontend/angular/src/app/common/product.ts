export class Product {

    constructor(
        public sku: string,
        public name: string,
        public description: string,
        public imageUrl: string,
        public id: number,
        public unitPrice: number,
        public unitsInStock: number,
        public active: boolean,
        public createdAt: Date,
        public modifiedAt: Date,
    ) { 
    }
}
