// ========================================
// STATE MANAGEMENT
// ========================================
let adminPassword = '';
let allProducts = [];
let storeConfig = {};
let editingProductId = null;

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if already logged in
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
        adminPassword = savedPassword;
        showAdminPanel();
    }

    // Setup login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Setup product form
    document.getElementById('productForm').addEventListener('submit', handleProductSubmit);

    // Setup config form
    document.getElementById('configForm').addEventListener('submit', handleConfigSubmit);
});

// ========================================
// AUTHENTICATION
// ========================================
async function handleLogin(e) {
    e.preventDefault();

    const password = document.getElementById('passwordInput').value;
    const errorEl = document.getElementById('loginError');

    // Try to fetch products with this password
    try {
        const response = await fetch('/api/admin/products', {
            headers: {
                'X-Admin-Password': password
            }
        });

        if (response.ok) {
            adminPassword = password;
            sessionStorage.setItem('adminPassword', password);
            showAdminPanel();
        } else {
            errorEl.textContent = 'Contraseña incorrecta';
        }
    } catch (error) {
        errorEl.textContent = 'Error al conectar con el servidor';
    }
}

function showAdminPanel() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadAdminData();
}

function logout() {
    sessionStorage.removeItem('adminPassword');
    location.reload();
}

// ========================================
// DATA LOADING
// ========================================
async function loadAdminData() {
    try {
        const response = await fetch('/api/admin/products', {
            headers: {
                'X-Admin-Password': adminPassword
            }
        });

        if (!response.ok) {
            logout();
            return;
        }

        const data = await response.json();
        allProducts = data.products || [];
        storeConfig = data.config || {};

        renderProductsList();
        renderConfigForm();
    } catch (error) {
        console.error('Error loading admin data:', error);
        alert('Error al cargar los datos');
    }
}

// ========================================
// TABS
// ========================================
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/hide tab content
    document.getElementById('productsTab').style.display = tabName === 'products' ? 'block' : 'none';
    document.getElementById('configTab').style.display = tabName === 'config' ? 'block' : 'none';
}

// ========================================
// PRODUCTS MANAGEMENT
// ========================================
function renderProductsList() {
    const listEl = document.getElementById('productsList');

    if (allProducts.length === 0) {
        listEl.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <p>No hay productos. ¡Agrega tu primer producto!</p>
            </div>
        `;
        return;
    }

    listEl.innerHTML = allProducts.map(product => `
        <div class="product-item ${product.active ? '' : 'inactive'}">
            <img 
                src="${product.imageUrl || 'https://via.placeholder.com/80'}" 
                alt="${product.name}"
                class="product-item-image"
            >
            <div class="product-item-info">
                <div class="product-item-name">${product.name}</div>
                <div class="product-item-details">
                    <span class="product-item-price">$${formatPrice(product.price)}</span>
                    ${product.category ? `<span class="product-item-category">${product.category}</span>` : ''}
                    <span class="product-item-status ${product.active ? 'active' : 'inactive'}">
                        ${product.active ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            </div>
            <div class="product-item-actions">
                <button onclick="editProduct(${product.id})" class="btn-icon btn-edit">Editar</button>
                <button onclick="deleteProduct(${product.id})" class="btn-icon btn-delete">Eliminar</button>
            </div>
        </div>
    `).join('');
}

function openProductModal(productId = null) {
    editingProductId = productId;
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');

    if (productId) {
        // Edit mode
        const product = allProducts.find(p => p.id === productId);
        document.getElementById('modalTitle').textContent = 'Editar Producto';
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productImageUrl').value = product.imageUrl || '';
        document.getElementById('productCategory').value = product.category || '';
        document.getElementById('productActive').checked = product.active;
    } else {
        // Create mode
        document.getElementById('modalTitle').textContent = 'Agregar Producto';
        form.reset();
        document.getElementById('productActive').checked = true;
    }

    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    editingProductId = null;
}

function editProduct(productId) {
    openProductModal(productId);
}

async function deleteProduct(productId) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'X-Admin-Password': adminPassword
            }
        });

        if (response.ok) {
            await loadAdminData();
            alert('Producto eliminado exitosamente');
        } else {
            alert('Error al eliminar el producto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el producto');
    }
}

async function handleProductSubmit(e) {
    e.preventDefault();

    const productData = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        imageUrl: document.getElementById('productImageUrl').value,
        category: document.getElementById('productCategory').value,
        active: document.getElementById('productActive').checked
    };

    try {
        let response;

        if (editingProductId) {
            // Update existing product
            response = await fetch(`/api/admin/products/${editingProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Password': adminPassword
                },
                body: JSON.stringify(productData)
            });
        } else {
            // Create new product
            response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Admin-Password': adminPassword
                },
                body: JSON.stringify(productData)
            });
        }

        if (response.ok) {
            closeProductModal();
            await loadAdminData();
            alert(editingProductId ? 'Producto actualizado' : 'Producto creado exitosamente');
        } else {
            alert('Error al guardar el producto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar el producto');
    }
}

// ========================================
// CONFIG MANAGEMENT
// ========================================
function renderConfigForm() {
    document.getElementById('configStoreName').value = storeConfig.storeName || '';
    document.getElementById('configStoreDescription').value = storeConfig.storeDescription || '';
    document.getElementById('configStoreLogo').value = storeConfig.storeLogo || '';
    document.getElementById('configWhatsappNumber').value = storeConfig.whatsappNumber || '';
}

async function handleConfigSubmit(e) {
    e.preventDefault();

    const configData = {
        storeName: document.getElementById('configStoreName').value,
        storeDescription: document.getElementById('configStoreDescription').value,
        storeLogo: document.getElementById('configStoreLogo').value,
        whatsappNumber: document.getElementById('configWhatsappNumber').value
    };

    try {
        const response = await fetch('/api/admin/config', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Admin-Password': adminPassword
            },
            body: JSON.stringify(configData)
        });

        if (response.ok) {
            await loadAdminData();
            alert('Configuración guardada exitosamente');
        } else {
            alert('Error al guardar la configuración');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar la configuración');
    }
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

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeProductModal();
    }
});
