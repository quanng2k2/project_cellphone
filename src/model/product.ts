class Product {
    name: string;
    price: number;
    image: string;
    price_sale?: number;
    categoryId?: number;
    feature?: string;
    desc_products?: string;
    sort_desc_products?: string;
    constructor(
        name: string,
        price: number,
        image: string,
        price_sale?:number,
        categoryId?: number,
        feature?: string,
        desc_products?: string,
        sort_desc_products?: string
    ) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.price_sale = price_sale;
        this.categoryId = categoryId;
        this.feature = feature;
        this.desc_products = desc_products;
        this.sort_desc_products = sort_desc_products;
    }
}

export default Product