import logo from "../../publics/images/logo_cps.png"
import "../../publics/css/admin/header.css"
const header_admin = {
    render() {
        return /*html*/`
        <div class="header">
            <div>
                <img width="" src="${logo}" alt="">
            </div>
            <div>
            <p><button id="btn_logout">Đăng xuất</button></p>
            </div>
        </div>
        `
    }
}


export default header_admin