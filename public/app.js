// ========================================
// STATE MANAGEMENT
// ========================================
let allProducts = [];
let storeConfig = {};
let selectedCategory = 'all';

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
});

// ========================================
// API CALLS
// ========================================
async function loadCatalog() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();

        allProducts = data.products || [];
        storeConfig = data.config || {};

        renderStoreInfo();
        renderCategoryFilters();
        renderProducts();
    } catch (error) {
        console.error('Error loading catalog:', error);
        showError();
    }
}

// ========================================
// RENDER FUNCTIONS
// ========================================
function renderStoreInfo() {
    document.getElementById('storeName').textContent = storeConfig.storeName || 'Mi Tienda';
    document.getElementById('storeDescription').textContent = storeConfig.storeDescription || '';
    document.getElementById('storeLogo').src = storeConfig.storeLogo || 'https://via.placeholder.com/150';
    document.title = storeConfig.storeName || 'Catálogo de Productos';

    // WhatsApp general button
    const whatsappBtn = document.getElementById('whatsappGeneral');
    const whatsappNumber = storeConfig.whatsappNumber || '';
    const message = encodeURIComponent(`Hola! Me interesa conocer más sobre tus productos`);
    whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${message}`;
}

function renderCategoryFilters() {
    const filtersContainer = document.getElementById('categoryFilters');

    // Get unique categories
    const categories = ['all', ...new Set(allProducts.map(p => p.category).filter(Boolean))];

    filtersContainer.innerHTML = categories.map(category => `
        <button 
            class="filter-chip ${category === selectedCategory ? 'active' : ''}" 
            data-category="${category}"
            onclick="filterByCategory('${category}')"
        >
            ${category === 'all' ? 'Todos' : category}
        </button>
    `).join('');
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');

    // Filter products
    const filteredProducts = selectedCategory === 'all'
        ? allProducts
        : allProducts.filter(p => p.category === selectedCategory);

    if (filteredProducts.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h2>No hay productos disponibles</h2>
                <p>Vuelve pronto para ver nuevos productos</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    const whatsappNumber = storeConfig.whatsappNumber || '';
    const message = encodeURIComponent(`Hola! Me interesa el producto: ${product.name}`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    return `
        <div class="product-card">
            <div class="product-image-container">
                <img 
                    class="product-image" 
                    src="${product.imageUrl || 'https://via.placeholder.com/400x300?text=Sin+Imagen'}" 
                    alt="${product.name}"
                    loading="lazy"
                >
                ${product.category ? `<span class="product-category">${product.category}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <p class="product-description">${product.description || ''}</p>
                <a href="${whatsappUrl}" class="btn-whatsapp" target="_blank" rel="noopener">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Preguntar por este producto
                </a>
            </div>
        </div>
    `;
}

// ========================================
// FILTER FUNCTION
// ========================================
function filterByCategory(category) {
    selectedCategory = category;

    // Update active state
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.category === category);
    });

    // Re-render products with animation
    const grid = document.getElementById('productsGrid');
    grid.style.opacity = '0';

    setTimeout(() => {
        renderProducts();
        grid.style.opacity = '1';
    }, 150);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

function showError() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = `
        <div class="empty-state">
            <h2>Error al cargar productos</h2>
            <p>Por favor, intenta recargar la página</p>
        </div>
    `;
}
