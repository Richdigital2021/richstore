// ==============================
// Product List
// ==============================
const products = [
  { name: "Women's Dress", price: "₦8,000", image: "images/Women Dress1.jpg", category: "clothing", description: "Elegant women's dress." },
  { name: "Skincare Kit", price: "₦5,500", image: "images/skincare.jpg", category: "beauty", description: "Complete skincare kit." },
  { name: "Home Organizer", price: "₦7,200", image: "images/Home Organizer.jpg", category: "home", description: "Multi-purpose home organizer." },
  { name: "Gold Necklace", price: "₦15,000", image: "images/Gold Necklace.jpg", category: "jewelry", description: "24k gold necklace." },
  { name: "Head Set", price: "₦30,000", image: "images/headset1.jpg", category: "electronics", description: "Powerful and sleek headset with good sound." },
  { name: "Makeup Kit", price: "₦5,500", image: "images/makeup kit.jpg", category: "beauty", description: "Complete makeup kit." },
  { name: "Dish Drainer", price: "₦7,200", image: "images/Dish Drainer.jpg", category: "home", description: "Multi-purpose dish drainer." },
  { name: "Cyberpunk-Headphone", price: "₦35,500", image: "images/still-life-wireless-cyberpunk-headphones.jpg", category: "toys", description: "Stylish cyberpunk wireless headphones." },
  { name: "Air Pod", price: "₦15,000", image: "images/airpod.jpg", category: "electronics", description: "Portable purple airpod for iPhones." },
  { name: "Camera", price: "₦120,000", image: "images/camera.jpg", category: "electronics", description: "Powerful and sleek camera with HD lens." },
  { name: "Cream Set", price: "₦7,500", image: "images/creams.jpg", category: "beauty", description: "Set of moisturizing creams for all skin types." },
  { name: "Laptop", price: "₦230,000", image: "images/Laptop.jpg", category: "electronics", description: "High-performance laptop for work and play." },
  { name: "Smart Phone", price: "₦45,000", image: "images/smartphone.jpg", category: "electronics", description: "Affordable smartphone with great features." },
  { name: "Smart Watch", price: "₦15,000", image: "images/smart watch.jpg", category: "electronics", description: "Track your fitness with this stylish watch." },
  { name: "Studio Microphone", price: "₦50,000", image: "images/studio mic.jpg", category: "toys", description: "Professional studio microphone." },
  { name: "VR Camera", price: "₦130,000", image: "images/VR Camera.jpg", category: "toys", description: "Virtual reality-enabled 360° camera." },
  { name: "Black Headphone", price: "₦45,000", image: "images/black-headphones.jpg", category: "electronics", description: "Black stylish headphones with rich sound." }
];

// ==============================
// DOM Elements
// ==============================
const grid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const searchBox = document.getElementById('searchBox');
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementsByClassName('close')[0];
const cartCount = document.getElementById('cartCount');

// ==============================
// Product Rendering
// ==============================
function displayProducts(filteredProducts) {
  grid.innerHTML = '';

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Add product image
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImage.src = product.image;
      modalName.textContent = product.name;
      modalPrice.textContent = product.price;
      modalDescription.textContent = product.description;
    });

    // Add name and price
    const title = document.createElement('h4');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = product.price;

    // ✅ Add to Cart button
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    button.className = 'add-btn';
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product);
    });

    // Append all elements
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);
    grid.appendChild(card);
  });
}


// ==============================
// Filtering & Searching
// ==============================
categoryFilter.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    document.querySelectorAll('#categoryFilter li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');

    const category = e.target.getAttribute('data-category');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
  }
});

searchBox.addEventListener('input', () => {
  const searchTerm = searchBox.value.toLowerCase();
  const filtered = products.filter(product => product.name.toLowerCase().includes(searchTerm));
  displayProducts(filtered);
});

// ==============================
// Modal Handling
// ==============================
closeModal.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// ==============================
// Cart Functionality
// ==============================
let cart = [];

function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
}

  


function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  cartItems.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    const itemTotal = item.qty * parseFloat(item.price.replace(/[₦,]/g, ''));
    total += itemTotal;
    count += item.qty;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button onclick="changeQty('${item.name}', -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.name}', 1)">+</button>
        <button onclick="removeFromCart('${item.name}')">🗑</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.innerHTML = `<strong>Total:</strong> ₦${total.toLocaleString()}`;
  cartCount.textContent = count;
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += delta;
    if (item.qty < 1) {
      cart = cart.filter(i => i.name !== name);
    }
    saveCart();
    updateCartUI();
  }
}




function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartUI();
  }
}


function checkout() {
  const checkoutPage = document.getElementById('checkoutPage');
  const checkoutItems = document.getElementById('checkoutItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const vatEl = document.getElementById('checkoutVAT');
  const discountEl = document.getElementById('checkoutDiscount');
  const totalEl = document.getElementById('checkoutTotal');

  checkoutItems.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const price = parseFloat(item.price.replace(/[₦,]/g, ''));
    const itemTotal = item.qty * price;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} (x${item.qty}): ₦${itemTotal.toLocaleString()}</p>`;
    checkoutItems.appendChild(div);
  });

  const vat = subtotal * 0.075;
  const discount = subtotal > 100000 ? subtotal * 0.1 : 0;
  const total = subtotal + vat - discount;

  subtotalEl.textContent = `₦${subtotal.toLocaleString()}`;
  vatEl.textContent = `₦${vat.toLocaleString()}`;
  discountEl.textContent = `₦${discount.toLocaleString()}`;
  totalEl.textContent = `₦${total.toLocaleString()}`;

  document.getElementById('checkoutPage').style.display = 'block';
}

function closeCheckout() {
  document.getElementById('checkoutPage').style.display = 'none';
}


function confirmOrder() {
  document.getElementById('checkoutPage').style.display = 'none';

  // Simulate payment animation
  setTimeout(() => {
    alert("✅ Payment Successful!");

    // Show Invoice
    showInvoice();

    // Reset cart
    cart = [];
    saveCart();
    updateCartUI();
    closeCart();
  }, 1500);
}

function showInvoice() {
  const invoice = document.getElementById('invoice');
  const invoiceItems = document.getElementById('invoiceItems');
  const invoiceSubtotal = document.getElementById('invoiceSubtotal');
  const invoiceVAT = document.getElementById('invoiceVAT');
  const invoiceDiscount = document.getElementById('invoiceDiscount');
  const invoiceTotal = document.getElementById('invoiceTotal');

  let subtotal = 0;

  cart.forEach(item => {
    const price = parseFloat(item.price.replace(/[₦,]/g, ''));
    const itemTotal = item.qty * price;
    subtotal += itemTotal;

    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} (x${item.qty}) - ₦${itemTotal.toLocaleString()}</p>`;
    invoiceItems.appendChild(div);
  });

  const vat = subtotal * 0.075;
  const discount = subtotal > 100000 ? subtotal * 0.1 : 0;
  const total = subtotal + vat - discount;

  invoiceSubtotal.textContent = `₦${subtotal.toLocaleString()}`;
  invoiceVAT.textContent = `₦${vat.toLocaleString()}`;
  invoiceDiscount.textContent = `₦${discount.toLocaleString()}`;
  invoiceTotal.textContent = `₦${total.toLocaleString()}`;

  invoice.style.display = 'block';
}

function closeInvoice() {
  document.getElementById('invoice').style.display = 'none';
  document.getElementById('invoiceItems').innerHTML = ''; // reset
}



function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
}

// ==============================
// Back to Top Button
// ==============================
const backToTopButton = document.querySelector('.back-to-top');
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ==============================
// Initial Load
// ==============================

loadCart();
displayProducts(products);
