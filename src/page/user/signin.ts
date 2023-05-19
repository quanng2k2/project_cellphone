import axios from "axios"
import "../../publics/css/user/signin.css"
import logo from "../../publics/images/logo_cps.png"

const signin_page = {
    render() {
        return /*html*/`
            <div class="bg_color">
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
                                    <p>Password:</p>
                                    <input class="password" type="password">
                                    <p class="err_pass" style="font-size: 15px;color:red"></p>
                                </div>
                                <div class="col-12">
                                    <button type="submit" class="btn_submit">Đăng nhập</button>
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
                            <div class="img_logo col-7">
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
        const password = document.querySelector(".password")

        const err_mail = document.querySelector(".err_mail")
        const err_pass = document.querySelector(".err_pass")

        btn_save?.addEventListener("click", async (e) => {
            e.preventDefault()


            if(email.value.length == 0){
                err_mail.innerHTML = "Vui lòng điền đầy đủ email!"
            } else  {
                const {data} = await axios.get(`http://localhost:3001/users?email=${email.value}`)

                if(data.length == 0){
                    err_mail.innerHTML = "Email chưa được đăng ký!"
                }
                else{
                    err_mail.innerHTML = ""

                }

            }

            const user = {
                email: email.value,
                password: password.value  
            }

            const user_signin = await axios.post('http://localhost:3001/signin',user)
            console.log(user_signin.data.user)


            if(user_signin){
                localStorage.setItem("User", JSON.stringify(user_signin.data))

                                    // Chuyem huong trang
                                    window.location.href = "/admin"
            }


            // localStorage.clear()
        })

    }
}

export default signin_page


