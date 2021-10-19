container.innerHTML += `
        <div class="card col-lg-3 text-center mb-2" id="${product.id}">
            <div class="card-img-box d-flex align-items-center">
            <div id="${product.alt}-carousel" class="carousel carousel-dark slide" data-bs-ride="carousel">
                <div class="carousel-indicators mt-2">
                <button type="button" data-bs-target="#${product.alt}-carousel" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#${product.alt}-carousel" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#${product.alt}-carousel" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
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
            <h5 class="card-title ${product.alt}-title"></h5>
            <p class="card-text">RM<span class="${product.alt}-price"></span>.00</p>

            <div class="btn-group mb-1 d-flex row" id="${product.alt}-size" role="group"
                aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="${product.alt}radio" id="xs_size_${product.alt}" value='XS'
                autocomplete="off">
                <label class="btn btn-outline-primary col-1 radiofont" for="xs_size_${product.alt}">XS</label>

                <input type="radio" class="btn-check" name="${product.alt}radio" id="s_size_${product.alt}" value='S'>
                <label class="btn btn-outline-primary col-1 radiofont" for="s_size_${product.alt}">S</label>

                <input type="radio" class="btn-check" name="${product.alt}radio" id="m_size_${product.alt}" value='M'>
                <label class="btn btn-outline-primary col-1 radiofont" for="m_size_${product.alt}">M</label>

                <input type="radio" class="btn-check" name="${product.alt}radio" id="l_size_${product.alt}" value='L'>
                <label class="btn btn-outline-primary col-1 radiofont" for="l_size_${product.alt}">L</label>

                <input type="radio" class="btn-check" name="${product.alt}radio" id="xl_size_${product.alt}" value='XL'
                autocomplete="off">
                <label class="btn btn-outline-primary col-1 radiofont" for="xl_size_${product.alt}">XL</label>

                <input type="radio" class="btn-check" name="${product.alt}radio" id="2xl_size_${product.alt}" value='2XL'
                autocomplete="off">
                <label class="btn btn-outline-primary col-1 radiofont" for="2xl_size_${product.alt}">2XL</label>
            </div>

            <!-- View ${product.alt} size details button -->
            <div class="mb-3" data-bs-toggle="modal" data-bs-target="#${product.alt}SizeDetailsModal" >
                <span class="size-description">View size description</span>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="${product.alt}SizeDetailsModal" tabindex="-1" aria-labelledby="${product.alt}SizeDetailsModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="${product.alt}SizeDetailsModalLabel">${product.alt} size description</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <img src="img/${product.alt}_sizedetails.PNG" alt="" style="width: 100%;">
                    </div>
                </div>
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <a href="" class="btn btn-primary minusBtn me-2"><i class="fas fa-minus"></i></a>
                <span class="p-2 fw-bold" id="${product.alt}-qty">0</span>
                <a href="" class="btn btn-primary addBtn ms-2"><i class="fas fa-plus"></i></a>
            </div>
            </div>
            <div class="card-footer bg-transparent pt-3 pb-3">
            <a href="#" class="btn btn-success addToCartBtn disabled"><i class="fas fa-cart-plus me-2"></i>Add to
                cart</a>
            <p class="warning d-none mt-1 fw-bold fst-italic mb-2 mt-2" id="${product.alt}size-warning">Please select size!</p>
            </div>
        </div>`