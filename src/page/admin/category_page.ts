import axios from "axios"
import header_admin from "../../layout/admin/header"
import menu_admin from "../../layout/admin/menu_admin"

import "../../publics/css/admin/home_page.css"

const category_page = {
        async render() {
            const categories = await axios.get("http://localhost:3001/categories");
            const data_category = categories.data

            console.log(data_category)

            // html
            return /*html*/ `
        <div class="home_page">
            <div class="header_admin">
                ${header_admin.render()}
            </div>
            <div class="container_admin">
                <div class="nav col-2">
                    ${menu_admin.render()}
                </div>
                <div class="article col-10">
                    <div class = "col-11">
                        <h4>Danh mục sản phẩm</h4>
                    </div>
                    <div class="list_products col-11">
                        <table>
                            <thead>
                                <tr>
                                    <th class="col-2">#</th>
                                    <th class="col-4">Tên danh mục</th>
                                    <th class="col-2">Xóa</th>
                                    <th class="col-2">Chỉnh sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data_category.map((item => {
                                    return /*html*/ `
                                    <tr>
                                        <td class="col-2">${item.id}</td>
                                        <td class="col-4"><a href="/category/${item.id}">${item.name}</a></td>
                                        <td class="col-2">
                                            <button style="border: 0px;
                                            background-color: #f9f9f9;" id="btn_remove" value="${item.id}">
                                                <i class="fas fa-ban"></i>
                                            </button>
                                        </td>
                                        <td class="col-2">
                                            <a href="/admin/category/edit/${item.id}">
                                                <i class="far fa-edit"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    `
                                })).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`
    },async afterRender(){
        const btn_remove = document.querySelectorAll("#btn_remove")
        console.log(btn_remove)
        btn_remove.forEach(item => {
            item.addEventListener("click", async () => {
                try {
                    const confirm = window.confirm("Bạn chắc chắn muốn xóa danh mục này?")
                    const data = await axios.delete(`http://localhost:3001/categories/${item.value}`)
                    
                    if(confirm){
                        if(data) {
                            alert("Xóa danh mục thành công!")
                        }
                    }
                } catch (error) {
                    if(error){
                        alert("Xóa danh mục không thành công!")
                    }
                }
            })
        });
    }
}

export default category_page