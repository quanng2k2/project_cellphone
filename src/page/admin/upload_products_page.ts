import axios from "axios"
import { upload_Image } from "../../api/image"
import { add_Product, edit_Product } from "../../api/product"
import header_admin from "../../layout/admin/header"
import menu_admin from "../../layout/admin/menu_admin"

import "../../publics/css/admin/add_product_page.css"

const edit_products_page = {
    async render(id:number) {
        const products = await axios.get(`http://localhost:3001/products/${id}?_expand=category`)
        const data_products = products.data
        console.log(data_products)

        const categories = await axios.get("http://localhost:3001/categories")
        const data_category = categories.data

        return /*html*/`
        <div class="home_page">
    <div class="header_admin">
        ${header_admin.render()}
    </div>
    <div class="container_admin">
        <div class="nav col-2">
            ${menu_admin.render()}
        </div>
        <div class="article col-10">
            <h5>Thêm mới sản phẩm</h5>
            <div class="images_products col-4">
                <input type="file" name="file" id="file" class="input_file" />
                <label for="file">
                    <img width="100%" class="review_img_edit" src="${data_products.image}" />
                </label>
                <img width="100%" class="review_img" />
                <textarea class="sort_desc" cols="50" rows="3" placeholder="Mô tả ngắn">${data_products.desc_sort}</textarea>
            </div>
            <div class="info_products col-8">
                <p>Thông tin sản phẩm</p>
                <hr>
                <div>
                    <p>Tên sản phẩm:</p>
                    <input type="text" value="${data_products.name}" class="name_poducts">
                </div>
                <div class="price">
                    <div class="col-6">
                        <p>Giá gốc:</p>
                        <input value="${data_products.price}" type="number" class="price_poducts">
                    </div>
                    <div class="col-6">
                        <p>Giá khuyến mãi:</p>
                        <input value="${data_products.price_sale}" type="number" class="price_sale">
                    </div>
                </div>
                <div class="col-6">
                    <p>Danh mục:</p>
                    <select class="categories_id">
                        <option value="" selected></option>
                        ${data_category.map((item:any) => {
                            return /*html*/ `
                                <option value="${item.id}">${item.name}</option>
                            `
                        })}
                    </select>
                </div>
                <div>
                    <p>Đặc điểm nổi bật:</p>
                    <textarea class="desc_pro_info" cols="30" rows="3">${data_products.feature}</textarea>
                </div>
                <div>
                    <p>Mô tả sản phẩm:</p>
                    <textarea class="desc_products" cols="30" rows="4">${data_products.desc_products}</textarea>
                </div>
                <button class="btn_save_products">Lưu chỉnh sửa</button>
            </div>
        </div>
    </div>`
    }, async afterRender(id:number) {
        const btn_save = document.querySelector(".btn_save_products")

        const input_file = document.querySelector(".input_file")
        const name_product = document.querySelector(".name_poducts")
        const price_product = document.querySelector(".price_poducts")
        const price_sale_product = document.querySelector(".price_sale")
        const categories_id = document.querySelector(".categories_id")
        const desc_pro_info = document.querySelector(".desc_pro_info")
        const desc_sort = document.querySelector(".sort_desc")
        const desc_products = document.querySelector(".desc_products")
        const images_review = document.querySelector(".review_img_edit")?.getAttribute("src")

        console.log(images_review)
        
        const review_images = document.querySelector(".review_img")


        btn_save?.addEventListener("click", async (e) => {

            async function url() {
                if (input_file.files[0]) {
                    if(input_file.files[0].size < 5000000){
                        const response = await upload_Image(input_file.files[0]);
                        return response.data.url
                        // console.log(response.data.url)
                    }
                } else {
                    return images_review
                }
            }


            const new_product = {
                name: name_product.value,
                image: await url(),
                price: price_product.value,
                price_sale: price_sale_product.value,
                categoryId: +categories_id.value,
                desc_sort: desc_sort.value,
                desc_products: desc_products.value,
                feature: desc_pro_info.value
            }

            const new_data = await edit_Product(new_product, id)
            console.log(new_data)

            if(new_data){
                alert("Chỉnh sửa sản phẩm thành công!");
                location.href = "/admin"
            }
        })
    }
}

export default edit_products_page


