// handle local storage
class Store {

    // get cart items ID from local storage
    static getCartItemsID() {
        const keysArray = Object.keys(localStorage);
        return keysArray;
    }

    static setTotalPrice(totalprice) {
        localStorage.setItem('totalprice', totalprice);
    }

    static getTotalPrice() {
        return localStorage.getItem('totalprice');
    }

    static getQuantity(id) {
        let item = JSON.parse(localStorage.getItem(id));
        return item.quantity;
    }

    static getCartItems() {
        const valuesArray = Object.values(localStorage);
        return valuesArray;
    }

    static clearAll() {
        localStorage.clear();
    }

    static removeCartItem(id) {
        localStorage.removeItem(id);
    }

}

$( document ).ready(function() {
    generateProductsDataArray();
    console.log('%c Hello there! I see you\'re checking out the code here ;) Feel free to look around. ', 'background: #222; color: #bada55');
    console.log('%c Developer profile: https://github.com/peanutooo ', 'background: #222; color: #bada55');
    console.log('%c Any feedback or suggestions?\n Drop me a message on LinkedIn: https://www.linkedin.com/in/iris-yan/ ', 'background: #222; color: #bada55');
})

window.onload = function(){

    //hide the preloader
    setTimeout(() => {
        const preloader = document.querySelector(".preloader");
        preloader.classList.add("fadeout");
        preloader.style.display = "none";
    }, 2000)
    
}


async function getProductsJSON() {
    let url = 'products.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// SORT CART ITEMS ACCORDING TO ACTUAL PRODUCT DETAILS IN JSON FILE
// TO GET THE PRICING OF EACH PRODUCT
const productsList = [];      // ARRAY TO STORE JSON ITEMS.

async function generateProductsDataArray() {
    let products = await getProductsJSON();
    products.forEach(product => {
        productsList.push(product);
    })

    // console.log(productsList);
    displayCartItems(sortedCartDetailsArray());
}


const sortedCartDetailsArray = () => {
    // console.log(productsList.length); 
    // console.log(productsList); 

    const cartItemsID = Store.getCartItemsID();
    const cartItemsDetails = Store.getCartItems();

    let sortedCartDetails = [];

    for (j = 0; j < cartItemsID.length; j++) {

        for (i = 0; i < productsList.length; i++) {

            if (cartItemsID[j] === productsList[i].id) {

                const cartItemDetail = JSON.parse(cartItemsDetails[j]);

                if (cartItemsID[j] === 'SST01' || cartItemsID[j] === 'LST01' || cartItemsID[j] === 'H01') {
                    const item = {
                        'id': productsList[i].id,
                        'name': productsList[i].item_name,
                        'price': productsList[i].price,
                        'quantity': Store.getQuantity(productsList[i].id),
                        'size': cartItemDetail.size,
                    }

                    sortedCartDetails.push(item);

                } else {
                    const item = {
                        'id': productsList[i].id,
                        'name': productsList[i].item_name,
                        'price': productsList[i].price,
                        'quantity': Store.getQuantity(productsList[i].id),
                    }
                    sortedCartDetails.push(item);
                }
            }
        }
    }
    return sortedCartDetails;
}

const displayCartItems = (sortedCartDetailsArray) => {

    const cartContent = document.querySelector('.cart-content');
    let total_paying_price = 0;

    if (!sortedCartDetailsArray.length) {
        document.querySelector('.empty-cart').classList.remove('d-none');
        document.querySelector('.empty-cart').classList.add('d-block');
        Store.setTotalPrice(total_paying_price);

    } else {
        document.querySelector('.empty-cart').classList.add('d-none');
    }

    // console.log(sortedCartDetailsArray);
     
    sortedCartDetailsArray.forEach(cartItem => {

        cartItem_total_price = cartItem.quantity * cartItem.price;
        total_paying_price += cartItem_total_price;
        Store.setTotalPrice(total_paying_price);

        if (cartItem.id === 'SST01' || cartItem.id === 'LST01' || cartItem.id === 'H01') {

            shirtType = '';

            if (cartItem.id === 'SST01') {
                shirtType = document.getElementById("shortsleeveshirt_input");
            } else if (cartItem.id === 'LST01') {
                shirtType = document.getElementById("longsleeveshirt_input");
            } else if (cartItem.id === 'H01') {
                shirtType = document.getElementById("hoodie_input");
            } 

            shirtType.value = `${cartItem.size} size (${cartItem.quantity})`;

            let size = '';
            switch (cartItem.size) {
                case 's':
                    size = "Small";
                    break;
                case 'm':
                    size = "Medium";
                    break;
                case 'l':
                    size = "Large";
                    break;
                case 'xl':
                    size = "Extra large";
                    break;
                default:
                    size = '';
            }

            cartItemHTML = `
            <tr>
                <td class="item text-white">
                    <div class="text-white">${cartItem.name}</div> 
                    <div class="fw-light fst-italic text-white">${cartItem.size} size</div> 
                </td>
                <td class="text-white">${cartItem.quantity}</td>
                <td class="text-white">RM<span class="itemprice text-white ${cartItem.id}">${cartItem_total_price}</span>.00</td>
                <td><i class="fas fa-trash text-white removeitem ${cartItem.id}" onclick="removeCartItem('${cartItem.id}', event)"></i></td>
            </tr> `
            cartContent.innerHTML += cartItemHTML;

        } else {

            if (cartItem.id === 'C01') {
                document.getElementById("cap_input").value = cartItem.quantity;
            } 

            cartItemHTML = `
            <tr>
                <td class="item text-white">${cartItem.name}</td>
                <td class="text-white">${cartItem.quantity}</td>
                <td class="text-white">RM<span class="itemprice text-white ${cartItem.id}">${cartItem_total_price}</span>.00</td>
                <td><i class="fas fa-trash text-white removeitem ${cartItem.id}" onclick="removeCartItem('${cartItem.id}', event)"></i></td>
            </tr> `

            cartContent.innerHTML += cartItemHTML;
        }
    })

    retrieved_total_paying_price = Store.getTotalPrice();

    footHTML = `
    <tr class="shipping-bg text-white fw-bold">
        <td class="text-end text-white">Shipping fee </td>
        <td class="text-center text-white" id="shipping-fee">RM0.00</td>
    </tr> 
    <tr class="totalprice-bg text-white fw-bold">
        <td class="text-end text-white">Total amount </td>
        <td class="text-center text-white" id="total-price">RM${retrieved_total_paying_price}.00</td>
    </tr> `

    document.querySelector('.total-details').innerHTML += footHTML;

    document.querySelector('#total_price_input').value = retrieved_total_paying_price;
    
}

const removeCartItem = (id, e) => {
    price = e.target.parentElement.previousElementSibling.firstElementChild.innerHTML;

    currentTotalPrice = Store.getTotalPrice();
    Store.setTotalPrice(currentTotalPrice - price);

    retrieved_total_paying_price = Store.getTotalPrice();
    document.querySelector("#total-price").innerHTML = `RM${retrieved_total_paying_price}.00`;

    switch (id) {
        case 'C01':
            document.querySelector('#cap_input').value = '';
            break;
        
        case 'H01':
            document.querySelector('#hoodie_input').value = '';
            break;
        
        case 'SST01':
            document.querySelector('#shortsleeveshirt_input').value = '';
            break;
        
        case 'LST01':
            document.querySelector('#longsleeveshirt_input').value = '';
            break;
    }

    Store.removeCartItem(id);
    e.target.parentElement.parentElement.remove();

    if (Store.getCartItemsID().length < 2) {
        document.querySelector('.empty-cart').classList.remove('d-none');
        document.querySelector('.empty-cart').classList.add('d-block');
    } else {
        document.querySelector('.empty-cart').classList.add('d-none');
    }
    
}

let choseShipBefore = false;
let chosePickupBefore = false;

$("input:radio[name='Collection_choice']").change(function () {  

    total_paying_price = parseInt(Store.getTotalPrice());
    const shipping_fee = 8;

    if ($("input:radio[name='Collection_choice']:checked").val() === 'Ship' && !choseShipBefore) {

        total_paying_price += shipping_fee;
        $("#shipping-fee").html(`RM8.00`);
        
        Store.setTotalPrice(total_paying_price);

        $("#total-price").html(`RM${total_paying_price}.00`);
        retrieved_total_paying_price = Store.getTotalPrice();
        document.querySelector('#total_price_input').value = retrieved_total_paying_price;
        choseShipBefore = true;
        chosePickupBefore = false;

        const shipOnlyInputs = document.querySelectorAll(".ship-only-input");
        shipOnlyInputs.forEach(shipOnlyInput => {
            shipOnlyInput.setAttribute('required', true);
            shipOnlyInput.removeAttribute('disabled');
        })
    }

    if ($("input:radio[name='Collection_choice']:checked").val() === 'Pickup' && !chosePickupBefore) {

        if (choseShipBefore) {
            total_paying_price -= shipping_fee;
        }
        $("#shipping-fee").html(`RM0.00`);

        Store.setTotalPrice(total_paying_price);

        $("#total-price").html(`RM${total_paying_price}.00`);
        retrieved_total_paying_price = Store.getTotalPrice();
        document.querySelector('#total_price_input').value = retrieved_total_paying_price;
        chosePickupBefore = true;
        choseShipBefore = false;

        const shipOnlyInputs = document.querySelectorAll(".ship-only-input");
        shipOnlyInputs.forEach(shipOnlyInput => {
            shipOnlyInput.removeAttribute('required');
            shipOnlyInput.setAttribute('disabled', true);
            shipOnlyInput.value = '';
        })
    }
});

const scriptURLC ='https://script.google.com/macros/s/AKfycbz5Tas5pydfYR5gnDO2WyMWvxTgGt2KXsBnzmdhPs0bTE_BrjKuP4f4PDoMZEQjtrE1/exec'
const checkoutForm = document.forms['checkout-form'];
const submitBtn = document.querySelector('#submit-form');

checkoutForm.addEventListener('submit', e => {
    e.preventDefault();

    const checkoutSubmitBtn = document.querySelector("#checkoutSubmitBtn");

    checkoutSubmitBtn.classList.add("disabled");

    if (Store.getCartItemsID().length < 2) {
        alert("Please ensure your cart has items before checking out!");

        if (checkoutSubmitBtn.classList.contains('disabled')) {
            checkoutSubmitBtn.classList.remove("disabled");
        }
        return false;
    }

    const email = document.querySelector('input[name="Email"]');
    if (!email.value.includes("@student.usm.my")) {
        email.nextElementSibling.classList.remove('d-none');
        email.nextElementSibling.classList.add('d-block');

        if (checkoutSubmitBtn.classList.contains('disabled')) {
            checkoutSubmitBtn.classList.remove("disabled");
        }
        return false;
    }

    const loader = document.querySelector(".loader-small");
    if (loader.classList.contains("d-none")) {
        loader.classList.remove("d-none");
        loader.classList.add("d-block");
    }

    const fileUploadElement = document.querySelector("#Receipt");
    const matric_num = document.querySelector('#Matric_num').value;
    const student_name = document.querySelector('#name').value;
    const submitted_filename = matric_num + "_" + student_name;
    const file = fileUploadElement.files[0];
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = f => {
        
        const uploadFileURL = "https://script.google.com/macros/s/AKfycbwcjKfopyYb_ce0oEwOW1jnMH5k4M7ZLMiHeNrr_znDoG40bsD5qHoaOhyms50aXJ6Y/exec"; 
        
        const qs = new URLSearchParams({filename: submitted_filename || file.name, mimeType: file.type});
        fetch(`${uploadFileURL}?${qs}`, {
            method: "POST", 
            body: JSON.stringify([...new Int8Array(f.target.result)])
        })
        .then(res => {
            res.json();

            console.log(res);
        })

        .then(e => {
            fetch(scriptURLC, {
                method: 'POST',
                body: new FormData(checkoutForm)
            })
            .then(res => {
    
                console.log(res);
                if (res['status'] == 200) {
                    alert("Purchase successful!");
                    Store.clearAll();
                    window.location.replace("thankyou.html");
                    return true;
    
                } else {
                    alert("Something went wrong! Please try again in 1 minute.");
                    console.log(res['status']);
                    console.log("Something went wrong!", "Please try after some time", "error");
    
                }
            })
            .catch(error => {
    
                console.log("Something went wrong!", "Please try after some time", "error");
                console.log(error);
    
            })

        })
        .catch(err => console.log(err));

    }
})

