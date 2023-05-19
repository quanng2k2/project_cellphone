import axios from "axios"
import { add_Category } from "../../api/category"
import header_admin from "../../layout/admin/header"
import menu_admin from "../../layout/admin/menu_admin"

import "../../publics/css/admin/add_product_page.css"

const add_category_page = {
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
            <h5>Thêm mới danh mục</h5>
            <div class="info_products col-12">
                <p>Thông tin danh mục</p>
                <hr>
                <div>
                    <p>Tên danh mục:</p>
                    <input style="width: 95%;
                    outline: none;
                    padding: 0px 5px;" type="text" class="name_category">
                </div>
                <button class="btn_save_products">Thêm mới</button>
            </div>
        </div>
    </div>`
    }, async afterRender() {
        const btn_save = document.querySelector(".btn_save_products")

        const name_category = document.querySelector(".name_category")


        btn_save?.addEventListener("click", async (e) => {


            const new_category = {
                name: name_category?.value,
            }

            console.log(new_category)



            const new_data = await add_Category(new_category);
            console.log(new_data);

            if(new_data){
                alert("Thêm mới danh mục thành công!");
                location.href = "/admin/category"
            }

        })
    }
}

export default add_category_page


