// ==========================================
// North Star Bakery - Touchstone 4 JavaScript
// Created for Caitlyn Hyde
// ==========================================

// Product data
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

// Category data
const categories = [
    "All Products",
    "Breads",
    "Pastries",
    "Cakes"
];

// Display product categories
function createCategoryOptions() {
    const categorySelect = document.getElementById("category-filter");

    if (!categorySelect) {
        return;
    }

    categories.forEach(function(category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Display products based on selected category
function displayProducts(category) {
    const productList = document.getElementById("product-list");

    if (!productList) {
        return;
    }

    productList.innerHTML = "";

    const filteredProducts = category === "All Products"
        ? products
        : products.filter(function(product) {
            return product.category === category;
        });

    if (filteredProducts.length === 0) {
        productList.innerHTML =
            "<p>No products are currently available in this category.</p>";
        return;
    }

    filteredProducts.forEach(function(product) {
        const productCard = document.createElement("article");

        productCard.className = "product-card";

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p>${product.description}</p>
            <button type="button"
                    class="favorite-button"
                    data-product="${product.name}">
                ☆ Save as Favorite
            </button>
        `;

        productList.appendChild(productCard);
    });

    addFavoriteListeners();
}

// Save a favorite product
function saveFavorite(productName) {
    localStorage.setItem("northStarFavorite", productName);

    const favoriteMessage = document.getElementById("favorite-message");

    if (favoriteMessage) {
        favoriteMessage.textContent =
            "★ Your favorite is saved: " + productName;
    }

    updateFavoriteButtons(productName);
}

// Load the saved favorite
function loadFavorite() {
    const savedFavorite = localStorage.getItem("northStarFavorite");
    const favoriteMessage = document.getElementById("favorite-message");

    if (savedFavorite && favoriteMessage) {
        favoriteMessage.textContent =
            "★ Your saved favorite: " + savedFavorite;
    }

    if (savedFavorite) {
        updateFavoriteButtons(savedFavorite);
    }
}

// Update favorite buttons
function updateFavoriteButtons(savedFavorite) {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(function(button) {
        if (button.dataset.product === savedFavorite) {
            button.textContent = "★ Favorite Saved";
        } else {
            button.textContent = "☆ Save as Favorite";
        }
    });
}

// Add click events to favorite buttons
function addFavoriteListeners() {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            saveFavorite(button.dataset.product);
        });
    });

    const savedFavorite = localStorage.getItem("northStarFavorite");

    if (savedFavorite) {
        updateFavoriteButtons(savedFavorite);
    }
}

// Validate the contact/pre-order form
function validateForm(event) {
    const form = document.getElementById("order-form");

    if (!form) {
        return;
    }

    let isValid = true;

    clearErrors();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const itemDetails = document.getElementById("item-details");

    // Required name check
    if (name.value.trim() === "") {
        showError(name, "Please enter your name.");
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, "Name must be at least 2 characters long.");
        isValid = false;
    }

    // Email format check
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        showError(email, "Please enter your email address.");
        isValid = false;
    } else if (!emailPattern.test(email.value.trim())) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    // Item details minimum length check
    if (itemDetails.value.trim() === "") {
        showError(itemDetails, "Please describe your request.");
        isValid = false;
    } else if (itemDetails.value.trim().length < 5) {
        showError(
            itemDetails,
            "Please enter at least 5 characters."
        );
        isValid = false;
    }

    // Prevent submission if invalid
    if (!isValid) {
        event.preventDefault();
    } else {
        showSuccessMessage();
    }
}

// Display an error beside a field
function showError(field, message) {
    const error = document.createElement("span");

    error.className = "error-message";
    error.textContent = message;

    field.parentElement.appendChild(error);
    field.classList.add("input-error");
}

// Remove old validation messages
function clearErrors() {
    const errors = document.querySelectorAll(".error-message");

    errors.forEach(function(error) {
        error.remove();
    });

    const fields = document.querySelectorAll(".input-error");

    fields.forEach(function(field) {
        field.classList.remove("input-error");
    });

    const success = document.getElementById("form-success");

    if (success) {
        success.textContent = "";
    }
}

// Display a successful form message
function showSuccessMessage() {
    const success = document.getElementById("form-success");

    if (success) {
        success.textContent =
            "Thank you! Your request is ready to be submitted.";
    }
}

// Set up the Products page
function initializeProductsPage() {
    const categorySelect = document.getElementById("category-filter");

    if (!categorySelect) {
        return;
    }

    createCategoryOptions();

    categorySelect.addEventListener("change", function() {
        displayProducts(categorySelect.value);
    });

    displayProducts("All Products");
    loadFavorite();
}

// Set up the Contact page
function initializeContactPage() {
    const form = document.getElementById("order-form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", validateForm);
}

// Start the appropriate JavaScript
document.addEventListener("DOMContentLoaded", function() {
    initializeProductsPage();
    initializeContactPage();
});
