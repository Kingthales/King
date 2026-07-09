/* ==========================================================================
   IMANI BOUTIQUE - DYNAMIC FIREBASE INTEGRATION SCRIPT
   ========================================================================== */

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA7xGxqx6Ev3bC0P",
    authDomain: "imani-boutique-5732c.firebaseapp.com",
    projectId: "imani-boutique-5732c",
    storageBucket: "imani-boutique-5732c.appspot.com",
    messagingSenderId: "997952531040",
    appId: "1:997952531040:web:69ccf69ca0d2cb2632b53b"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Variables
let productsData = [];
let cart = [];
let langOrder = ['rw', 'en', 'fr'];
let currentLangIndex = 0; 
let currentLang = 'rw';
const MY_WHATSAPP_NUMBER = "250788249341"; 
const COMMISSION_RATE = 0.02; 

// 1. Gukurura amakuru muri Firebase Live
db.collection("products").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    productsData = [];
    snapshot.forEach((doc) => {
        const data = doc.data();
        productsData.push({
            pCode: doc.id.substring(0, 5).toUpperCase(),
            category: data.category ? data.category.toLowerCase() : 'imyenda',
            subCategory: data.category ? data.category.toLowerCase() : 'Ibindi',
            subCatTitleRw: data.category,
            subCatTitleEn: data.category,
            subCatTitleFr: data.category,
            titleRw: data.name,
            titleEn: data.name,
            titleFr: data.name,
            price: parseInt(data.price),
            image: data.image
        });
    });
    renderProducts();
});

// 2. Rendering Products
function renderProducts() {
    const wrapper = document.getElementById('product-container-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = ""; 

    let subCategories = [...new Set(productsData.map(p => p.subCategory))];

    subCategories.forEach(subCat => {
        let subCatProducts = productsData.filter(p => p.subCategory === subCat);
        if (subCatProducts.length === 0) return;

        let firstProd = subCatProducts[0];
        let subTitle = firstProd.subCatTitleRw; 

        let sectionHtml = `
            <div class="sub-category-section" data-parent-category="${firstProd.category}" id="sec-${subCat}">
                <h3 class="sub-cat-title">${subTitle}</h3>
                <div class="product-grid">
        `;

        subCatProducts.forEach(prod => {
            sectionHtml += `
                <div class="product-card">
                    <div class="product-img-box" onclick="openZoom('${prod.image}', '${prod.titleRw.replace(/'/g, "\\'")}')">
                        <img src="${prod.image}" alt="${prod.titleRw}" class="product-img" onerror="this.src='images/logo.png'">
                        <span class="zoom-hint">Code: ${prod.pCode}</span>
                    </div>
                    <h4 class="p-title">${prod.titleRw}</h4>
                    <p class="price">${prod.price.toLocaleString()} RWF</p>
                    <button class="btn-add" onclick="addToCart('${prod.titleRw.replace(/'/g, "\\'")}', ${prod.price}, '${prod.pCode}', event)">Shyira mu gikapu</button>
                </div>
            `;
        });

        sectionHtml += `</div></div>`;
        wrapper.innerHTML += sectionHtml;
    });
}

// 3. Cart Management
function addToCart(name, price, pCode, event) {
    const existingProduct = cart.find(item => item.pCode === pCode);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, pCode, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalCount;

    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>${itemTotal.toLocaleString()} RWF</span>
            </div>
        `;
    });
    document.getElementById('cart-total').textContent = `${totalPrice.toLocaleString()} RWF`;
    generateWhatsAppLink();
}

// 4. WhatsApp & Utilities
function generateWhatsAppLink() {
    if (cart.length === 0) return;
    let message = `Mwaramutse Imani Boutique, ndashaka guhahira:\n\n`;
    let total = 0;
    cart.forEach(item => {
        message += `• ${item.name} (x${item.quantity}) - ${(item.price * item.quantity).toLocaleString()} RWF\n`;
        total += (item.price * item.quantity);
    });
    message += `\n*Igiteranyo:* ${total.toLocaleString()} RWF`;
    document.getElementById('whatsapp-link').href = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openZoom(imgSrc, title) {
    const modal = document.getElementById('zoom-modal');
    document.getElementById('zoom-img').src = imgSrc;
    document.getElementById('zoom-caption').textContent = title;
    modal.style.display = "block";
}

function closeZoom() { document.getElementById('zoom-modal').style.display = "none"; }
function toggleCart() { document.getElementById('cart-drawer').classList.toggle('open'); }

