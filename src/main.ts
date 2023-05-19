import Navigo from "navigo";
import add_category_page from "./page/admin/add_category";
import add_products_page from "./page/admin/add_products_page";
import category_page from "./page/admin/category_page";
import edit_category_page from "./page/admin/edit_category";
import home_page from "./page/admin/home_page";
import edit_products_page from "./page/admin/upload_products_page";
import detail_page from "./page/user/detail";
import home_page_user from "./page/user/home_page";
import signin_page from "./page/user/signin";
import signup_page from "./page/user/signup";
import cart_page from "./page/user/cart"
import detail_category from "./page/user/detail_category";

const router = new Navigo("/", {linksSelector: "a"})

interface Component{
    print: () => any,
    page: () => any,
    render: () => any,
    afterRender?: () => any,
}

document.addEventListener("DOMContentLoaded", () => {
    async function print(page: Component, id?: number){
        const app = document.getElementById("app");
        if(app){
            app.innerHTML = await page.render(id)
        }
        if(page.afterRender) page.afterRender(id)

        if (document.getElementById("btn_logout")) {
            document.getElementById("btn_logout").addEventListener("click", function() {
                localStorage.removeItem('User');
                location.href = "/admin"
            })
        }

    }



   

    router.on({
        // User
        '/': () => print(home_page_user),
        '/signin': () => print(signin_page),
        '/signup': () => print(signup_page),
        '/products/detail/:id': (data) => {print(detail_page, data.data.id)},
        '/category/:id': (data) => {print(detail_category, data.data.id)},
        '/cart': () => print(cart_page),
    })
    
    let text = window.location.pathname;
    let pattern = /admin/
    let result = pattern.test(text);

    console.log(result)
    if (result == true) {
        // Admin
        if (!JSON.parse(localStorage.getItem("User"))) {

            document.querySelector("#app").innerHTML = `
                <div class="container" style="text-align: center;padding: 50px 0px;">
                        <h6>Vui lòng <a href="/signin">Đăng nhập</a> để xem trang này !</h6>
                        <p><a href="/">Quay lại trang chủ</a></p>
                </div>
                `
        } else if (!(JSON.parse(localStorage.getItem('User')).user.role == 1)) {

            document.querySelector("#app").innerHTML = `
                <div class="container" style="text-align: center;padding: 50px 0px;">
                    <h6>Bạn không có quyền truy cập trang này !</h6>
                    <p><a href="/">Quay lại trang chủ</a></p>
                    <p><button style="font-size: 14px;
                    padding: 2px 10px;
                    border: 1px solid black;
                    border-radius: 7px;" id="btn_logout">Đăng xuất</button></p>
                </div>
        `
        } else {
            router.on({
                // // Admin
                '/admin': () => print(home_page),
                '/admin/products/add': () => print(add_products_page),
                '/admin/products/edit/:id': (data) => {
                    print(edit_products_page, data.data.id)
                },
                '/admin/category': () => print(category_page),
                '/admin/category/add': () => print(add_category_page),
                '/admin/category/edit/:id': (data) => {
                    print(edit_category_page, data.data.id)
                },
            })
        }

        if (document.getElementById("btn_logout")) {
            document.getElementById("btn_logout").addEventListener("click", function() {
                localStorage.removeItem('User');
                location.href = "/admin"
            })
        }

    }

    router.resolve()


})