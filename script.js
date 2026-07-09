/* ==========================================================================
   IMANI BOUTIQUE - COMPLETE SCRIPT.JS WITH DYNAMIC SEARCH & NO-CODE ARRAYS
   ========================================================================== */

// 1. URUTONDE RW'IBICURUZWA (Guhindura hano bisezera kuri code za HTML!)
let productsData = [
    {
        pCode: "SH01",
        category: "imyenda",
        subCategory: "shirts",
        subCatTitleRw: "👔 Amashati", subCatTitleEn: "👔 Shirts", subCatTitleFr: "👔 Chemises",
        titleRw: "Ishati ya Pamba y'akazi", titleEn: "Cotton Office Shirt", titleFr: "Chemise en Coton",
        price: 15000,
        image: "images/ishati_pamba.png"
    },
    {
        pCode: "PT01",
        category: "imyenda",
        subCategory: "trousers",
        subCatTitleRw: "👖 Amapantalo", subCatTitleEn: "👖 Trousers", subCatTitleFr: "👖 Pantalons",
        titleRw: "Ipantalo ya Jean y'abagabo", titleEn: "Men's Denim Jeans", titleFr: "Pantalon Jean Homme",
        price: 18000,
        image: "images/pantalo_jean.png"
    },
    {
        pCode: "PT02",
        category: "imyenda",
        subCategory: "trousers",
        subCatTitleRw: "👖 Amapantalo", subCatTitleEn: "👖 Trousers", subCatTitleFr: "👖 Pantalons",
        titleRw: "Ipantalo ya Chino (Khaqi)", titleEn: "Chino Casual Trouser", titleFr: "Pantalon Chino",
        price: 16000,
        image: "images/pantalo_chino.png"
    },
    {
        pCode: "DR02",
        category: "imyenda",
        subCategory: "dresses",
        subCatTitleRw: "👗 Amakanzu", subCatTitleEn: "👗 Dresses", subCatTitleFr: "👗 Robes",
        titleRw: "Ikanzu nziza y'Igisirimu (Modèle 2)", titleEn: "Elegant Modern Dress v2", titleFr: "Superbe Robe Dame v2",
        price: 25000,
        image: "images/ikanzu2.png"
    },
    {
        pCode: "DR03",
        category: "imyenda",
        subCategory: "dresses",
        subCatTitleRw: "👗 Amakanzu", subCatTitleEn: "👗 Dresses", subCatTitleFr: "👗 Robes",
        titleRw: "Ikanzu nshya y'ibirori (Modèle 3)", titleEn: "Elegant Party Dress v3", titleFr: "Robe de Fête Chic v3",
        price: 28000,
        image: "images/ikanzu3.png"
    },
    {
        pCode: "DR09",
        category: "imyenda",
        subCategory: "dresses",
        subCatTitleRw: "👗 Amakanzu", subCatTitleEn: "👗 Dresses", subCatTitleFr: "👗 Robes",
        titleRw: "Ikanzu y'Abadamu itajyanye n'igihe (Modèle 9)", titleEn: "Classy Women Dress v9", titleFr: "Robe Dame de Classe v9",
        price: 30000,
        image: "images/ikanzu9.png"
    },
    {
        pCode: "CP01",
        category: "complete",
        subCategory: "completes",
        subCatTitleRw: "👔 Complete", subCatTitleEn: "👔 Complete Suits", subCatTitleFr: "👔 Costumes Complets",
        titleRw: "Complete y'abadamu ishyitse", titleEn: "Elegant Women's Suit", titleFr: "Costume Dame Élégant",
        price: 35000,
        image: "images/complete1.png"
    },
    {
        pCode: "SW01",
        category: "imyenda",
        subCategory: "sweaters",
        subCatTitleRw: "👕 Imipira", subCatTitleEn: "👕 Sweaters & T-Shirts", subCatTitleFr: "👕 Sweaters & T-Shirts",
        titleRw: "Umupira wa Hoodie ugezweho", titleEn: "Trendy Hoodie Sweater", titleFr: "Sweat à Capuche",
        price: 15000,
        image: "images/umpira_hoodie.png"
    },
    {
        pCode: "CT01",
        category: "imyenda",
        subCategory: "coats",
        subCatTitleRw: "🧥 Amakote", subCatTitleEn: "🧥 Coats & Jackets", subCatTitleFr: "🧥 Vestes & Manteaux",
        titleRw: "Ikote rya Blazer rigezweho", titleEn: "Modern Blazer Jacket", titleFr: "Veste Blazer Moderne",
        price: 30000,
        image: "images/ikote_vibe.png"
    },
    {
        pCode: "HT01",
        category: "accessories",
        subCategory: "hats",
        subCatTitleRw: "🧢 Ingofero", subCatTitleEn: "🧢 Hats & Caps", subCatTitleFr: "🧢 Chapeaux & Casquettes",
        titleRw: "Ingofero ya Cap ishyitse", titleEn: "Classic Sports Cap", titleFr: "Casquette Classique",
        price: 8000,
        image: "images/ingofero_cap.png"
    }
];

let cart = [];
let langOrder = ['rw', 'en', 'fr'];
let currentLangIndex = 0; 
let currentLang = 'rw';

let activeZoomTitleRw = "";
let activeZoomTitleEn = "";
let activeZoomTitleFr = "";

const MY_WHATSAPP_NUMBER = "250788249341"; 
const COMMISSION_RATE = 0.02; 

// 2. RENDERING PRODUCTS DYNAMICALLY
function renderProducts() {
    const wrapper = document.getElementById('product-container-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = ""; 

    let subCategories = [...new Set(productsData.map(p => p.subCategory))];

    subCategories.forEach(subCat => {
        let subCatProducts = productsData.filter(p => p.subCategory === subCat);
        if (subCatProducts.length === 0) return;

        let firstProd = subCatProducts[0];
        let subTitle = currentLang === 'rw' ? firstProd.subCatTitleRw : (currentLang === 'en' ? firstProd.subCatTitleEn : firstProd.subCatTitleFr);

        let sectionHtml = `
            <div class="sub-category-section" data-parent-category="${firstProd.category}" id="sec-${subCat}">
                <h3 class="sub-cat-title">${subTitle}</h3>
                <div class="product-grid">
        `;

        subCatProducts.forEach(prod => {
            let title = currentLang === 'rw' ? prod.titleRw : (currentLang === 'en' ? prod.titleEn : prod.titleFr);
            let btnText = currentLang === 'rw' ? "Shyira mu gikapu" : (currentLang === 'en' ? "Add to Cart" : "Ajouter au Panier");

            sectionHtml += `
                <div class="product-card">
                    <div class="product-img-box" onclick="openZoom('${prod.image}', '${prod.titleRw.replace(/'/g, "\\'")}', '${prod.titleEn.replace(/'/g, "\\'")}', '${prod.titleFr.replace(/'/g, "\\'")}')">
                        <img src="${prod.image}" alt="${title}" class="product-img">
                        <span class="zoom-hint">Code: ${prod.pCode}</span>
                    </div>
                    <h4 class="p-title">${title}</h4>
                    <p class="price">${prod.price.toLocaleString()} RWF</p>
                    <button class="btn-add" onclick="addToCart('${prod.titleRw.replace(/'/g, "\\'")}', ${prod.price}, '${prod.titleEn.replace(/'/g, "\\'")}', '${prod.titleFr.replace(/'/g, "\\'")}', '${prod.pCode}', event)">${btnText}</button>
                </div>
            `;
        });

        sectionHtml += `</div></div>`;
        wrapper.innerHTML += sectionHtml;
    });
}

// 3. SEARCH FUNCTION (ISHAKIRO)
function searchProducts() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        let title = card.querySelector('.p-title').textContent.toLowerCase();
        let code = card.querySelector('.zoom-hint').textContent.toLowerCase();
        
        if (title.includes(input) || code.includes(input)) {
            card.style.setProperty('display', '', '');
        } else {
            card.style.setProperty('display', 'none', 'important');
        }
    });

    let sections = document.querySelectorAll('.sub-category-section');
    sections.forEach(sec => {
        let allCards = sec.querySelectorAll('.product-card');
        let hiddenCount = 0;
        allCards.forEach(c => {
            if (c.style.display === "none") hiddenCount++;
        });
        
        if (hiddenCount === allCards.length) {
            sec.style.setProperty('display', 'none', 'important');
        } else {
            sec.style.setProperty('display', 'flex', '');
        }
    });
}

function getReferralName() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('ref');
}

function filterCategory(category, button) {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const sections = document.querySelectorAll('.sub-category-section');
    sections.forEach(sec => {
        const parentCat = sec.getAttribute('data-parent-category');
        if (category === 'all' || parentCat === category) {
            sec.style.setProperty('display', 'flex', '');
        } else {
            sec.style.setProperty('display', 'none', 'important');
        }
    });
}

function openZoom(imgSrc, titleRw, titleEn, titleFr) {
    activeZoomTitleRw = titleRw;
    activeZoomTitleEn = titleEn;
    activeZoomTitleFr = titleFr;
    
    const modal = document.getElementById('zoom-modal');
    const zoomImg = document.getElementById('zoom-img');
    const caption = document.getElementById('zoom-caption');
    
    if (modal && zoomImg && caption) {
        modal.style.display = "block";
        zoomImg.src = imgSrc;
        
        if (currentLang === 'rw') caption.textContent = titleRw;
        else if (currentLang === 'en') caption.textContent = titleEn;
        else caption.textContent = titleFr;
    }
}

function closeZoom() {
    const modal = document.getElementById('zoom-modal');
    if (modal) modal.style.display = "none";
}

const termsData = {
    rw: `
        <p><strong>1. Gutwara ibicuruzwa n'ikiguzi cy'urugendo:</strong> Ibyo mwahashye mugezwaho aho mherereye... <span style="color: #e74c3c; font-weight: bold;">Ikiguzi cy'urugendo kishyurwa n'umukiriya</span>.</p>
        <p><strong>2. Guhindura ibyo mwahashye:</strong> Bitarenze amasaha 48.</p>
        <p><strong>3. Gahunda yo kuranga abaguzi (Referral):</strong> Komisiyonu ya 2% ibarwa ku giciro cy'igicuruzwa.</p>
    `,
    en: `
        <p><strong>1. Delivery & Shipping Fees:</strong> Countrywide within 24 hours. <span style="color: #e74c3c; font-weight: bold;">Paid by customer</span>.</p>
        <p><strong>2. Exchange Policy:</strong> Within 48 hours unused.</p>
        <p><strong>3. Referral System:</strong> 2% commission based on product price.</p>
    `,
    fr: `
        <p><strong>1. Livraison et Frais:</strong> Sous 24h partout au Rwanda. <span style="color: #e74c3c; font-weight: bold;">À la charge du client</span>.</p>
        <p><strong>2. Échange:</strong> Sous 48h non porté.</p>
        <p><strong>3. Parrainage:</strong> Commission de 2% sur le prix du produit.</p>
    `
};

function openTerms() {
    const modal = document.getElementById('terms-modal');
    const body = document.getElementById('terms-body');
    const title = document.getElementById('terms-modal-title');
    
    if (modal && body && title) {
        body.innerHTML = termsData[currentLang];
        if (currentLang === 'rw') title.textContent = "📋 Amategeko n'Amabwiriza";
        else if (currentLang === 'en') title.textContent = "📋 Terms & Conditions";
        else title.textContent = "📋 Termes & Conditions";
        modal.style.display = "block";
    }
}

function closeTerms() {
    const modal = document.getElementById('terms-modal');
    if (modal) modal.style.display = "none";
}

function addToCart(nameRw, price, nameEn, nameFr, pCode, event) {
    const existingProduct = cart.find(item => item.pCode === pCode);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ nameRw, nameEn, nameFr, price, pCode, quantity: 1 });
    }
    
    updateCartUI();
    
    if (event && event.target) {
        const btn = event.target;
        if (currentLang === 'rw') btn.textContent = "✔️ Byashyizwemo";
        else if (currentLang === 'en') btn.textContent = "✔️ Added";
        else btn.textContent = "✔️ Ajouté";
        
        const originalBg = btn.style.backgroundColor;
        btn.style.backgroundColor = "#2ed573"; 
        
        setTimeout(() => {
            if (currentLang === 'rw') btn.textContent = "Shyira mu gikapu";
            else if (currentLang === 'en') btn.textContent = "Add to Cart";
            else btn.textContent = "Ajouter au Panier";
            btn.style.backgroundColor = originalBg || "#1a150e";
        }, 800);
    }
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.textContent = totalCount;

    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        let name = item.nameRw;
        if (currentLang === 'en') name = item.nameEn;
        if (currentLang === 'fr') name = item.nameFr;
        
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${name} [${item.pCode}] (x${item.quantity})</span>
            <span>${itemTotal.toLocaleString()} RWF</span>
        `;
        cartItemsContainer.appendChild(div);
    });

    const cartTotalEl = document.getElementById('cart-total');
    if (cartTotalEl) cartTotalEl.textContent = `${totalPrice.toLocaleString()} RWF`;
    generateWhatsAppLink();
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.toggle('open');
}

function checkCartEmpty(e) {
    if (cart.length === 0) {
        if (e) e.preventDefault();
        if (currentLang === 'rw') alert("Igikapu cyawe kiracyarimo ubusa!");
        else if (currentLang === 'en') alert("Your cart is empty!");
        else alert("Votre panier est vide!");
        return false;
    }
    const checkbox = document.getElementById('accept-terms-checkbox');
    if (checkbox && !checkbox.checked) {
        if (e) e.preventDefault();
        if (currentLang === 'rw') alert("Ugomba kubanza kwemera amategeko n'amabwiriza!");
        else if (currentLang === 'en') alert("You must accept the terms!");
        else alert("Vous devez accepter les termes !");
        return false;
    }
    return true;
}

function generateWhatsAppLink() {
    if (cart.length === 0) return;
    let message = "";
    let total = 0;
    const refName = getReferralName();
    cart.forEach(item => { total += item.price * item.quantity; });
    const commissionAmount = total * COMMISSION_RATE; 

    if (currentLang === 'rw') {
        message = `Muraho *Imani Boutique*, ndashaka guhahira kuri uru rubuga. Dore ibyo ntoranyije:\n\n`;
        cart.forEach(item => { message += `• *${item.nameRw}* (Code: _${item.pCode}_) x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} RWF\n`; });
        message += `\n*Igiteranyo cyose:* ${total.toLocaleString()} RWF\n`;
        if (refName) message += `\n📢 *Referral:* *${refName}* (${commissionAmount.toLocaleString()} RWF)`;
    } else if (currentLang === 'en') {
        message = `Hello *Imani Boutique*, I would like to order. Here are my items:\n\n`;
        cart.forEach(item => { message += `• *${item.nameEn}* (Code: _${item.pCode}_) x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} RWF\n`; });
        message += `\n*Total Price:* ${total.toLocaleString()} RWF\n`;
        if (refName) message += `\n📢 *Referral:* *${refName}* (${commissionAmount.toLocaleString()} RWF)`;
    } else {
        message = `Bonjour *Imani Boutique*, je souhaite passer une commande :\n\n`;
        cart.forEach(item => { message += `• *${item.nameFr}* (Code: _${item.pCode}_) x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} RWF\n`; });
        message += `\n*Montant Total:* ${total.toLocaleString()} RWF\n`;
        if (refName) message += `\n📢 *Referral:* *${refName}* (${commissionAmount.toLocaleString()} RWF)`;
    }
    const whatsappLinkEl = document.getElementById('whatsapp-link');
    if (whatsappLinkEl) whatsappLinkEl.href = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const translations = {
    rw: { langBtn: "🇬🇧 English", home: "Ahabanza", products: "Ibicuruzwa", cart: "Igikapu", heroTitle: "Berwa natwe", heroDesc: "Yaba imyenda cyangwa inkweto zigezweho, byose urabisanga hano.", heroBadge: "📍 Aho uherereye hose turakugezaho ibyo waguze bitarenze amasaha 24!", heroBtn: "Tangira uhahe", sectionTitle: "Ibyagezweho bitajya biva ku gihe", cartTitle: "Igikapu cyawe", totalText: "Igiteranyo:", whatsappBtn: "Yohereza kuri WhatsApp", footer: "© 2026 Imani Boutique. Uburenganzira bwose burasuguye.", termsLink: "📋 Amategeko n'Amabwiriza by'Iduka", catAll: "Byose", catClothes: "Imyenda", catComplete: "Complete", catShoes: "Inkweto n'Ingofero", addBtn: "Shyira mu gikapu", acceptTerms: "Ndemeranya n'amategeko n'amabwiriza by'iduka.", placeholderText: "Shakisha igicuruzwa..." },
    en: { langBtn: "🇫🇷 Français", home: "Home", products: "Products", cart: "Cart", heroTitle: "Be Stylish With Us", heroDesc: "Whether it's trendy clothes or modern shoes, find it all here.", heroBadge: "📍 Wherever you are, we deliver your orders within 24 hours!", heroBtn: "Start Shopping", sectionTitle: "Timeless Trends", cartTitle: "Your Cart", totalText: "Total:", whatsappBtn: "Send Order to WhatsApp", footer: "© 2026 Imani Boutique. All rights reserved.", termsLink: "📋 Store Terms & Conditions", catAll: "All", catClothes: "Clothes", catComplete: "Suits", catShoes: "Shoes & Hats", addBtn: "Add to Cart", acceptTerms: "I agree to the store terms & conditions.", placeholderText: "Search for a product..." },
    fr: { langBtn: "🇷🇼 Kinyarwanda", home: "Accueil", products: "Produits", cart: "Panier", heroTitle: "Soyez Élégant Avec Nous", heroDesc: "Qu'il s'agisse de vêtements tendance ou de chaussures modernes, dont tout ici.", heroBadge: "📍 Où que vous soyez, nous livrons vos commandes en moins de 24h !", heroBtn: "Commencer vos Achats", sectionTitle: "Tendances Intemporelles", cartTitle: "Votre Panier", totalText: "Total :", whatsappBtn: "Envoyer la commande sur WhatsApp", footer: "© 2026 Imani Boutique. Tous droits réservés.", termsLink: "📋 Termes & Conditions du Magasin", catAll: "Tout", catClothes: "Vêtements", catComplete: "Costumes", catShoes: "Chaussures & Chapeaux", addBtn: "Ajouter au Panier", acceptTerms: "J'accepte les termes & conditions du magasin.", placeholderText: "Rechercher un produit..." }
};

function cycleLanguage() {
    currentLangIndex = (currentLangIndex + 1) % langOrder.length;
    currentLang = langOrder[currentLangIndex];
    const langData = translations[currentLang];

    if (document.getElementById('lang-btn')) document.getElementById('lang-btn').textContent = langData.langBtn;
    if (document.getElementById('nav-home')) document.getElementById('nav-home').textContent = langData.home;
    if (document.getElementById('nav-products')) document.getElementById('nav-products').textContent = langData.products;
    if (document.getElementById('nav-cart-text')) document.getElementById('nav-cart-text').textContent = langData.cart;
    if (document.getElementById('hero-title')) document.getElementById('hero-title').textContent = langData.heroTitle;
    if (document.getElementById('hero-desc')) document.getElementById('hero-desc').textContent = langData.heroDesc;
    if (document.getElementById('hero-badge')) document.getElementById('hero-badge').textContent = langData.heroBadge;
    if (document.getElementById('hero-btn')) document.getElementById('hero-btn').textContent = langData.heroBtn;
    if (document.getElementById('section-title')) document.getElementById('section-title').textContent = langData.sectionTitle;
    if (document.getElementById('cart-drawer')) document.getElementById('cart-drawer').querySelector('h2').textContent = langData.cartTitle;
    if (document.getElementById('total-text')) document.getElementById('total-text').textContent = langData.totalText;
    if (document.getElementById('whatsapp-btn-text')) document.getElementById('whatsapp-btn-text').textContent = langData.whatsappBtn;
    if (document.getElementById('footer-text')) document.getElementById('footer-text').textContent = langData.footer;
    if (document.getElementById('footer-terms-link')) document.getElementById('footer-terms-link').textContent = langData.termsLink;
    if (document.getElementById('lbl-accept-terms')) document.getElementById('lbl-accept-terms').textContent = langData.acceptTerms;
    if (document.getElementById('search-input')) document.getElementById('search-input').placeholder = langData.placeholderText;
    
    if (document.getElementById('cat-all')) document.getElementById('cat-all').textContent = langData.catAll;
    if (document.getElementById('cat-clothes')) document.getElementById('cat-clothes').textContent = langData.catClothes;
    if (document.getElementById('cat-complete')) document.getElementById('cat-complete').textContent = langData.catComplete;
    if (document.getElementById('cat-shoes')) document.getElementById('cat-shoes').textContent = langData.catShoes;

    renderProducts();
    updateCartUI();
}

// Hamagara bwa mbere urubuga rufunguka
window.onload = function() {
    renderProducts();
};
