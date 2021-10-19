$( document ).ready(function() {
    generateProductsData();
})

async function getProductsJSON() {
    let url = 'products.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function generateProductsData() {
    let products = await getProductsJSON();

    let container = document.querySelector("#all-items");

    products.forEach(product => {

        let carousel_img_html = '';
        let carousel_control_html = '';
        for (i = 0; i < product.num_img; i++) {

            if (i === 0) {
                carousel_img_html +=`
                <div class="carousel-item active">
                    <img src="${product.img_path}${i}.png" class="d-block w-100" alt="${product.alt}">
                </div>
                `

                carousel_control_html += `
                    <button type="button" data-bs-target="#${product.alt}-carousel" class="active" data-bs-slide-to="${i}"
                    aria-label="Slide ${i}"></button>
                `
                
            } else {
                carousel_img_html +=`
                <div class="carousel-item">
                    <img src="${product.img_path}${i}.png" class="d-block w-100" alt="${product.alt}">
                </div>
                
                `
                carousel_control_html += `
                    <button type="button" data-bs-target="#${product.alt}-carousel" data-bs-slide-to="${i}"
                    aria-label="Slide ${i}"></button>
                `
            }

            
        }

        let size_radio_html = '';
        let size_details_modal_html = '';

        if(product.has_Size) {
            for (i = 0; i < product.size_range.length; i++) {
                size_radio_html += `
                <input type="radio" class="btn-check" onchange="checkSizeSelected(this)" name="${product.alt}radio" id="${product.size_range[i]}_size_${product.alt}" value='${product.size_range[i]}'">
                <label class="btn btn-outline-warning col-1 radiofont" for="${product.size_range[i]}_size_${product.alt}">${product.size_range[i]}</label>
                
                `
            }

            size_details_modal_html =  `
            <!-- View ${product.alt} size details button -->
            <div class="mb-3" data-bs-toggle="modal" data-bs-target="#${product.alt}SizeDetailsModal" >
                <span class="size-description">View size description</span>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="${product.alt}SizeDetailsModal" tabindex="-1" aria-labelledby="${product.alt}SizeDetailsModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="${product.alt}SizeDetailsModalLabel">Item size description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="img/${product.alt}_sizedetails.PNG" alt="" style="width: 100%;">
                    </div>
                </div>
                </div>
            </div>
            `
        }
        
        container.innerHTML += `
        <div class="card col-lg-3 text-center mb-2" id="${product.id}">
            <div class="card-img-box d-flex align-items-center">
            <div id="${product.alt}-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="false" data-bs-touch="true" data-bs-interval="1000">
                <div class="carousel-indicators mt-2">
                    ${carousel_control_html}
                </div>
                <!-- carousel image -->
                <div class="carousel-inner">
                    ${carousel_img_html}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#${product.alt}-carousel"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#${product.alt}-carousel"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div class="card-body">
            <h5 class="card-title text-white">${product.item_name}</h5>
            <p class="card-text text-white">RM${product.price}.00</p>

            <div class="btn-group mb-1 d-flex row" id="${product.alt}-size" role="group" aria-label="Basic radio toggle button group">
                ${size_radio_html}
            </div>
            
            ${size_details_modal_html}

            <div class="d-flex justify-content-center">
                <div class="btn btn-warning minusBtn me-2" onclick="minusQty(this)"><i class="fas fa-minus"></i></div>
                <span class="p-2 fw-bold text-white" id="${product.alt}-qty">0</span>
                <div class="btn btn-warning addBtn ms-2" onclick="addQty(this)"><i class="fas fa-plus"></i></div>
            </div>
            </div>
            <div class="card-footer bg-transparent pt-3 pb-3">
            <div class="btn btn-warning addToCartBtn disabled" onclick="addToCart(this)"><i class="fas fa-cart-plus me-2"></i>Add to
                cart</div>
            <p class="warning d-none mt-1 fw-bold fst-italic mb-2 mt-2" id="${product.alt}size-warning">Please select size!</p>
            </div>
        </div>
        `

    })
}