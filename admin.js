// Check authentication status on page load
window.onAuthStateChanged(window.auth, (user) => {
    if (user) {
        // User is logged in
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        loadProducts();
    } else {
        // User is logged out
        document.getElementById('login-section').style.display = 'flex';
        document.getElementById('admin-section').style.display = 'none';
    }
});

// Login function
window.login = async function() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    if (!email || !password) {
        errorDiv.textContent = 'Please enter email and password';
        return;
    }
    
    try {
        await window.signInWithEmailAndPassword(window.auth, email, password);
        errorDiv.textContent = '';
    } catch (error) {
        console.error('Login error:', error);
        errorDiv.textContent = 'Login failed: ' + error.message;
    }
}

// Logout function
window.logout = async function() {
    try {
        await window.signOut(window.auth);
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Add product function
window.addProduct = async function() {
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const image = document.getElementById('product-image').value;
    const messageDiv = document.getElementById('add-message');
    
    if (!name || !price || !description || !image) {
        messageDiv.innerHTML = '<p class="error">Please fill all fields</p>';
        return;
    }
    
    try {
        await window.addDoc(window.collection(window.db, 'products'), {
            name: name,
            category: category,
            price: price,
            description: description,
            image: image,
            createdAt: new Date().toISOString()
        });
        
        messageDiv.innerHTML = '<p class="success">Product added successfully!</p>';
        
        // Clear form
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-description').value = '';
        document.getElementById('product-image').value = '';
        
        // Reload products
        loadProducts();
        
        // Clear message after 3 seconds
        setTimeout(() => {
            messageDiv.innerHTML = '';
        }, 3000);
    } catch (error) {
        console.error('Error adding product:', error);
        messageDiv.innerHTML = '<p class="error">Error adding product: ' + error.message + '</p>';
    }
}

// Load products function
async function loadProducts() {
    const container = document.getElementById('products-container');
    
    try {
        const querySnapshot = await window.getDocs(window.collection(window.db, 'products'));
        
        if (querySnapshot.empty) {
            container.innerHTML = '<p>No products yet. Add your first product above!</p>';
            return;
        }
        
        container.innerHTML = '';
        
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <div>
                    <strong>${product.name}</strong> - 
                    <span>$${product.price.toFixed(2)}</span> - 
                    <span>${product.category}</span>
                    <br>
                    <small>${product.description}</small>
                </div>
                <button class="delete-btn" onclick="deleteProduct('${doc.id}')">Delete</button>
            `;
            container.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        container.innerHTML = '<p class="error">Error loading products. Make sure Firestore is enabled in your Firebase project.</p>';
    }
}

// Delete product function
window.deleteProduct = async function(productId) {
    if (!confirm('Are you sure you want to delete this product?')) {
        return;
    }
    
    try {
        await window.deleteDoc(window.doc(window.db, 'products', productId));
        loadProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + error.message);
    }
}

// Enter key support for login
document.addEventListener('DOMContentLoaded', () => {
    const loginPassword = document.getElementById('login-password');
    if (loginPassword) {
        loginPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    }
});
