/* ==========================================================================
   IMANI BOUTIQUE - DYNAMIC SCRIPT
   ========================================================================== */

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

let cart = [];
let currentLang = 'rw';

// Gukurura amakuru
db.collection("products").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    let wrapper = document.getElementById('product-container-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = ""; 

    snapshot.forEach((doc) => {
        const prod = doc.data();
        wrapper.innerHTML += `
            <div class="product-card">
                <img src="${prod.image}" alt="${prod.name}" style="width:100%; height:130px; object-fit:cover;">
                <h4>${prod.name}</h4>
                <p>${prod.price.toLocaleString()} RWF</p>
                <button onclick="addToCart('${prod.name}', ${prod.price})">Shyira mu gikapu</button>
            </div>
        `;
    });
});

function addToCart(name, price) {
    cart.push({ name, price });
    alert(name + " yongerewe mu gikapu!");
    console.log(cart);
}
