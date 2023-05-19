import axios from "axios"
import footer from "../../layout/footer"
import banner_user from "../../layout/user/banner"
import header_user from "../../layout/user/header"

const detail_category = {
    async render(id) {
        const {data} = await axios.get(`http://localhost:3001/categories/${id}?_embed=products`)
        const list_data = data.products
        console.log(list_data)

        // Phụ kiện
        const access = await axios.get("http://localhost:3001/accessory?_limit=12")
        const list_access = access.data
        // Phụ kiện pc
        const access_pc = await axios.get("http://localhost:3001/access_pc?_limit=12")
        const list_access_pc = access_pc.data

        return /*html*/`
            <div class="home_page col-12">
                <div class="header">
                    ${header_user.render()}
                </div>
                <div class="banner">
                    ${await banner_user.render()}
                </div>
                <div class="article_user">
                    <div class="mobile">
                        <div class="pad container">
                            <h6>${data.name.toUpperCase()}</h6>
                        </div>
                        <div class="list_products">
                            ${list_data.map(item => {
                                const convert_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price)

                                const convert_price_sale = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.price_sale)
                                return /*html*/`
                                    <div class="col-2">
                                        <div class="container">
                                            <div class="image_products">
                                                <a href="/products/detail/${item.id}">
                                                    <img src="${item.image}" width="100%" alt="">
                                                </a>
                                            </div>
                                            <div class="info_products">
                                                <div class="name_products">
                                                <p>${item.name}</p>
                                                </div>
                                                <div class="price_product">
                                                    <p class="price">${convert_price_sale}</p>
                                                    <p class="price_sale">${convert_price}</p>
                                                </div>
                                                <div class="desc_sort">
                                                    <p>${item.desc_sort}</p>
                                                </div>
                                                <div class="vote">
                                                    <div>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                        <i class="fas fa-star"></i>
                                                    </div>
                                                    <div><p>12 lượt đánh giá</p></div>
                                                </div>
                                            </div>
                                        
                                        </div>
                                    </div>
                                `
                            }).join("")}
                        </div>
                    </div>
                    <div class="access">
                        <div class="pad container">
                            <div class="title_access">
                                <h6>PHỤ KIỆN</h6>
                                <a href="#">Xem thêm</a>
                            </div>
                            <div class="list_access">
                                ${list_access.map(item => {
                                    return /*html*/ `
                                        <div class="col-1 info_access">
                                            <img width="85%" src="${item.image}" alt="">
                                            <p>${item.name}</p>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>
                    </div>
                    <div class="access">
                        <div class="pad container">
                            <div class="title_access">
                                <h6>PHỤ KIỆN MÁY TÍNH</h6>
                                <a href="#">Xem thêm</a>
                            </div>
                            <div class="list_access">
                                ${list_access_pc.map(item => {
                                    return /*html*/ `
                                        <div class="col-1 info_access">
                                            <img width="85%" src="${item.image}" alt="">
                                            <p>${item.name}</p>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <hr>
                    ${footer.render()}
                </div>
            </div>
        `
    }
}

export default detail_category