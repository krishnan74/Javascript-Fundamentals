import { products } from "./data.js";

// State management
class Store {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.filters = {
      category: null,
      search: "",
    };
  }

  addToCart(productId) {
    const existingItem = this.cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: productId,
        quantity: 1,
      });
    }
    this.saveCart();
    this.updateCartUI();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
  }

  updateQuantity(productId, delta) {
    const item = this.cart.find((item) => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, item.quantity + delta);
      if (item.quantity === 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
        this.updateCartUI();
      }
    }
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  getProduct(productId) {
    return products.find((p) => p.id === productId);
  }

  calculateTotals() {
    const subtotal = this.cart.reduce((sum, item) => {
      const product = this.getProduct(item.id);
      return sum + product.price * item.quantity;
    }, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }

  updateCartUI() {
    // Update cart count
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartCount").textContent = totalItems;

    // Update cart items
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    this.cart.forEach((item) => {
      const product = this.getProduct(item.id);
      const cartItemElement = document.createElement("div");
      cartItemElement.className = "cart-item";
      cartItemElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="store.updateQuantity(${
                      product.id
                    }, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="store.updateQuantity(${
                      product.id
                    }, 1)">+</button>
                </div>
                <button class="remove-item" onclick="store.removeFromCart(${
                  product.id
                })">
                    <i class="fas fa-trash"></i>
                </button>
            `;
      cartItemsContainer.appendChild(cartItemElement);
    });

    // Update totals
    const { subtotal, tax, total } = this.calculateTotals();
    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
  }

  filterProducts() {
    return products.filter((product) => {
      const matchesCategory =
        !this.filters.category || product.category === this.filters.category;
      const matchesSearch =
        !this.filters.search ||
        product.name
          .toLowerCase()
          .includes(this.filters.search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.filters.search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  renderProducts() {
    const filteredProducts = this.filterProducts();
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";

    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className = "product-card";
      productElement.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p>${product.description}</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" onclick="store.addToCart(${
                      product.id
                    })">
                        Add to Cart
                    </button>
                </div>
            `;
      container.appendChild(productElement);
    });
  }

  setupCategoryFilters() {
    const categories = [...new Set(products.map((p) => p.category))];
    const container = document.getElementById("categoryFilters");

    // Add "All" button
    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.className = this.filters.category === null ? "active" : "";
    allButton.onclick = () => {
      this.filters.category = null;
      this.updateCategoryButtons();
      this.renderProducts();
    };
    container.appendChild(allButton);

    // Add category buttons
    categories.forEach((category) => {
      const button = document.createElement("button");
      button.textContent = category;
      button.className = this.filters.category === category ? "active" : "";
      button.onclick = () => {
        this.filters.category = category;
        this.updateCategoryButtons();
        this.renderProducts();
      };
      container.appendChild(button);
    });
  }

  updateCategoryButtons() {
    const buttons = document.querySelectorAll(".category-filters button");
    buttons.forEach((button) => {
      if (
        (button.textContent === "All" && this.filters.category === null) ||
        button.textContent === this.filters.category
      ) {
        button.className = "active";
      } else {
        button.className = "";
      }
    });
  }
}

// Initialize store
const store = new Store();

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize products and categories
  store.renderProducts();
  store.setupCategoryFilters();
  store.updateCartUI();

  // Setup search
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  const performSearch = () => {
    store.filters.search = searchInput.value;
    store.renderProducts();
  };

  searchInput.addEventListener("input", () => {
    performSearch();
  });

  // searchInput.addEventListener("keyup", (e) => {
  //   if (e.key === "Enter") {
  //     performSearch();
  //   }
  // });

  searchBtn.addEventListener("click", performSearch);

  // Setup cart modal
  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");
  const closeBtn = document.querySelector(".close");

  cartBtn.addEventListener("click", () => {
    cartModal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Setup checkout
  const checkoutBtn = document.getElementById("checkoutBtn");
  checkoutBtn.addEventListener("click", () => {
    if (store.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(
      "Thank you for your purchase! This is a demo, so no actual purchase was made."
    );
    store.cart = [];
    store.saveCart();
    store.updateCartUI();
    cartModal.style.display = "none";
  });
});

// Make store globally available
window.store = store;
