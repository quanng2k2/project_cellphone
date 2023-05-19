// import Category from "../model/category";
// import instance from "./instance";

import Category from "../model/category"
import instance from "./instance"


export const add_Category = (category: Category) => {
    return instance.post("/categories", category)
}

export const edit_Category = (category: Category, id:number) => {
    return instance.patch(`/categories/${id}`, category)
}


