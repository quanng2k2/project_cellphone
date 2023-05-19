import axios from "axios"
import { upload_Image } from "../../api/image"
import { add_Product, add_products_Node } from "../../api/product"
import header_admin from "../../layout/admin/header"
import menu_admin from "../../layout/admin/menu_admin"

import "../../publics/css/admin/add_product_page.css"

const add_products_page = {
    async render() {
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
                    <i class="fas fa-upload"></i>
                    <p>Thêm ảnh</p>
                </label>
                <img class="review_img" />
                <textarea class="sort_desc" cols="50" rows="3" placeholder="Mô tả ngắn"></textarea>
            </div>
            <div class="info_products col-8">
                <p>Thông tin sản phẩm</p>
                <hr>
                <div>
                    <p>Tên sản phẩm:</p>
                    <input type="text" class="name_poducts">
                </div>
                <div class="price">
                    <div class="col-6">
                        <p>Giá gốc:</p>
                        <input type="number" class="price_poducts">
                    </div>
                    <div class="col-6">
                        <p>Giá khuyến mãi:</p>
                        <input type="number" class="price_sale">
                    </div>
                </div>
                <div class="col-6">
                    <p>Danh mục:</p>
                    <select class="categories_id">
                        <option value="" selected></option>
                        ${data_category.map(item => {
                            return /*html*/ `
                                <option value="${item.id}">${item.name}</option>
                            `
                        })}
                    </select>
                </div>
                <div>
                    <p>Đặc điểm nổi bật:</p>
                    <textarea class="desc_pro_info" cols="30" rows="3"></textarea>
                </div>
                <div>
                    <p>Mô tả sản phẩm:</p>
                    <textarea class="desc_products" cols="30" rows="4"></textarea>
                </div>
                <button class="btn_save_products">Thêm mới</button>
            </div>
        </div>
    </div>`
    }, async afterRender() {
        const btn_save = document.querySelector(".btn_save_products")

        const input_file = document.querySelector(".input_file")
        const name_product = document.querySelector(".name_poducts")
        const price_product = document.querySelector(".price_poducts")
        const price_sale_product = document.querySelector(".price_sale")
        const categories_id = document.querySelector(".categories_id")
        const desc_pro_info = document.querySelector(".desc_pro_info")
        const desc_sort = document.querySelector(".sort_desc")
        const desc_products = document.querySelector(".desc_products")
        
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
                    return ''
                }
            }


            const new_product = {
                name: name_product.value,
                image: await url(),
                price: +price_product.value,
                price_sale: +price_sale_product.value,
                categoryId: +categories_id.value,
                desc_sort: desc_sort.value,
                desc_products: desc_products.value,
                feature: desc_pro_info.value
            }




            const new_data = await add_Product(new_product);
            console.log(new_data);

            if(new_data){
                alert("Thêm mới sản phẩm thành công!");
                location.href = "/admin"
            }

        })
    }
}

export default add_products_page


