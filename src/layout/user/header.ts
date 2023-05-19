import  "../../publics/css/user/header.css"
import axios from "axios"

// logo
import logo from "../../publics/images/logo_cps.png"

const header_user = {
    render() {
        return /*html*/ `
            <div class="header_user container">
                <div class="logo col-2">
                    <a href="/">
                        <img src="${logo}" alt="" width="100%">
                    </a>
                </div>
                <div class="search col-4">
                    <div class="value_search">
                        <ul id="render_data_search">
                            <li>Searching ...</li>
                        </ul>
                    </div>
                    <input type="text" id="text_search" class="text_search" oninput ="(async function(){
                        let keyword = document.querySelector('#text_search').value;
                        // Khai bao box search
                        const bg_search = document.querySelector('.bg_search')
                        const value_search = document.querySelector('.value_search')
                        const render_data_search = document.querySelector('#render_data_search');
                        // Call api
                        const data = await(await fetch('http://localhost:3001/products?q=' + keyword)).json()
                        console.log(data)

                        if(data){
                            value_search.style.display = 'block'
                            render_data_search.innerHTML = data.map(item => {
                                return '<li><a href=' + '/products/detail/' + item.id + '>' + item.name + '</a></li>';
                            }).join('');
                        }
                        

                        bg_search.style.display = 'block'
                        bg_search.addEventListener('click', () => {
                            bg_search.style.display = 'none'
                            value_search.style.display = 'none'
                        })

                    })()">
                    <button class="btn_search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="icon col-6">
                    <div>
                        <p>Gọi mua hàng</p>
                        <p>1800.2097</p>
                    </div>
                    <div class="font_icon">
                        <div class="pos">
                            <i class="fas fa-map-marker-alt"></i>
                            <p>Cửa hàng gần bạn</p>
                        </div>
                        <div class="pos">
                            <i class="fas fa-shipping-fast"></i>
                            <p>Tra cứu đơn hàng</p>
                        </div>
                        <div class="pos">
                           <a href="/cart" style="color: white">
                                <i class="fas fa-cart-plus"></i>
                                <p>Giỏ hàng</p>
                           </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg_search">

            </div>
        `
    }, afterRender() {
    }
}

export default header_user