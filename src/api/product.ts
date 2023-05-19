import Product from "../model/product";
import instance from "./instance";

export const add_Product = (product: Product) => {
    return instance.post("/products", product)
}

export const edit_Product = (product: Product, id:number) => {
    return instance.patch(`/products/${id}`, product)
}

export const getProducts = () => {
    return instance.get("/products")
}

// export const add_products_Node = (products: Product) => {
//     return instance.post("/products", products)
// }