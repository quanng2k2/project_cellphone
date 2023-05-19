import axios from "axios"
import "../../publics/css/user/banner.css"

// import banner

import banner from "../../publics/images/banner.png"

const banner_user = {
    async render() {

        const {data} = await axios.get("http://localhost:3001/categories")
        return /*html*/ `
            <div class="banner_user container">
                <div class="nav col-2">
                    <ul>
                        ${data.map(item => {
                            return /*html*/ `
                                <li>
                                    <a href="/category/${item.id}">${item.name}</a>
                                    <i class="fas fa-angle-right"></i>
                                </li>
                            `
                        }).join("")}
                    </ul>
                </div>
                <div class="images col-10">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="${banner}" alt="First slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="${banner}" alt="Second slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="${banner}" alt="Third slide">
                        </div>
                        </div>
                        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        `
    }
}


export default banner_user