// Import Firebase modules
import { collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

let cart = [];
let allProducts = [];

// Load products from Firebase
async function loadProducts() {
    try {
        const productsCollection = collection(window.db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        allProducts = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        displayProducts(allProducts);
    } catch (error) {
        console.error('Error loading products:', error);
        // Display sample products if Firebase is not set up yet
        displaySampleProducts();
    }
}

// Display sample products (fallback)
function displaySampleProducts() {
    const sampleProducts = [
        {
            id: '1',
            name: 'Classic T-Shirt',
            category: 'men',
            price: 29.99,
            description: 'Comfortable cotton t-shirt',
            image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=T-Shirt'
        },
        {
            id: '2',
            name: 'Denim Jeans',
            category: 'women',
            price: 79.99,
            description: 'Stylish denim jeans',
            image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Jeans'
        },
        {
            id: '3',
            name: 'Leather Jacket',
            category: 'men',
            price: 199.99,
            description: 'Premium leather jacket',
            image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Jacket'
        },
        {
            id: '4',
            name: 'Summer Dress',
            category: 'women',
            price: 89.99,
            description: 'Light and breezy summer dress',
            image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Dress'
        },
        {
            id: '5',
            name: 'Sports Watch',
            category: 'accessories',
            price: 149.99,
            description: 'Waterproof sports watch',
            image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=Watch'
        },
        {
            id: '6',
            name: 'Leather Wallet',
            category: 'accessories',
            price: 49.99,
            description: 'Genuine leather wallet',
            image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Wallet'
        }
    ];
    displayProducts(sampleProducts);
}

// Display products on the page
function displayProducts(products) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products by category
function filterProducts(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Add to cart function
window.addToCart = function(id, name, price) 
    // Load existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('stylx_cart') || '[]');
    cart.push({ id, name, price, description: '' });
    localStorage.setItem('stylx_cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('stylx_cart') || '[]');
        document.getElementById('cart-count').textContent = cart.length;

}


// Make cart icon clickable
const cartIcon = document.querySelector('.cart-icon');
if (cartIcon) {
    cartIcon.style.cursor = 'pointer';
    cartIcon.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// Load cart count on page load
window.addEventListener('load', () => {
    updateCartCount();
});

}
