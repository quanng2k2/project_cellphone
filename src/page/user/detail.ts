import axios from "axios"
import footer from "../../layout/footer"
import header_user from "../../layout/user/header"
import "../../publics/css/user/detail_products.css"

const detail_page = {
    async render(id) {
        const {data} = await axios.get(`http://localhost:3001/products/${id}`)

        const data_products = await axios.get(`http://localhost:3001/products?categoryId_like=${data.categoryId}&_limit=5`)
        const list_products = data_products.data

        const convert_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data.price)

        const convert_price_sale = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(data.price_sale)
        return /*html*/ `
            <div class="detail_products">
                <div class="header">
                    ${header_user.render()}
                </div>
                <div style="padding: 25px 0px" class="article">
                    <hr>
                    <div class="container">
                        <div class="product">
                            <div class="img_product col-3">
                                <img src="${data.image}" width="100%" alt="">
                            </div>
                            <div class="info_product col-9">
                                <div>
                                    <h5>${data.name}</h5>
                                    <p class="price">${convert_price_sale}</p>
                                    <p class="price_sale">${convert_price}</p>
                                </div>
                                <div>
                                    <p>${data.desc_sort}</p>
                                </div>
                                <button class="btn_buy">Mua ngay</button>
                                <button class="add_to_cart">
                                    <i class="fas fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="product_view">
                            <h5>Sản phẩm tương tự</h5>
                            <div class="container">
                                ${list_products.map(item => {
                                    return /*html*/`
                                        <div class="col-2">
                                            <div class="img">
                                                <a href="/products/detail/${item.id}">
                                                    <img src="${item.image}" width="100%" alt="">
                                                </a>
                                            </div>
                                            <div class="info">
                                                
                                                <div class="name_products">
                                                <p>${item.name}</p>
                                                </div>
                                                <div class="price_product">
                                                    <p class="price">${convert_price}</p>
                                                    <p class="price_sale">${convert_price_sale}</p>
                                                </div>
                                            </div>
                                        </div>
                                    `
                                }).join("")}
                            </div>
                        </div>
                        <div class="feature">
                            <h5>Đặc điểm nổi bật</h5>
                            <p>${data.feature}</p>
                        </div>
                        <div class="desc">
                        <h5>Mô tả sản phẩm:</h5>
                            <p>${data.desc_products}</p>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <hr>
                    ${footer.render()}
                </div>
            </div>
        `
    }, async afterRender(id){
        const btn_add_cart = document.querySelector(".add_to_cart")
        btn_add_cart?.addEventListener("click",async () => {
            const local_cart = localStorage.getItem("cart")
            

            if(!local_cart){
                const {data} = await axios.get(`http://localhost:3001/products/${id}`)
                const save_data = {
                    product: JSON.stringify(data),
                    count: 1
                }
                localStorage.setItem("cart", JSON.stringify(save_data))
            }


            const cart = JSON.parse(JSON.parse(localStorage.getItem("cart")).product)
            if(cart){
                alert("Thêm sản phẩm vào giỏ hàng thành công!")
            }
            console.log(cart)
        })
    }
}

export default detail_page