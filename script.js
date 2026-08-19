// ==========================================
// NORTH STAR BAKERY
// TOUCHSTONE 4 JAVASCRIPT
// Caitlyn Hyde
// ==========================================


// ==========================================
// PRODUCT DATA
// ==========================================

const products = [

    {
        name: "Signature Loaf",
        category: "Breads",
        price: "$5-$9",
        description:
            "A crusty handmade bread baked fresh for customers."
    },

    {
        name: "Morning Pastry",
        category: "Pastries",
        price: "$3-$6",
        description:
            "A flaky pastry that is perfect with breakfast or coffee."
    },

    {
        name: "Seasonal Pastry",
        category: "Pastries",
        price: "$3-$6",
        description:
            "A rotating sweet treat featuring seasonal flavors."
    },

    {
        name: "Celebration Cake",
        category: "Cakes",
        price: "$30-$75",
        description:
            "A cake prepared for birthdays and special events."
    }

];


// ==========================================
// CATEGORY DATA
// ==========================================

const categories = [

    "All Products",
    "Breads",
    "Pastries",
    "Cakes"

];


// ==========================================
// CREATE CATEGORY OPTIONS
// ==========================================

function createCategoryOptions() {

    const categorySelect =
        document.getElementById("category-filter");

    if (!categorySelect) {
        return;
    }

    categorySelect.innerHTML = "";

    categories.forEach(function(category) {

        const option =
            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categorySelect.appendChild(option);

    });

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(category) {

    const productList =
        document.getElementById("product-list");

    if (!productList) {
        return;
    }

    productList.innerHTML = "";


    const filteredProducts =
        category === "All Products"
            ? products
            : products.filter(function(product) {

                return product.category === category;

            });


    filteredProducts.forEach(function(product) {

        const productCard =
            document.createElement("article");

        productCard.className =
            "product-card";


        productCard.innerHTML = `

            <h3>${product.name}</h3>

            <p>
                <strong>Category:</strong>
                ${product.category}
            </p>

            <p>
                <strong>Price:</strong>
                ${product.price}
            </p>

            <p>
                ${product.description}
            </p>

            <button
                type="button"
                class="favorite-button"
                data-product="${product.name}">

                ☆ Save as Favorite

            </button>

        `;


        productList.appendChild(productCard);

    });


    addFavoriteListeners();


    const savedFavorite =
        localStorage.getItem("northStarFavorite");


    if (savedFavorite) {

        updateFavoriteButtons(savedFavorite);

    }

}


// ==========================================
// SAVE FAVORITE
// ==========================================

function saveFavorite(productName) {

    localStorage.setItem(
        "northStarFavorite",
        productName
    );


    const favoriteMessage =
        document.getElementById(
            "favorite-message"
        );


    if (favoriteMessage) {

        favoriteMessage.textContent =
            "★ Your favorite is saved: "
            + productName;

    }


    updateFavoriteButtons(productName);

}


// ==========================================
// LOAD FAVORITE
// ==========================================

function loadFavorite() {

    const savedFavorite =
        localStorage.getItem(
            "northStarFavorite"
        );


    const favoriteMessage =
        document.getElementById(
            "favorite-message"
        );


    if (savedFavorite && favoriteMessage) {

        favoriteMessage.textContent =
            "★ Your saved favorite: "
            + savedFavorite;

    }

}


// ==========================================
// UPDATE FAVORITE BUTTONS
// ==========================================

function updateFavoriteButtons(savedFavorite) {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(function(button) {

        if (
            button.dataset.product
            === savedFavorite
        ) {

            button.textContent =
                "★ Favorite Saved";

        }

        else {

            button.textContent =
                "☆ Save as Favorite";

        }

    });

}


// ==========================================
// FAVORITE BUTTON LISTENERS
// ==========================================

function addFavoriteListeners() {

    const buttons =
        document.querySelectorAll(
            ".favorite-button"
        );


    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                saveFavorite(
                    button.dataset.product
                );

            }
        );

    });

}


// ==========================================
// FORM VALIDATION
// ==========================================

function validateForm() {

    const name =
        document.getElementById("name");


    const email =
        document.getElementById("email");


    const pickupDate =
        document.getElementById(
            "pickup-date"
        );


    const requestType =
        document.getElementById(
            "request-type"
        );


    const itemDetails =
        document.getElementById(
            "item-details"
        );


    let isValid = true;


    // Remove old errors

    clearErrors();


    // ======================================
    // NAME VALIDATION
    // ======================================

    if (name.value.trim() === "") {

        showError(
            name,
            "Please enter your name."
        );

        isValid = false;

    }

    else if (
        name.value.trim().length < 2
    ) {

        showError(
            name,
            "Name must be at least 2 characters long."
        );

        isValid = false;

    }


    // ======================================
    // EMAIL VALIDATION
    // ======================================

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email.value.trim() === "") {

        showError(
            email,
            "Please enter your email address."
        );

        isValid = false;

    }

    else if (
        !emailPattern.test(
            email.value.trim()
        )
    ) {

        showError(
            email,
            "Please enter a valid email address."
        );

        isValid = false;

    }


    // ======================================
    // PICKUP DATE VALIDATION
    // ======================================

    if (pickupDate.value === "") {

        showError(
            pickupDate,
            "Please select a pickup date."
        );

        isValid = false;

    }


    // ======================================
    // REQUEST TYPE VALIDATION
    // ======================================

    if (requestType.value === "") {

        showError(
            requestType,
            "Please select a request type."
        );

        isValid = false;

    }


    // ======================================
    // ITEM DETAILS VALIDATION
    // ======================================

    if (itemDetails.value.trim() === "") {

        showError(
            itemDetails,
            "Please describe your request."
        );

        isValid = false;

    }

    else if (
        itemDetails.value.trim().length < 5
    ) {

        showError(
            itemDetails,
            "Please enter at least 5 characters."
        );

        isValid = false;

    }


    // ======================================
    // SUCCESS MESSAGE
    // ======================================

    if (isValid) {

        showSuccessMessage();

    }

}


// ==========================================
// SHOW ERROR
// ==========================================

function showError(field, message) {

    const error =
        document.createElement("span");


    error.className =
        "error-message";


    error.textContent =
        message;


    field.parentElement.appendChild(
        error
    );


    field.classList.add(
        "input-error"
    );

}


// ==========================================
// CLEAR ERRORS
// ==========================================

function clearErrors() {

    const errors =
        document.querySelectorAll(
            ".error-message"
        );


    errors.forEach(function(error) {

        error.remove();

    });


    const fields =
        document.querySelectorAll(
            ".input-error"
        );


    fields.forEach(function(field) {

        field.classList.remove(
            "input-error"
        );

    });


    const success =
        document.getElementById(
            "form-success"
        );


    if (success) {

        success.textContent = "";

    }

}


// ==========================================
// SUCCESS MESSAGE
// ==========================================

function showSuccessMessage() {

    const success =
        document.getElementById(
            "form-success"
        );


    if (success) {

        success.textContent =
            "Thank you! Your request is ready to be submitted.";

    }

}


// ==========================================
// PRODUCTS PAGE
// ==========================================

function initializeProductsPage() {

    const categorySelect =
        document.getElementById(
            "category-filter"
        );


    if (!categorySelect) {

        return;

    }


    createCategoryOptions();


    categorySelect.addEventListener(
        "change",
        function() {

            displayProducts(
                categorySelect.value
            );

        }
    );


    displayProducts(
        "All Products"
    );


    loadFavorite();

}


// ==========================================
// CONTACT PAGE
// ==========================================

function initializeContactPage() {

    const submitButton =
        document.getElementById(
            "submit-request"
        );


    if (!submitButton) {

        return;

    }


    submitButton.addEventListener(
        "click",
        function() {

            validateForm();

        }
    );

}


// ==========================================
// START WEBSITE JAVASCRIPT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeProductsPage();

        initializeContactPage();

    }
);
