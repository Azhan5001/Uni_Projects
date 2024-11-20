//*------------------------------------ NAV BAR ANIMATION ------------------------------------*/
const navbar = document.querySelector('nav');                                       
const twoPercentScroll = document.documentElement.scrollHeight * 0.02;          // Calculate 2% of the total document height
window.addEventListener('scroll', () => {                                       // Add a scroll event listener
// Check if scroll position is greater than or equal to 2% of the total height
if (window.scrollY >= twoPercentScroll) {
navbar.classList.add('scrolled');                                               // Add the 'scrolled' class to change navbar and SVG styles    
} else {
navbar.classList.remove('scrolled');                                            // Remove the 'scrolled' class to revert to original styles
}
});

//*------------------------------------ ACCOUNT.HTML LOGIN/REGISTRATION ------------------------------------*/

window.onload = function(){
    const username = document.getElementById('loggedInUser');
    if (username) {
        window.location.href = 'index.html';                                // REDIRECT IF 'loggedInUser' IS FOUND
    }
};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("regisForm").onsubmit = function(event) {
        event.preventDefault();  // Prevent form submission
        register();  // Call the register function
    };

    document.getElementById("logForm").onsubmit = function(event) {
        event.preventDefault();  // Prevent form submission
        login();  // Call the login function
    };
});
const backButtons = document.getElementsByClassName('back');
for (let button of backButtons) {
    button.onclick = () => window.history.back();
}

function showRegisterForm() {                                               // FUNCTION TO SHOW THE REGISTER FORM/SECTION
    document.getElementById("registerForm").style.display = "block";        // MAKING THE REGISTER FORM VISIBLE
    document.getElementById("loginForm").style.display = "none";            // MAKING LOGIN FORM INVISIBLE
}

function showLoginForm() {                                                  // FUNCTION TO SHOW THE LOGIN FORM/SECTION
    document.getElementById("registerForm").style.display = "none";         // MAKING THE REGISTER FORM INVISIBLE
    document.getElementById("loginForm").style.display = "flex";            // MAKING LOGIN FORM VISIBLE
}   

/* REGISTER FUNCTION */
var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/;

function register() {                                                                       // REGISTER FUNCTION         
    const emailInput = document.getElementById("registerEmail");                            //}
    const usernameInput = document.getElementById("registerUsername");                      //}       GETTING THE INPUTS FROM THE REGISTER FORM
    const passwordInput = document.getElementById("registerPassword");                      //}
    document.getElementById("msg1").innerHTML = "";
    document.getElementById("msg2").innerHTML = "";
    document.getElementById("msg3").innerHTML = "";
// VALIDATING THE USER INPUTS AND SHOWING ERROR IF NOT CORRECT.
    if(emailInput.value === ""){                                          
        document.getElementById("msg1").innerHTML = "Please enter your email.";                                      
        return;
    }else if(!filter.test(emailInput.value)){
        document.getElementById("msg1").innerHTML = "Please enter a valid email.";
        return;
    }else if (usernameInput.value === ""){                                                        
        document.getElementById("msg2").innerHTML = "Please enter your username.";
        return;
    }else if(passwordInput.valule===""){
        document.getElementById("msg3").innerHTML = "Please enter your password.";                                               
        return;
    }else if(passwordInput.value.length < 6 || passwordInput.value.length > 15){
        document.getElementById("msg3").innerHTML = "Password must be between 6-15 characters.";
        return;
    }


// STORING VALID DATA IN THE LOCAL STORAGE OF THE BROWSER
    localStorage.setItem("registerEmail", emailInput.value);
    localStorage.setItem("registerUsername", usernameInput.value);
    localStorage.setItem("registerPassword", passwordInput.value);

    alert("Registration Successful!");
    showLoginForm();
}

/* LOGIN FUNCTION */

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const storedEmail = localStorage.getItem("registerEmail");
    const storedPassword = localStorage.getItem("registerPassword");

    document.getElementById("login-msg1").innerHTML = "";
    document.getElementById("login-msg2").innerHTML = "";

    if (email === "") {
        document.getElementById("login-msg1").innerHTML = "Please enter your email.";
        return;
    } else if (!filter.test(email)) {
        document.getElementById("login-msg1").innerHTML = "Please enter a valid email.";
        return;
    } else if (password === "") {
        document.getElementById("login-msg2").innerHTML = "Please enter your password.";
        return;
    } else if (email === storedEmail && password === storedPassword) {
        // Set logout button to display block
        alert("Login successful!");
    } else {
        document.getElementById("login-msg2").innerHTML = "Invalid Credentials!";
    }
    window.location.href = "index.html";
    document.getElementById("sidebar-logout").style.display = "block";
        
    
}

// Logic for loading data from JSON, displaying it, and saving items to cart
let products = null;
//ChatGPT used to check which page is loaded and to organize the code in a clean order.
document.addEventListener('DOMContentLoaded', () => {
    // Product Page Logic
    function setupProductsPage() {
        if (document.querySelector('.productPage')) {
            console.log('Product page logic initialized.');

            // Slider functionality
            const nextBtn = document.querySelector('.next');
            const prevBtn = document.querySelector('.prev');
            const slider = document.querySelector('.slider');
            const sliderList = slider.querySelector('.slider .list');
            const thumbnail = document.querySelector('.slider .thumbnail');
            const thumbnailItems = thumbnail.querySelectorAll('.item');

            thumbnail.appendChild(thumbnailItems[0]);

            nextBtn.onclick = () => moveSlider('next');
            prevBtn.onclick = () => moveSlider('prev');

            function moveSlider(direction) {
                const sliderItems = sliderList.querySelectorAll('.item');
                const thumbnailItems = document.querySelectorAll('.thumbnail .item');

                if (direction === 'next') {
                    sliderList.appendChild(sliderItems[0]);
                    thumbnail.appendChild(thumbnailItems[0]);
                    slider.classList.add('next');
                } else {
                    sliderList.prepend(sliderItems[sliderItems.length - 1]);
                    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
                    slider.classList.add('prev');
                }

                slider.addEventListener(
                    'animationend',
                    () => slider.classList.remove(direction),
                    { once: true }
                );
            }

            // Cart functionality
            let iconCart = document.querySelector('.iconCart');
            let cart = document.querySelector('.cart');
            let container = document.querySelector('.container');
            let close = document.querySelector('.close');

            iconCart.addEventListener('click', function () {
                if (cart.style.right == '-100%') {
                    cart.style.right = '0';
                    container.style.transform = 'translateX(-400px)';
                } else {
                    cart.style.right = '-100%';
                    container.style.transform = 'translateX(0)';
                }
            })
            close.addEventListener('click', function () {
                cart.style.right = '-100%';
                container.style.transform = 'translateX(0)';
            })


            let products = null;
            // Get data from json
            fetch('products.json')
                .then(response => response.json())
                .then(data => {
                    products = data;
                    addDataToHTML();
                })

            //Show product in list of products 
            function addDataToHTML() {
                // remove datas default from HTML
                let listProductHTML = document.querySelector('.listProduct');
                listProductHTML.innerHTML = '';

                // add new data
                if (products != null) // if products has data
                {
                    products.forEach(product => {
                        let newProduct = document.createElement('div');
                        newProduct.classList.add('product__item');
                        newProduct.innerHTML =
                            `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button onclick="addCart(${product.id})">Add To Cart</button>`;

                        listProductHTML.appendChild(newProduct);

                    });
                }
            }

            // List of products inside cart
            let listCart = [];
            function checkCart() {
                var cookieValue = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('listCart='));
                if (cookieValue) {
                    listCart = JSON.parse(cookieValue.split('=')[1]);
                } else {
                    listCart = [];
                }
            }
            checkCart();
            window.addCart = function ($idProduct) {
                let productsCopy = JSON.parse(JSON.stringify(products));
                //// If this product is not in the cart
                if (!listCart[$idProduct]) {
                    listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
                    listCart[$idProduct].quantity = 1;
                } else {
                    //If it is in the cart, increase quantity
                    listCart[$idProduct].quantity++;
                }
                document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

                addCartToHTML();
            }
            addCartToHTML();
            function addCartToHTML() {
                let listCartHTML = document.querySelector('.listCart');
                listCartHTML.innerHTML = '';

                let totalHTML = document.querySelector('.totalQuantity');
                let totalQuantity = 0;
                if (listCart) {
                    listCart.forEach(product => {
                        if (product) {
                            let newCart = document.createElement('div');
                            newCart.classList.add('cart__item');
                            newCart.innerHTML =
                                `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                            listCartHTML.appendChild(newCart);
                            totalQuantity = totalQuantity + product.quantity;
                        }
                    })
                }
                totalHTML.innerText = totalQuantity;
            }
            window.changeQuantity = function ($idProduct, $type) {
                switch ($type) {
                    case '+':
                        listCart[$idProduct].quantity++;
                        break;
                    case '-':
                        listCart[$idProduct].quantity--;

                        // If quantity <= 0 then remove product from cart
                        if (listCart[$idProduct].quantity <= 0) {
                            delete listCart[$idProduct];
                        }
                        break;

                    default:
                        break;
                }
                // Save new data in cookie
                document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
                // Reload html cart
                addCartToHTML();
            }

            checkCart();
            addCartToHTML();
        }
    }

    

    // Checkout Page Logic
    function setupCheckoutPage() {
        if (document.querySelector('.checkoutPage')) {
            let listCart = [];
            function checkCart() {
                var cookieValue = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('listCart='));
                if (cookieValue) {
                    listCart = JSON.parse(cookieValue.split('=')[1]);
                }
            }
            checkCart();
            addCartToHTML();
            function addCartToHTML() {
                let listCartHTML = document.querySelector('.returnCart .list');
                listCartHTML.innerHTML = '';

                let totalQuantityHTML = document.querySelector('.totalQuantity');
                let totalPriceHTML = document.querySelector('.totalPrice');
                let totalQuantity = 0;
                let totalPrice = 0;
                // If there are products in Cart
                if (listCart) {
                    listCart.forEach(product => {
                        if (product) {
                            let newCart = document.createElement('div');
                            newCart.classList.add('item');
                            newCart.innerHTML =
                                `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;
                            listCartHTML.appendChild(newCart);
                            totalQuantity = totalQuantity + product.quantity;
                            totalPrice = totalPrice + (product.price * product.quantity);
                        }
                    })
                }
                totalQuantityHTML.innerText = totalQuantity;
                totalPriceHTML.innerText = '$' + totalPrice;
            }

            document.getElementById('checkoutButton').addEventListener('click', function (event) {
                let isValid = true;

                function validateField(fieldId, errorId, errorMessage) {
                    const field = document.getElementById(fieldId);
                    const error = document.getElementById(errorId);

                    if (!field.value.trim()) {
                        error.textContent = errorMessage;
                        field.classList.add('invalid');
                        isValid = false;
                    } else {
                        error.textContent = '';
                        field.classList.remove('invalid');
                    }
                }

                validateField('name', 'nameError', 'Full name is required.');
                validateField('phone', 'phoneError', 'Phone number is required.');
                validateField('address', 'addressError', 'Address is required.');
                validateField('country', 'countryError', 'Please select a country.');
                validateField('city', 'cityError', 'Please select a city.');

                if (isValid) {
                    alert('Form submitted successfully!');
                    document.getElementById('checkoutForm').submit();
                }
            });

            checkCartCheckout();
        }
    }

    setupProductsPage();
    setupCheckoutPage();
});