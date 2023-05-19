import footer from "../../layout/footer"
import header_user from "../../layout/user/header"

import "../../publics/css/user/cart.css"
import { re_load } from "../../skill/reRender"

const cart_page = {
    async render(){
        const local_cart = localStorage.getItem("cart")
        if(local_cart){
        const data_cart = JSON.parse(local_cart)

        const cart = JSON.parse(data_cart.product)
        console.log(cart)
        const convert_price = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(cart.price)

        const convert_price_sale = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(cart.price_sale)
                                // console.log(item)

        return /*html*/`
            <div>
                <div class="header">
                    ${header_user.render()}
                </div>
                <div class="container cart_ctn">
                    <div class="product col-8">   
                        <div class="img col-2">
                            <img src="${cart.image}" width="100%" alt="">
                        </div>
                        <div class="info col-10">
                            <div class="name">
                                <h6>${cart.name}</h6>
                                <button class="btn_remove"> <i class="fas fa-backspace"></i></button>
                            </div>
                            <div class="price">
                                <p id="price_sale">${convert_price_sale}</p>
                                <p id="price">${convert_price}</p>
                                <p></p>
                            </div>
                            <div class="count">
                                <button class="btn_cong">+</button>
                                <input type="number" class="number" value=1 min=1 name="" id="">
                                <button class="btn_tru">-</button>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="footer">
                    <hr>
                    ${footer.render()}
                </div>
            </div>
        `
        } else {
            return /*html*/`
                <div>
                    <div class="header">
                        ${header_user.render()}
                    </div>
                    <div class="container cart_ctn">
                        <p style="text-align: center; padding-top: 50px">Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
                    </div>
                    <div class="footer">
                        <hr>
                        ${footer.render()}
                    </div>
                </div>
            `
        }
    }, afterRender(){


        // remove
        const btn_remove = document.querySelector(".btn_remove")
        btn_remove?.addEventListener("click", () => {
            localStorage.clear()

        })
    }
}

export default cart_page