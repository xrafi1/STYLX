# STYLX - Clothing E-commerce Website

A modern, responsive clothing e-commerce website with Firebase backend and a separate admin panel for product management.

## 🌟 Features

### Customer-Facing Website (index.html)
- **Modern UI/UX**: Clean, responsive design with gradient themes
- **Product Catalog**: Display products with images, prices, and descriptions
- **Category Filtering**: Filter products by Men, Women, and Accessories
- **Shopping Cart**: Add products to cart with live counter
- **Responsive Design**: Mobile-friendly layout
- **Smooth Navigation**: Anchor-based smooth scrolling

### Admin Panel (admin.html) - Separate URL
- **Firebase Authentication**: Secure email/password login
- **Product Management**: Add, view, and delete products
- **Real-time Updates**: Changes reflect immediately on the main website
- **Protected Access**: Only authenticated admins can access
- **User-friendly Interface**: Easy-to-use product management forms

## 🚀 Quick Start

### Prerequisites
- A Firebase account
- Basic knowledge of HTML/CSS/JavaScript
- A web browser

### Setup Instructions

#### 1. Clone the Repository
```bash
git clone https://github.com/xrafi1/STYLX.git
cd STYLX
```

#### 2. Firebase Setup

**Enable Firebase Authentication:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `stylx-6c701`
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** authentication
5. Add an admin user in the **Users** tab

**Enable Cloud Firestore:**
1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Start in **Test mode** (for development)
4. Select your preferred location
5. Click **Enable**

**Set Firestore Rules (Optional - for production):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

#### 3. Deploy the Website

You have multiple options:

**Option A: GitHub Pages**
1. Go to repository Settings → Pages
2. Select `main` branch as source
3. Access at: `https://xrafi1.github.io/STYLX/`
4. Admin panel: `https://xrafi1.github.io/STYLX/admin.html`

**Option B: Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

**Option C: Local Development**
```bash
# Using Python
python -m http.server 8000
# Or using Node.js
npx http-server
```

## 📁 Project Structure

```
STYLX/
├── index.html          # Main e-commerce website
├── admin.html          # Admin panel (separate URL)
├── styles.css          # Website styling
├── script.js           # Frontend JavaScript
├── admin.js            # Admin panel JavaScript
└── README.md           # Documentation
```

## 🔐 Admin Access

### Creating Admin Users

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Authentication** → **Users**
3. Click **Add user**
4. Enter email and password
5. Click **Add user**

### Login Credentials
- **URL**: `your-domain.com/admin.html`
- **Email**: The email you created in Firebase Authentication
- **Password**: The password you set

## 🎨 Customization

### Change Colors
Edit `styles.css` and modify the CSS variables:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Product Categories
1. Update `index.html` - Add filter buttons
2. Update `admin.html` - Add category options
3. Update `script.js` - Modify filter logic

### Modify Firebase Config
If you want to use your own Firebase project:
1. Create a new Firebase project
2. Get your config from Project Settings
3. Replace `firebaseConfig` in:
   - `index.html` (line ~81)
   - `admin.html` (line ~86)

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and animations
- **JavaScript (ES6+)**: Interactive functionality
- **Firebase Authentication**: Secure admin login
- **Cloud Firestore**: NoSQL database for products
- **GitHub**: Version control and hosting

## 📱 Features in Detail

### Product Display
- Grid layout with responsive columns
- Image placeholders (can be replaced with actual images)
- Price display with formatting
- Add to cart functionality
- Category-based filtering

### Admin Features
- **Add Products**: Name, category, price, description, image URL
- **View Products**: List of all products with details
- **Delete Products**: Remove products with confirmation
- **Authentication**: Secure login/logout

## 🔒 Security Notes

- Admin panel requires Firebase Authentication
- Firestore rules should be configured for production
- Never commit Firebase private keys to public repositories
- Use environment variables for sensitive data in production

## 🚧 Future Enhancements

- [ ] Shopping cart persistence
- [ ] Checkout and payment integration
- [ ] User accounts and order history
- [ ] Product search functionality
- [ ] Image upload for products
- [ ] Inventory management
- [ ] Order management system
- [ ] Email notifications

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

**xrafi1**
- GitHub: [@xrafi1](https://github.com/xrafi1)
- Project: [STYLX](https://github.com/xrafi1/STYLX)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Built with ❤️ using Firebase and modern web technologies**
