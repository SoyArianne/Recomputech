class RecomputechHeaderAuthTechnician extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.cartItems = [];
        this.isMobile = window.innerWidth <= 767;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.loadCartFromStorage();
    }

    render() {
        const currentUser = this.getCurrentUser();
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1030;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                :host(.dark-mode) {
                    background: rgba(24, 31, 42, 0.95);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .recomputech-header-navbar {
                    padding: 1rem 0;
                    font-size: 1.1rem;
                }
                .recomputech-navbar-container {
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    align-items: center;
                    gap: 2rem;
                    padding-left: 60px;
                    padding-right: 60px;
                }
                .recomputech-navbar-brand {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
                .recomputech-logo {
                    width: 48px;
                    height: 48px;
                    object-fit: contain;
                    margin-right: 0.5rem;
                }
                .recomputech-logo-small {
                    width: 40px;
                    height: auto;
                }
                .recomputech-brand-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.2;
                }
                .recomputech-brand-name {
                    font-weight: 700;
                    font-size: 1.8rem;
                    color: #000;
                    margin: 0;
                }
                .recomputech-brand-tagline {
                    font-size: 1rem;
                    color: #666;
                    margin: 0;
                }
                :host(.dark-mode) .recomputech-brand-name,
                :host(.dark-mode) .recomputech-brand-tagline {
                    color: #fff;
                }
                .recomputech-navbar-nav {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: 2rem;
                }
                .recomputech-nav-link {
                    text-decoration: none;
                    color: #374151;
                    font-weight: 500;
                    transition: color 0.3s ease;
                    position: relative;
                }
                .recomputech-nav-link:hover {
                    color: #218DA6;
                }
                .recomputech-nav-link.active {
                    color: #218DA6;
                }
                .recomputech-nav-link.active::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: #218DA6;
                    border-radius: 1px;
                }
                .recomputech-header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .recomputech-btn-icon {
                    background: none;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                    color: #1f2937;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    transition: all 0.3s ease;
                }
                :host(.dark-mode) .recomputech-btn-icon {
                    border-color: #374151;
                    color: #fff;
                }
                .recomputech-btn-icon:hover {
                    background: #f3f4f6;
                    border-color: #9ca3af;
                }
                :host(.dark-mode) .recomputech-btn-icon:hover {
                    background: #374151;
                    border-color: #6b7280;
                }
                .recomputech-btn-icon svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }
                .recomputech-cart-icon {
                    background: none;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                    color: #1f2937;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    position: relative;
                    transition: all 0.3s ease;
                }
                :host(.dark-mode) .recomputech-cart-icon {
                    border-color: #374151;
                    color: #fff;
                }
                .recomputech-cart-icon:hover {
                    background: #f3f4f6;
                    border-color: #9ca3af;
                }
                :host(.dark-mode) .recomputech-cart-icon:hover {
                    background: #374151;
                    border-color: #6b7280;
                }
                .recomputech-cart-icon svg {
                    width: 20px;
                    height: 20px;
                    fill: currentColor;
                }
                .recomputech-cart-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: #ef4444;
                    color: white;
                    border-radius: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
            </style>
            <nav class="recomputech-header-navbar">
                <div class="container">
                    <div class="recomputech-navbar-container">
                        <!-- Logo Section -->
                        <a class="recomputech-navbar-brand" href="index.html">
                            <img src="/assets/logos/logo-.png" alt="Logo" class="recomputech-logo recomputech-logo-small">
                            <div class="recomputech-brand-text">
                                <span class="recomputech-brand-name">Recomputech</span>
                                <span class="recomputech-brand-tagline">Sustainable Technology</span>
                            </div>
                        </a>
                        <!-- Navigation Section -->
                        <ul class="recomputech-navbar-nav">
                            <li><a class="recomputech-nav-link" href="/pages/marketplace.html">Marketplace</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/technician/info-technician.html">Technicians</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/services.html">Services</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/Aboutus.html">About Us</a></li>
                            <li><a class="recomputech-nav-link" href="/pages/contact.html">Contact</a></li>
                        </ul>
                        <!-- Actions Section -->
                        <div class="recomputech-header-actions">
                            <!-- Theme Toggle -->
                            <button class="recomputech-btn-icon" id="recomputech-theme-toggle" title="Toggle dark mode">
                                <svg class="moon-icon" viewBox="0 0 24 24">
                                    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
                                </svg>
                                <svg class="sun-icon" viewBox="0 0 24 24" style="display: none;">
                                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                                </svg>
                            </button>
                            <!-- User Section -->
                            <div class="user-section">
                                <div class="user-info" id="userInfo">
                                    <img src="${currentUser?.avatar || 'https://via.placeholder.com/32/218DA6/ffffff?text=U'}" 
                                         alt="${currentUser?.name || 'User'}" 
                                         class="user-avatar"
                                         onerror="this.src='https://via.placeholder.com/32/218DA6/ffffff?text=U'">
                                    <div class="user-details">
                                        <div class="user-name">${currentUser?.name || 'User'}</div>
                                        <div class="user-role">Technician role</div>
                                    </div>
                                </div>
                                <div class="dropdown-menu" id="dropdownMenu">
                                    <a href="/dashboard/Technician/dashboard-technician.html" class="dropdown-item">
                                        <i class="fas fa-tachometer-alt"></i>
                                        Overview
                                    </a>
                                    <a href="/dashboard/Technician/dashboard-technician.html#services" class="dropdown-item">
                                        <i class="fas fa-tools"></i>
                                        My Services
                                    </a>
                                    <a href="/dashboard/Technician/dashboard-technician.html#settings" class="dropdown-item">
                                        <i class="fas fa-cog"></i>
                                        Settings
                                    </a>
                                    <a href="#" class="dropdown-item" id="logoutBtn">
                                        <i class="fas fa-sign-out-alt"></i>
                                        Logout
                                    </a>
                                </div>
                            </div>
                            <!-- Cart Icon -->
                            <button class="recomputech-cart-icon" id="recomputech-cart-icon" title="Shopping Cart">
                                <svg viewBox="0 0 24 24">
                                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                                </svg>
                                <span class="recomputech-cart-badge" id="recomputech-cart-badge" style="display: none;">0</span>
                            </button>
                            <!-- Mobile Menu Toggle -->
                            <button class="recomputech-navbar-toggler" id="recomputech-navbar-toggler">
                                <svg viewBox="0 0 24 24">
                                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <!-- Cart Sidebar -->
            <div class="recomputech-cart-overlay" id="recomputech-cart-overlay"></div>
            <div class="recomputech-cart-sidebar" id="recomputech-cart-sidebar">
                <div class="recomputech-cart-header">
                    <h3 class="recomputech-cart-title">Shopping Cart</h3>
                    <button class="recomputech-cart-close" id="recomputech-cart-close">
                        <svg viewBox="0 0 24 24">
                            <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
                        </svg>
                    </button>
                </div>
                <div class="recomputech-cart-content">
                    <div class="recomputech-cart-items" id="recomputech-cart-items">
                        <!-- Cart items will be dynamically added here -->
                    </div>
                </div>
                <div class="recomputech-cart-footer">
                    <div class="recomputech-cart-total">
                        <span class="recomputech-cart-total-label">Total:</span>
                        <span class="recomputech-cart-total-amount" id="recomputech-cart-total">B/. 0.00</span>
                    </div>
                    <button class="recomputech-cart-checkout" id="recomputech-cart-checkout">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <!-- Mobile Cart Page -->
            <div class="recomputech-mobile-cart-page" id="recomputech-mobile-cart-page">
                <div class="recomputech-mobile-cart-header">
                    <button class="recomputech-mobile-cart-back" id="recomputech-mobile-cart-back">
                        <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; fill: currentColor;">
                            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                        </svg>
                        Back
                    </button>
                    <h3 class="recomputech-mobile-cart-title">Shopping Cart</h3>
                    <div></div>
                </div>
                <div class="recomputech-cart-content">
                    <div class="recomputech-cart-items" id="recomputech-mobile-cart-items">
                        <!-- Mobile cart items will be dynamically added here -->
                    </div>
                </div>
                <div class="recomputech-cart-footer">
                    <div class="recomputech-cart-total">
                        <span class="recomputech-cart-total-label">Total:</span>
                        <span class="recomputech-cart-total-amount" id="recomputech-mobile-cart-total">B/. 0.00</span>
                    </div>
                    <button class="recomputech-cart-checkout" id="recomputech-mobile-cart-checkout">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const cartIcon = this.shadowRoot.getElementById('recomputech-cart-icon');
        const cartBadge = this.shadowRoot.getElementById('recomputech-cart-badge');
        const themeToggle = this.shadowRoot.getElementById('recomputech-theme-toggle');
        const mobileToggle = this.shadowRoot.getElementById('recomputech-navbar-toggler');
        const userInfo = this.shadowRoot.getElementById('userInfo');
        const dropdownMenu = this.shadowRoot.getElementById('dropdownMenu');
        const logoutBtn = this.shadowRoot.getElementById('logoutBtn');
        const cartOverlay = this.shadowRoot.getElementById('recomputech-cart-overlay');
        const cartSidebar = this.shadowRoot.getElementById('recomputech-cart-sidebar');
        const cartClose = this.shadowRoot.getElementById('recomputech-cart-close');
        const mobileCartPage = this.shadowRoot.getElementById('recomputech-mobile-cart-page');
        const mobileCartBack = this.shadowRoot.getElementById('recomputech-mobile-cart-back');
        const cartCheckout = this.shadowRoot.getElementById('recomputech-cart-checkout');
        const mobileCartCheckout = this.shadowRoot.getElementById('recomputech-mobile-cart-checkout');

        cartIcon?.addEventListener('click', () => {
            this.handleCartClick();
        });
        cartOverlay?.addEventListener('click', () => {
            this.closeCart();
        });
        cartClose?.addEventListener('click', () => {
            this.closeCart();
        });
        mobileCartBack?.addEventListener('click', () => {
            this.closeMobileCart();
        });
        cartCheckout?.addEventListener('click', () => {
            this.proceedToCheckout();
        });
        mobileCartCheckout?.addEventListener('click', () => {
            this.proceedToCheckout();
        });
        themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });
        mobileToggle?.addEventListener('click', () => {
            this.openMobileMenu();
        });
        userInfo?.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!this.shadowRoot.contains(e.target)) {
                dropdownMenu?.classList.remove('show');
            }
        });
        logoutBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });
        this.initializeTheme();
        this.setActiveNavLink();
    }

    getCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    logout() {
        if (window.headerManager) {
            window.headerManager.logout();
        } else {
            localStorage.removeItem('currentUser');
            window.location.href = '/';
        }
    }

    setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = this.shadowRoot.querySelectorAll('.recomputech-nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    handleCartClick() {
        if (this.isMobile) {
            this.openMobileCart();
        } else {
            this.openCart();
        }
    }

    openCart() {
        const cartSidebar = this.shadowRoot.getElementById('recomputech-cart-sidebar');
        const cartOverlay = this.shadowRoot.getElementById('recomputech-cart-overlay');
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('show');
            cartOverlay.classList.add('show');
            this.renderCartItems();
        }
    }

    closeCart() {
        const cartSidebar = this.shadowRoot.getElementById('recomputech-cart-sidebar');
        const cartOverlay = this.shadowRoot.getElementById('recomputech-cart-overlay');
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('show');
            cartOverlay.classList.remove('show');
        }
    }

    openMobileCart() {
        const mobileCartPage = this.shadowRoot.getElementById('recomputech-mobile-cart-page');
        if (mobileCartPage) {
            mobileCartPage.classList.add('show');
            this.renderMobileCartItems();
        }
    }

    closeMobileCart() {
        const mobileCartPage = this.shadowRoot.getElementById('recomputech-mobile-cart-page');
        if (mobileCartPage) {
            mobileCartPage.classList.remove('show');
        }
    }

    addToCart(product) {
        const existingItem = this.cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({
                ...product,
                quantity: 1
            });
        }
        this.updateCartBadge();
        this.saveCartToStorage();
        this.renderCartItems();
        this.renderMobileCartItems();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter(item => item.id !== productId);
        this.updateCartBadge();
        this.saveCartToStorage();
        this.renderCartItems();
        this.renderMobileCartItems();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cartItems.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCartToStorage();
                this.updateCartBadge();
                this.renderCartItems();
                this.renderMobileCartItems();
            }
        }
    }

    updateCartBadge() {
        const cartBadge = this.shadowRoot.getElementById('recomputech-cart-badge');
        const totalItems = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (cartBadge) {
            if (totalItems > 0) {
                cartBadge.textContent = totalItems;
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }

    renderCartItems() {
        const cartItemsContainer = this.shadowRoot.getElementById('recomputech-cart-items');
        const cartTotal = this.shadowRoot.getElementById('recomputech-cart-total');
        if (!cartItemsContainer) return;
        if (this.cartItems.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="recomputech-cart-empty">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #9ca3af; margin-bottom: 1rem;"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            if (cartTotal) cartTotal.textContent = 'B/. 0.00';
            return;
        }
        cartItemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="recomputech-cart-item">
                <div class="recomputech-cart-item-image">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.375rem;" onerror="this.style.display='none'">
                </div>
                <div class="recomputech-cart-item-info">
                    <h4 class="recomputech-cart-item-name">${item.name}</h4>
                    <div class="recomputech-cart-item-price">B/. ${item.price.toFixed(2)}</div>
                    <div class="recomputech-cart-item-quantity">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="recomputech-cart-quantity-input" value="${item.quantity}" min="1" onchange="this.getRootNode().host.updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="recomputech-cart-item-remove" onclick="this.getRootNode().host.removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotal) cartTotal.textContent = `B/. ${total.toFixed(2)}`;
    }

    renderMobileCartItems() {
        const mobileCartItemsContainer = this.shadowRoot.getElementById('recomputech-mobile-cart-items');
        const mobileCartTotal = this.shadowRoot.getElementById('recomputech-mobile-cart-total');
        if (!mobileCartItemsContainer) return;
        if (this.cartItems.length === 0) {
            mobileCartItemsContainer.innerHTML = `
                <div class="recomputech-cart-empty">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #9ca3af; margin-bottom: 1rem;"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            if (mobileCartTotal) mobileCartTotal.textContent = 'B/. 0.00';
            return;
        }
        mobileCartItemsContainer.innerHTML = this.cartItems.map(item => `
            <div class="recomputech-cart-item">
                <div class="recomputech-cart-item-image">
                    <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.375rem;" onerror="this.style.display='none'">
                </div>
                <div class="recomputech-cart-item-info">
                    <h4 class="recomputech-cart-item-name">${item.name}</h4>
                    <div class="recomputech-cart-item-price">B/. ${item.price.toFixed(2)}</div>
                    <div class="recomputech-cart-item-quantity">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <input type="number" class="recomputech-cart-quantity-input" value="${item.quantity}" min="1" onchange="this.getRootNode().host.updateQuantity('${item.id}', parseInt(this.value))">
                        <button class="recomputech-cart-quantity-btn" onclick="this.getRootNode().host.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                        <button class="recomputech-cart-item-remove" onclick="this.getRootNode().host.removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (mobileCartTotal) mobileCartTotal.textContent = `B/. ${total.toFixed(2)}`;
    }

    saveCartToStorage() {
        localStorage.setItem('recomputech-cart', JSON.stringify(this.cartItems));
    }

    loadCartFromStorage() {
        const savedCart = localStorage.getItem('recomputech-cart');
        if (savedCart) {
            this.cartItems = JSON.parse(savedCart);
            this.updateCartBadge();
        }
    }

    proceedToCheckout() {
        if (this.cartItems.length === 0) {
            this.showNotification('Your cart is empty!', 'warning');
            return;
        }
        this.showNotification('Redirecting to checkout...', 'info');
        setTimeout(() => {
            this.cartItems = [];
            this.saveCartToStorage();
            this.updateCartBadge();
            this.renderCartItems();
            this.renderMobileCartItems();
            this.closeCart();
            this.closeMobileCart();
            this.showNotification('Order placed successfully!', 'success');
        }, 2000);
    }

    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark-mode');
        if (isDark) {
            document.documentElement.classList.remove('dark-mode');
            this.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark-mode');
            this.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }
        this.updateThemeIcon();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
            this.classList.add('dark-mode');
        }
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const moonIcon = this.shadowRoot.querySelector('.moon-icon');
        const sunIcon = this.shadowRoot.querySelector('.sun-icon');
        const isDark = document.documentElement.classList.contains('dark-mode');
        if (moonIcon && sunIcon) {
            if (isDark) {
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            } else {
                moonIcon.style.display = 'block';
                sunIcon.style.display = 'none';
            }
        }
    }

    openMobileMenu() {
        console.log('Opening mobile menu');
    }

    closeMobileMenu() {
        console.log('Closing mobile menu');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }
}

customElements.define('recomputech-header-auth-technician', RecomputechHeaderAuthTechnician); 