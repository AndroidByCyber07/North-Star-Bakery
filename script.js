// ==========================================
// North Star Bakery - Touchstone 4 JavaScript
// Caitlyn Hyde
// ==========================================

// Product data - Array 1
const products = [
    {
        name: "Signature Loaf",
        category: "Breads",
        price: "$5-$9",
        description: "A crusty handmade bread baked fresh for customers."
    },
    {
        name: "Morning Pastry",
        category: "Pastries",
        price: "$3-$6",
        description: "A flaky pastry that is perfect with breakfast or coffee."
    },
    {
        name: "Seasonal Pastry",
        category: "Pastries",
        price: "$3-$6",
        description: "A rotating sweet treat featuring seasonal flavors."
    },
    {
        name: "Celebration Cake",
        category: "Cakes",
        price: "$30-$75",
        description: "A cake prepared for birthdays and special events."
    }
];

// Category data - Array 2
const categories = [
    "All Products",
    "Breads",
    "Pastries",
    "Cakes"
];


// ==========================================
// PRODUCT FEATURE
// ==========================================

function createCategoryOptions() {
    const categorySelect = document.getElementById("category-filter");

    if (!categorySelect) {
        return;
    }

    categorySelect.innerHTML = "";

    categories.forEach(function(category) {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categorySelect.appendChild(option);
    });
}


function displayProducts(category) {
    const productList = document.getElementById("product-list");

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

        const productCard = document.createElement("article");

        productCard.className = "product-card";

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

            <p>${product.description}</p>

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


function saveFavorite(productName) {

    localStorage.setItem(
        "northStarFavorite",
        productName
    );

    const favoriteMessage =
        document.getElementById("favorite-message");

    if (favoriteMessage) {

        favoriteMessage.textContent =
            "★ Your favorite is saved: " +
            productName;
    }

    updateFavoriteButtons(productName);
}


function loadFavorite() {

    const savedFavorite =
        localStorage.getItem("northStarFavorite");

    const favoriteMessage =
        document.getElementById("favorite-message");

    if (savedFavorite && favoriteMessage) {

        favoriteMessage.textContent =
            "★ Your saved favorite: " +
            savedFavorite;
    }
}


function updateFavoriteButtons(savedFavorite) {

    const buttons =
        document.querySelectorAll(".favorite-button");

    buttons.forEach(function(button) {

        if (button.dataset.product === savedFavorite) {

            button.textContent =
                "★ Favorite Saved";

        } else {

            button.textContent =
                "☆ Save as Favorite";
        }
    });
}


function addFavoriteListeners() {

    const buttons =
        document.querySelectorAll(".favorite-button");

    buttons.forEach(function(button) {

        button.addEventListener("click", function() {

            saveFavorite(
                button.dataset.product
            );

        });

    });
}


// ==========================================
// FORM VALIDATION
// ==========================================

function validateForm(event) {

    // Stop the form from submitting
    // until JavaScript checks everything.
    event.preventDefault();

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const pickupDate =
        document.getElementById("pickup-date");

    const requestType =
        document.getElementById("request-type");

    const itemDetails =
        document.getElementById("item-details");

    let isValid = true;

    // Remove old errors first
    clearErrors();


    // NAME CHECK

    if (name.value.trim() === "") {

        showError(
            name,
            "Please enter your name."
        );

        isValid = false;

    } else if (name.value.trim().length < 2) {

        showError(
            name,
            "Name must be at least 2 characters long."
        );

        isValid = false;
    }


    // EMAIL CHECK

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        showError(
            email,
            "Please enter your email address."
        );

        isValid = false;

    } else if (!emailPattern.test(email.value.trim())) {

        showError(
            email,
            "Please enter a valid email address."
        );

        isValid = false;
    }


    // PICKUP DATE CHECK

    if (pickupDate.value === "") {

        showError(
            pickupDate,
            "Please select a pickup date."
        );

        isValid = false;
    }


    // REQUEST TYPE CHECK

    if (requestType.value === "") {

        showError(
            requestType,
            "Please select a request type."
        );

        isValid = false;
    }


    // ITEM DETAILS CHECK

    if (itemDetails.value.trim() === "") {

        showError(
            itemDetails,
            "Please describe your request."
        );

        isValid = false;

    } else if (itemDetails.value.trim().length < 5) {

        showError(
            itemDetails,
            "Please enter at least 5 characters."
        );

        isValid = false;
    }


    // SUCCESS MESSAGE

    if (isValid) {

        showSuccessMessage();

    }
}


// ==========================================
// THIS IS THE FUNCTION YOU COULD NOT FIND
// ==========================================

function showError(field, message) {

    const error =
        document.createElement("span");

    error.className =
        "error-message";

    error.textContent =
        message;

    field.parentElement.appendChild(error);

    field.classList.add("input-error");
}


// Remove previous errors

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


// Successful form message

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
// INITIALIZE PRODUCTS PAGE
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
// INITIALIZE CONTACT PAGE
// ==========================================

function initializeContactPage() {

    const form =
        document.getElementById(
            "order-form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        validateForm
    );
}


// ==========================================
// START JAVASCRIPT
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeProductsPage();

        initializeContactPage();

    }
);
// Start the appropriate JavaScript
document.addEventListener("DOMContentLoaded", function() {
    initializeProductsPage();
    initializeContactPage();
});
