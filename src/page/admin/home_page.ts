import axios from "axios"
import header_admin from "../../layout/admin/header"
import menu_admin from "../../layout/admin/menu_admin"

import "../../publics/css/admin/home_page.css"

const home_page = {
    async render() {
        const {data} = await axios.get("http://localhost:3001/categories/1?_embed=products");
        const list_products = data.products

        const categories = await axios.get("http://localhost:3001/categories")
        const data_category = categories.data

        console.log(data_category)

        // html
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
                    <div class = "col-11">
                        <h4>Điện thoại</h4>
                        <a href="/admin/products/add">
                            <svg class="icon_add"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                        <div class="select col-4">
                            <h6>Bộ lọc:</h6>
                            <div class="col-10">
                                <p>Danh mục sản phẩm</p>
                                <select name="filter">
                                    ${data_category.map(item_cate => {
                                        return /*html*/ `
                                            <option class="filter_sort" value="#">
                                                <button type="button" value="${item_cate.id}" >${item_cate.name}</button>
                                            </option>`
                                        })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="list_products col-11">
                        <table>
                            <thead>
                                <tr>
                                    <th class="col-1">#</th>
                                    <th class="col-3">Tên sản phẩm</th>
                                    <th class="col-1">Thành tiền</th>
                                    <th class="col-3">Mô tả</th>
                                    <th class="col-2">Ẩn/hiện</th>
                                    <th class="col-2">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${list_products.map((item => {
                                    return /*html*/ `
                                    <tr>
                                        <td class="col-1">${item.id}</td>
                                        <td class="col-2"><a href="/products/${item.id}">${item.name}</a></td>
                                        <td class="col-2">${item.price} đ</td>
                                        <td class="col-3"><div class="desc">${item.desc_products}</div></td>
                                        <td class="col-2">
                                            <i class="fas fa-toggle-on"></i>
                                        </td>
                                        <td class="col-2">
                                            <a href="/admin/products/edit/${item.id}">
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
        // const btn_filter = document.querySelector(".filter_sort");

        // btn_filter?.addEventListener("click", async (e) => {
        //     location.href = "/admin/1"
        // })
    }
}

export default home_page


