// handle local storage
class Store {

    // get cart items ID from local storage
    static getCartItemsID() {
        const keysArray = Object.keys(localStorage);
        return keysArray;
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    console.log('%c Hello there! I see you\'re checking out the code here ;) Feel free to look around. ', 'background: #222; color: #bada55');
    console.log('%c Developer profile: https://github.com/peanutooo ', 'background: #222; color: #bada55');
    console.log('%c Any feedback or suggestions?\n Drop me a message on LinkedIn: https://www.linkedin.com/in/iris-yan/ ', 'background: #222; color: #bada55');
});

window.onload = function(){
    //hide the preloader
    setTimeout(() => {
        const preloader = document.querySelector(".preloader");
        preloader.classList.add("fadeout");
        preloader.style.display = "none";
    }, 1000)
}

function addQty(element) {
    quantity = parseInt(element.previousElementSibling.innerHTML);
    quantity += 1;

    addToCartBtn = element.parentElement.parentElement.nextElementSibling.firstElementChild;

    if (!addToCartBtn.classList.contains('validQuantity')) {
        addToCartBtn.classList.add('validQuantity');
    }
    validToAddToCart(addToCartBtn);

    element.previousElementSibling.innerHTML = quantity;
}

function minusQty(element) {
    quantity = parseInt(element.nextElementSibling.innerHTML);

    if (quantity > 0) {
        quantity -= 1;

        if (quantity === 0) {
            let addToCartBtn = element.parentElement.parentElement.nextElementSibling.firstElementChild;

            if (addToCartBtn.classList.contains('validQuantity')) {
                addToCartBtn.classList.remove('validQuantity');
            }
            validToAddToCart(addToCartBtn);
        }
        element.nextElementSibling.innerHTML = quantity;
    }
}

// CHECK IF USER SELECTED SIZE FOR HOODIE/SHIRT
function checkSizeSelected(element) {
    const addToCartBtn = element.parentElement.parentElement.nextElementSibling.firstElementChild;
    const id = element.parentElement.parentElement.previousElementSibling.parentElement.id;

    if (!addToCartBtn.classList.contains('sizeSelected')) {
        addToCartBtn.classList.add('sizeSelected');
    }

    toggleSizeSelectionWarning(id, addToCartBtn);

    if (addToCartBtn.classList.contains('validQuantity') && addToCartBtn.classList.contains('sizeSelected')) {
        if (addToCartBtn.classList.contains('disabled')) {
            addToCartBtn.classList.remove('disabled');
        }
    }
}

function addToCart(element) {
    const id = element.parentElement.parentElement.id;

    switch (id) {
        case 'C01':
            const capQty = document.querySelector("#cap-qty").innerHTML;

            const capDetails = {
                'quantity': capQty
            }

            localStorage.setItem(id, JSON.stringify(capDetails));
            break;
        
        case 'H01':
            const hoodieQty = document.querySelector("#hoodie-qty").innerHTML;
            const hoodieSizeOptions = document.querySelector('#hoodie-size');
            const hoodieRadioButtons = hoodieSizeOptions.getElementsByTagName('input');
            let hoodieSize = "";

            for (i = 0; i < hoodieRadioButtons.length; i++) {
                if (hoodieRadioButtons[i].checked) {
                    hoodieSize = hoodieRadioButtons[i].value;
                    break;
                }
            }

            const hoodieDetails = {
                'quantity': hoodieQty,
                'size': hoodieSize
            }

            localStorage.setItem(id, JSON.stringify(hoodieDetails));
            break;
        
        case 'SST01':
            const shortsleeveQty = document.querySelector("#shortsleeveshirt-qty").innerHTML;
            const shortsleeveSizeOptions = document.querySelector('#shortsleeveshirt-size');
            const shortsleeveRadioButtons = shortsleeveSizeOptions.getElementsByTagName('input');
            let shortsleeveSize = "";

            for (i = 0; i < shortsleeveRadioButtons.length; i++) {
                if (shortsleeveRadioButtons[i].checked) {
                    shortsleeveSize = shortsleeveRadioButtons[i].value;
                    break;
                }
            }

            const shortsleeveDetails = {
                'quantity': shortsleeveQty,
                'size': shortsleeveSize
            }

            localStorage.setItem(id, JSON.stringify(shortsleeveDetails));
            break;

        case 'LST01':
            const longsleeveQty = document.querySelector("#longsleeveshirt-qty").innerHTML;
            const longsleeveSizeOptions = document.querySelector('#longsleeveshirt-size');
            const longsleeveRadioButtons = longsleeveSizeOptions.getElementsByTagName('input');
            let longsleeveSize = "";

            for (i = 0; i < longsleeveRadioButtons.length; i++) {
                if (longsleeveRadioButtons[i].checked) {
                    longsleeveSize = longsleeveRadioButtons[i].value;
                    break;
                }
            }

            const longsleeveDetails = {
                'quantity': longsleeveQty,
                'size': longsleeveSize
            }

            localStorage.setItem(id, JSON.stringify(longsleeveDetails));
            break;
    }

    const cartUpdated = document.querySelector("#cartUpdatedToast");
    const cartUpdatedToast = new bootstrap.Toast(cartUpdated, []);
    cartUpdatedToast.show();

    cartUpdated.classList.add("fadein");

    setTimeout(() => {
        cartUpdated.classList.add("fadeout");
        cartUpdatedToast.hide();
    }, 2000);
}

const validToAddToCart = (element) => {

    const id = element.parentElement.parentElement.id;
    let valid = false;

    if (element.classList.contains('validQuantity')) {

        if (id !== 'C01' && !element.classList.contains('sizeSelected')) {
            toggleSizeSelectionWarning(id, element);
    
        } else if (id !== 'C01' && element.classList.contains('sizeSelected')) {
            valid = true;
    
        } else if (id === 'C01') {
            valid = true;
        }

    } else {
        valid = false;
    }

    if (valid) {
        if (element.classList.contains('disabled')) {
            element.classList.remove('disabled');
        }
    } else {
        if (!element.classList.contains('disabled')) {
            element.classList.add('disabled');
        }
    }
}

const toggleSizeSelectionWarning = (id, element) => {
    warning = '';

    if (id === 'H01') {
        sizeOptions = document.querySelector('#hoodie-size');
        warning = document.querySelector("#hoodiesize-warning");

    } else if (id === 'SST01') {
        sizeOptions = document.querySelector('#shortsleeveshirt-size');
        warning = document.querySelector("#shortsleeveshirtsize-warning");

    } else if (id === 'LST01') {
        sizeOptions = document.querySelector('#longsleeveshirt-size');
        warning = document.querySelector("#longsleeveshirtsize-warning");
    }

    // if size not selected
    if (!element.classList.contains('sizeSelected')) {
        if (warning.classList.contains('d-none')) {
            warning.classList.remove('d-none');
            warning.classList.add('d-block');
        }

    } else {
        if (warning.classList.contains('d-block')) {
            warning.classList.remove('d-block');
            warning.classList.add('d-none');
        }
    }
}






