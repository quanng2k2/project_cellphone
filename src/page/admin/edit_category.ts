import axios from "axios"
import { add_Category, edit_Category } from "../../api/category"
import header_admin from "../../layout/admin/header"
import menu_admin from "../../layout/admin/menu_admin"

import "../../publics/css/admin/add_product_page.css"

const edit_category_page = {
    async render(id) {
        console.log(id)
        const categories = await axios.get("http://localhost:3001/categories")
        const {data} = await axios.get(`http://localhost:3001/categories/${id}`)
        console.log(data)

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
                    padding: 0px 5px;" value="${data.name}" type="text" class="name_category">
                </div>
                <button class="btn_save_products">Lưu chỉnh sửa</button>
            </div>
        </div>
    </div>`
    }, async afterRender(id) {
        const btn_save = document.querySelector(".btn_save_products")

        const name_category = document.querySelector(".name_category")


        btn_save?.addEventListener("click", async (e) => {


            const new_category = {
                name: name_category?.value,
            }

            console.log(new_category)



            const new_data = await edit_Category(new_category,id);
            console.log(new_data);

            if(new_data){
                alert("Chỉnh sửa danh mục thành công!");
                location.href = "/admin/category"
            }

        })
    }
}

export default edit_category_page


