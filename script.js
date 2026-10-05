// Product Database
const products = [
    {
        id: 1,
        name: "Premium Black Hoodie",
        price: 600,
        image: "18730902853_693372066.jpeg",
        category: "Hoodie",
        desc: "Premium quality black hoodie crafted by METASO. Soft, durable & warm."
    },
    {
        id: 2,
        name: "Stylish Green Hoodie",
        price: 800,
        image: "O1CN01OkkvsG2EzKPKpLRQN_!!2218760308815-0-cib.jpeg",
        category: "Hoodie",
        desc: "Awesome stylish green hoodie by METASO. Ultra comfort fit."
    },
    {
        id: 3,
        name: "Color Wow Dream Coat",
        price: 2300,
        image: "51i84VRdudL._SL1000_.jpeg",
        category: "Coat",
        desc: "Magical hair formula for silky, glass-like glossy finish."
    },
    {
        id: 4,
        name: "METASO Signature T-Shirt",
        price: 500,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
        category: "T-Shirt",
        desc: "Minimalist METASO branded high quality cotton T-shirt."
    }
];

// Render Products
const productGrid = document.getElementById('product-grid');

function renderProducts(items) {
    productGrid.innerHTML = '';
    if (items.length === 0) {
        document.getElementById('no-results').style.display = 'block';
        return;
    }
    document.getElementById('no-results').style.display = 'none';

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card reveal active';
        card.id = `product-${product.id}`;
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300/1e293b/ffffff?text=METASO'">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="price-row">
                    <span class="product-price">${product.price} ৳</span>
                </div>
                <button class="order-btn" onclick="openModal(${product.id})">Order Now <i class="fas fa-shopping-cart"></i></button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

renderProducts(products);

// ----------------------------------------------------
// Smart Search & Auto Suggestions Feature (100% Working)
// ----------------------------------------------------
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('search-suggestions');
const clearSearchBtn = document.getElementById('clear-search');

searchInput.addEventListener('input', function(e) {
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length > 0) {
        clearSearchBtn.style.display = 'block';
        
        // Filter Suggestions
        const matched = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );

        showSuggestions(matched, query);
        filterGrid(query);
    } else {
        clearSearchBtn.style.display = 'none';
        suggestionsBox.classList.remove('active');
        renderProducts(products);
    }
});

function showSuggestions(matches, query) {
    suggestionsBox.innerHTML = '';
    
    if (matches.length === 0) {
        suggestionsBox.classList.remove('active');
        return;
    }

    matches.forEach(item => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <span class="item-title"><i class="fas fa-search" style="margin-right:8px; opacity:0.6;"></i> ${item.name}</span>
            <span class="item-price">${item.price} ৳</span>
        `;
        div.addEventListener('click', () => {
            searchInput.value = item.name;
            suggestionsBox.classList.remove('active');
            filterGrid(item.name.toLowerCase());
            
            // Auto-scroll to product card & highlight
            const targetElement = document.getElementById(`product-${item.id}`);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetElement.classList.add('highlight-card');
                setTimeout(() => targetElement.classList.remove('highlight-card'), 3000);
            }
        });
        suggestionsBox.appendChild(div);
    });

    suggestionsBox.classList.add('active');
}

function filterGrid(query) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    suggestionsBox.classList.remove('active');
    renderProducts(products);
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
        suggestionsBox.classList.remove('active');
    }
});

// ----------------------------------------------------
// Continuous Background Particles Animation
// ----------------------------------------------------
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
        ctx.fill();
    }
}

for (let i = 0; i < 65; i++) {
    particles.push(new Particle());
}

function animateBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    // Connect nearest nodes
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${1 - dist / 120})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateBackground);
}
animateBackground();

// ----------------------------------------------------
// Click Explosion Particles Effect
// ----------------------------------------------------
window.addEventListener('click', (e) => {
    for (let i = 0; i < 12; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.width = '6px';
        spark.style.height = '6px';
        spark.style.backgroundColor = i % 2 === 0 ? '#6366f1' : '#06b6d4';
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '9999';
        
        const destinationX = (Math.random() - 0.5) * 100;
        const destinationY = (Math.random() - 0.5) * 100;
        
        document.body.appendChild(spark);
        
        spark.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => spark.remove();
    }
});

// Menu Toggle
function toggleMenu() {
    document.getElementById('side-menu').classList.toggle('active');
    document.getElementById('menu-overlay').classList.toggle('active');
}

// Modal & Order Logic
let currentProduct = null;
let currentQty = 1;

const modal = document.getElementById('checkout-modal');
const qtyInput = document.getElementById('qty-input');
const totalPriceEl = document.getElementById('total-price');

function openModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    currentQty = 1;
    
    document.getElementById('checkout-product-name').innerText = currentProduct.name;
    document.getElementById('checkout-product-price').innerText = currentProduct.price;
    qtyInput.value = currentQty;
    totalPriceEl.innerText = currentProduct.price;
    
    document.getElementById('modal-body').style.display = 'block';
    document.getElementById('success-screen').style.display = 'none';
    document.getElementById('order-form').reset();
    
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function updateQty(change) {
    let newQty = currentQty + change;
    if (newQty >= 1) { 
        currentQty = newQty;
        qtyInput.value = currentQty;
        totalPriceEl.innerText = currentProduct.price * currentQty;
    }
}

function processOrder(e) {
    e.preventDefault(); 
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    const orderData = {
        product_name: currentProduct.name,
        quantity: currentQty,
        total_price: currentProduct.price * currentQty,
        customer_name: document.getElementById('customer-name').value,
        customer_phone: document.getElementById('customer-phone').value,
        customer_address: document.getElementById('customer-address').value
    };

    emailjs.send('service_n9sopis', 'template_8t9gx5f', orderData)
        .then(function() {
            showSuccessScreen();
        }, function(error) {
            alert("Error: " + JSON.stringify(error));
            submitBtn.innerHTML = '<span>Confirm Order</span> <i class="fas fa-check-circle"></i>';
            submitBtn.disabled = false;
        });
}

function showSuccessScreen() {
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('success-screen').style.display = 'block';
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerHTML = '<span>Confirm Order</span> <i class="fas fa-check-circle"></i>';
    submitBtn.disabled = false;
}
