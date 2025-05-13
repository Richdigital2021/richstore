// const products = [
 // { name: "Women's Dress", price: "₦8,000", image: "https://via.placeholder.com/150", category: "clothing", description: "Elegant women's dress." },
// { name: "Makeup Kit", price: "₦5,500", image: "https://via.placeholder.com/150", category: "beauty", description: "Complete makeup kit." },
//  { name: "Home Organizer", price: "₦7,200", image: "https://via.placeholder.com/150", category: "home", description: "Multi-purpose home organizer." },
//  { name: "Gold Necklace", price: "₦15,000", image: "https://via.placeholder.com/150", category: "jewelry", description: "24k gold necklace." },
// ]; 

const products = [
  { name: "Women's Dress", price: "₦8,000", image: "images/Women Dress1.jpg", category: "clothing", description: "Elegant women's dress." },
  { name: "Skincare Kit", price: "₦5,500", image: "images/skincare.jpg", category: "beauty", description: "Complete skincare kit." },
  { name: "Home Organizer", price: "₦7,200", image: "images/Home Organizer.jpg", category: "home", description: "Multi-purpose home organizer." },
  { name: "Gold Necklace", price: "₦15,000", image: "images/Gold Necklace.jpg", category: "jewelry", description: "24k gold necklace." },
  { name: "Head Set", price: "₦30,000", image: "images/headset1.jpg", category: "electronics", description: "Powerful and sleek Headset with good sound" },
  { name: "Makeup Kit", price: "₦5,500", image: "images/makeup kit.jpg", category: "beauty", description: "Complete makeup kit." },
  { name: "Dish Drainer", price: "₦7,200", image: "images/Dish Drainer.jpg", category: "home", description: "Multi-purpose dish drainer." },
  { name: "Cyberpunk-Headphone", price: "₦35,500", image: "images/still-life-wireless-cyberpunk-headphones.jpg", category: "toys", description: "Multi-purpose home organizer." },
  { name: "Air pod", price: "₦15,000", image: "images/airpod.jpg", category: "electronics", description: "Portable purple airpod for iphones." },
  { name: "Camera", price: "₦120,000", image: "images/camera.jpg", category: "electronics", description: "Powerful and sleek Headset with good sound" },
  { name: "Cream Set", price: "₦7,500", image: "images/creams.jpg", category: "beauty", description: "Set of Moisturizing cream for all skin types.." },
  { name: "Laptop", price: "₦230,000", image: "images/Laptop.jpg", category: "electronics", description: "Multi-purpose dish drainer." },
  { name: "Smart Phone", price: "₦45,000", image: "images/smartphone.jpg", category: "electronics", description: "Multi-purpose home organizer." },
  { name: "Smart Watch", price: "₦15,000", image: "images/smart watch.jpg", category: "electronics", description: "Portable purple airpod for iphones." },
  { name: "Camera", price: "₦120,000", image: "images/camera.jpg", category: "electronics", description: "Powerful and sleek Headset with good sound" },
  { name: "Studio Microphone", price: "₦50,000", image: "images/studio mic.jpg", category: "toys", description: "Set of Moisturizing cream for all skin types.." },
  { name: "VR Camera", price: "₦130,000", image: "images/VR Camera.jpg", category: "toys", description: "Virtual reality camera." },

  { name: "Black-Headphone", price: "₦45,000", image: "images/black-headphones.jpg", category: "electronics", description: "Black and Beautiful headphone with quality sound" }

];





const grid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const searchBox = document.getElementById('searchBox');

// Modal elements
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.getElementsByClassName('close')[0];

// Render product cards
function displayProducts(filteredProducts) {
  grid.innerHTML = '';
  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>${product.price}</p>
    `;
    card.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImage.src = product.image;
      modalName.textContent = product.name;
      modalPrice.textContent = product.price;
      modalDescription.textContent = product.description;
    });
    grid.appendChild(card);
  });
}

// Filter by category
categoryFilter.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    document.querySelectorAll('#categoryFilter li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    const category = e.target.getAttribute('data-category');
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    displayProducts(filtered);
  }
});

// Filter by search
searchBox.addEventListener('input', () => {
  const searchTerm = searchBox.value.toLowerCase();
  const filtered = products.filter(product => product.name.toLowerCase().includes(searchTerm));
  displayProducts(filtered);
});

// Close modal
closeModal.onclick = () => modal.style.display = 'none';
window.onclick = event => {
  if (event.target == modal) modal.style.display = 'none';
};

// Initial render
displayProducts(products);

 // Back to Top Button Script 
    
      const backToTopButton = document.querySelector('.back-to-top');
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
   
