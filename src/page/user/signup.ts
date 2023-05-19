import axios from "axios"
import "../../publics/css/user/signin.css"
import logo from "../../publics/images/logo_cps.png"

const signup_page = {
    render() {
        return /*html*/`
            <div class="bg_color" style="padding: 11% 0%">
                <div class="signin_page col-6">
                    <div class="signin">
                        <div class="form col-6">
                            <form id="form_signin" >
                                <div class="col-12">
                                    <p>Email:</p>
                                    <input class="email" type="text">
                                    <p class="err_mail" style="font-size: 15px;color:red"></p>
                                </div>
                                <div class="col-12">
                                    <p>Số điện thoại:</p>
                                    <input class="phone_number" type="text">
                                    <p class="err_phone" style="font-size: 15px;color:red"></p>
                                </div>
                                <div class="col-12">
                                    <p>Password:</p>
                                    <input class="password" type="password">
                                    <p class="err_pass" style="font-size: 15px;color:red"></p>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn_submit">Đăng ký</button>
                                </div>
                            </form>
                            <div class="login_by">
                                <p>Hoặc đăng nhập bằng</p>
                                <a href="#">
                                    <i class="fab fa-facebook"></i>
                                </a>
                                <a href="#">
                                    <i class="fab fa-google"></i>
                                </a>
                            </div>
                        </div>
                        <div class="logo col-6">
                            <div style="padding:40% 0%" class="img_logo col-7">
                                <img src="${logo}" width="100%" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }, async afterRender(){
        
        const btn_save = document.querySelector(".btn_submit")

        const email = document.querySelector(".email")
        const phone_number = document.querySelector(".phone_number")
        const password = document.querySelector(".password")

        const err_mail = document.querySelector(".err_mail")
        const err_phone = document.querySelector(".err_phone")
        const err_pass = document.querySelector(".err_pass")

        btn_save?.addEventListener("click", async (e) => {
            e.preventDefault()


           if(email.value == ""){
            err_mail.innerHTML = "Vui lòng điền đầy đủ email!"
           }else {
            err_mail.innerHTML = ""
           }

           if(phone_number.value == ""){
            err_phone.innerHTML = "Vui lòng điền đầy đủ số điện thoại!"
           }else {
            err_phone.innerHTML = ""
           }

           if(password.value == ""){
            err_pass.innerHTML = "Bạn chưa điền mật khẩu!"
           } else if(password.value != "" && password.value.length < 5) {
            err_pass.innerHTML = "Vui lòng điền mật khẩu nhiều hơn 8 ký tự"
           } else {
            err_pass.innerHTML = ""
           }


            const user = {
                email: email.value,
                password: password.value,
                phone_number: phone_number.value,
                role: 0
            }
    
            try {

                const new_user = await axios.post('http://localhost:3001/signup',user)
                if(new_user){
                    console.log(new_user)
                }
                
            } catch (error) {
                
            }
            console.log(user)
        })
        
    }
}

export default signup_page


