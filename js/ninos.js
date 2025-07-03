        document.addEventListener('DOMContentLoaded', () => {
            // Función para mostrar un cuadro de mensaje personalizado
            function showCustomMessageBox(message) {
                const messageBox = document.getElementById('customMessageBox');
                const messageBoxText = document.getElementById('messageBoxText');
                const messageBoxCloseBtn = document.getElementById('messageBoxCloseBtn');

                messageBoxText.textContent = message;
                messageBox.classList.add('show');

                const closeMessageBox = () => {
                    messageBox.classList.remove('show');
                    messageBoxCloseBtn.removeEventListener('click', closeMessageBox);
                    messageBox.removeEventListener('click', handleOverlayClick);
                };

                const handleOverlayClick = (event) => {
                    if (event.target === messageBox) {
                        closeMessageBox();
                    }
                };

                messageBoxCloseBtn.addEventListener('click', closeMessageBox);
                messageBox.addEventListener('click', handleOverlayClick);
            }

            // 1. Navegación Responsive (menú hamburguesa)
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    navToggle.setAttribute(
                        'aria-expanded',
                        navMenu.classList.contains('active')
                    );
                });

                // Cerrar el menú al hacer clic en un enlace (útil en móviles)
                navMenu.querySelectorAll('.nav-menu-link').forEach(link => {
                    link.addEventListener('click', () => {
                        if (navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            navToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                });
            }
            
            // 2. Lógica del Modal de Detalles del Producto
            const productDetailsModal = document.getElementById('productDetailsModal');
            const productDetailsCloseBtn = productDetailsModal.querySelector('.product-details-modal-close-btn');
            const modalProductImage = document.getElementById('modalProductImage');
            const modalProductName = document.getElementById('modalProductName');
            const modalProductPrice = document.getElementById('modalProductPrice');
            const modalProductAvailability = document.getElementById('modalProductAvailability');
            const modalProductCode = document.getElementById('modalProductCode');
            const modalProductType = document.getElementById('modalProductType'); 
            const modalProductVendor = document.getElementById('modalProductVendor');
            const modalProductSizes = document.getElementById('modalProductSizes');
            const decreaseQuantityBtn = document.getElementById('decreaseQuantity');
            const increaseQuantityBtn = document.getElementById('increaseQuantity');
            const productQuantityInput = document.getElementById('productQuantity');
            const addToCartFullBtn = productDetailsModal.querySelector('.add-to-cart-full-btn');
            
            let selectedSize = ''; // Para almacenar la talla seleccionada

            function showProductDetailsModal(product) {
                modalProductImage.src = product.image;
                modalProductName.textContent = product.name;
                modalProductPrice.textContent = `$${product.price.toFixed(2)}`;
                modalProductAvailability.textContent = product.availability;
                modalProductCode.textContent = product.code;
                modalProductType.textContent = product.type;
                modalProductVendor.textContent = product.vendor;
                
                // Limpiar y cargar tallas
                modalProductSizes.innerHTML = '';
                product.sizes.forEach(size => {
                    const sizeOption = document.createElement('span');
                    sizeOption.classList.add('size-option');
                    sizeOption.textContent = size;
                    sizeOption.addEventListener('click', () => {
                        // Remover 'selected' de todas las opciones y añadirlo a la actual
                        modalProductSizes.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                        sizeOption.classList.add('selected');
                        selectedSize = size; // Guardar la talla seleccionada
                    });
                    modalProductSizes.appendChild(sizeOption);
                });

                productQuantityInput.value = 1; // Resetear cantidad a 1
                selectedSize = ''; // Resetear talla seleccionada

                productDetailsModal.style.display = 'flex';
                setTimeout(() => {
                    productDetailsModal.classList.add('active');
                }, 50);
            }

            productDetailsCloseBtn.addEventListener('click', () => {
                productDetailsModal.classList.remove('active');
                setTimeout(() => {
                    productDetailsModal.style.display = 'none';
                }, 300);
            });

            productDetailsModal.addEventListener('click', (event) => {
                if (event.target === productDetailsModal) {
                    productDetailsModal.classList.remove('active');
                    setTimeout(() => {
                        productDetailsModal.style.display = 'none';
                    }, 300);
                }
            });

            // Control de cantidad en el modal de detalles
            decreaseQuantityBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(productQuantityInput.value);
                if (currentQuantity > 1) {
                    productQuantityInput.value = currentQuantity - 1;
                }
            });

            increaseQuantityBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(productQuantityInput.value);
                productQuantityInput.value = currentQuantity + 1;
            });

            // Añadir al carrito desde el modal de detalles (simulado)
            addToCartFullBtn.addEventListener('click', () => {
                const productName = modalProductName.textContent;
                const quantity = productQuantityInput.value;
                const sizeInfo = selectedSize ? ` (Talla: ${selectedSize})` : '';
                
                showCustomMessageBox(`"${productName}" x ${quantity}${sizeInfo} ha sido añadido al carrito. (Simulado)`);
                
                // Cerrar el modal después de añadir al carrito
                productDetailsModal.classList.remove('active');
                setTimeout(() => {
                    productDetailsModal.style.display = 'none';
                }, 300);
            });

            // 3. Lógica para la sección de productos de niños
            const kidsProductsGrid = document.getElementById('kidsProductsGrid');
            const filterButtons = document.querySelectorAll('.filter-option-btn');
            const colorOptions = document.querySelectorAll('.color-option');
            const applyFiltersBtn = document.getElementById('applyFiltersBtn');
            const clearFiltersBtn = document.getElementById('clearFiltersBtn');

            const kidsProductsData = [
                {
                    id: 'kids001',
                    name: 'Zapatillas Dino-Aventura',
                    price: 45.99,
                    image: 'img/webp/zapato1.webp',
                    color: 'green',
                    type: 'zapatillas',
                    sizes: ['20', '22', '24'],
                    gender: 'niño',
                    outer_material: 'sintetico'
                },
                {
                    id: 'kids002',
                    name: 'Sandalias de Unicornio',
                    price: 35.50,
                    image: 'img/webp/zapato2.webp',
                    color: 'red', // Representa un rosa claro o fucsia
                    type: 'sandalias',
                    sizes: ['20', '22', '24'],
                    gender: 'niña',
                    outer_material: 'sintetico'
                },
                {
                    id: 'kids003',
                    name: 'Botas de Explorador',
                    price: 60.00,
                    image: 'img/webp/zapato3.webp',
                    color: 'black', // Para representar café/gris oscuro
                    type: 'botas',
                    sizes: ['26', '28', '30'],
                    gender: 'unisex',
                    outer_material: 'cuero'
                },
                {
                    id: 'kids004',
                    name: 'Zapatillas Estrellas Brillantes',
                    price: 50.00,
                    image: 'img/webp/zapato4.webp',
                    color: 'yellow',
                    type: 'zapatillas',
                    sizes: ['24', '26', '28'],
                    gender: 'niña',
                    outer_material: 'lona'
                },
                {
                    id: 'kids005',
                    name: 'Zapatos de Vestir Casual',
                    price: 40.00,
                    image: 'img/webp/zapato5.webp',
                    color: 'blue',
                    type: 'zapatos',
                    sizes: ['22', '24', '26'],
                    gender: 'niño',
                    outer_material: 'sintetico'
                },
                {
                    id: 'kids006',
                    name: 'Zapatillas Deportivas Velocidad',
                    price: 55.00,
                    image: 'img/webp/zapato6.webp',
                    color: 'green',
                    type: 'zapatillas',
                    sizes: ['28', '30', '32'],
                    gender: 'niño',
                    outer_material: 'sintetico'
                },
                {
                    id: 'kids007',
                    name: 'Sandalias de Playa "Delfín"',
                    price: 30.00,
                    image: 'img/webp/zapato7.webp',
                    color: 'blue',
                    type: 'sandalias',
                    sizes: ['20', '22', '24'],
                    gender: 'unisex',
                    outer_material: 'sintetico'
                },
                {
                    id: 'kids008',
                    name: 'Botines de Cuero Urbano',
                    price: 70.00,
                    image: 'img/webp/zapato8.webp',
                    color: 'black', // Para representar un gris oscuro
                    type: 'botas',
                    sizes: ['30', '32', '34'],
                    gender: 'unisex',
                    outer_material: 'cuero'
                }
            ];

            let activeFilters = {
                color: null,
                type: null,
                size: null,
                gender: null,
                outer_material: null
            };

            function createKidsProductCard(product) {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.dataset.productId = product.id; // Añadir ID para el modal de detalles
                productCard.innerHTML = `
                    <div class="product-card-img-container">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-card-info">
                        <h4>${product.name}</h4>
                        <span class="price">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-primary">Ver Detalles</button>
                    </div>
                `;
                // Añadir evento para abrir el modal de detalles al hacer clic en la tarjeta
                productCard.querySelector('.btn-primary').addEventListener('click', () => showProductDetailsModal(product));
                return productCard;
            }

            function renderKidsProducts(productsToRender) {
                kidsProductsGrid.innerHTML = ''; // Limpiar la cuadrícula
                if (productsToRender.length === 0) {
                    kidsProductsGrid.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1; font-size: 1.2rem; color: var(--subtle-blue);">No se encontraron productos con los filtros seleccionados.</p>';
                    return;
                }
                productsToRender.forEach(product => {
                    kidsProductsGrid.appendChild(createKidsProductCard(product));
                });
            }

            function filterKidsProducts() {
                let filteredProducts = kidsProductsData.filter(product => {
                    // Filtro por Color
                    if (activeFilters.color && product.color !== activeFilters.color) {
                        return false;
                    }
                    // Filtro por Tipo de Calzado
                    if (activeFilters.type && product.type !== activeFilters.type) {
                        return false;
                    }
                    // Filtro por Talla (si la talla seleccionada está en el array de tallas del producto)
                    if (activeFilters.size && !product.sizes.includes(activeFilters.size)) {
                        return false;
                    }
                    // Filtro por Género
                    if (activeFilters.gender && product.gender !== activeFilters.gender) {
                        return false;
                    }
                    // Filtro por Material Exterior
                    if (activeFilters.outer_material && product.outer_material !== activeFilters.outer_material) {
                        return false;
                    }
                    return true;
                });
                renderKidsProducts(filteredProducts);
            }

            // Event Listeners para los botones de filtro
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filterType = button.dataset.filter;
                    const filterValue = button.dataset.value;

                    // Deseleccionar cualquier otro botón del mismo grupo de filtro
                    document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(btn => {
                        btn.classList.remove('selected');
                    });

                    button.classList.add('selected');
                    activeFilters[filterType] = filterValue;
                });
            });

            // Event Listeners para las opciones de color
            colorOptions.forEach(option => {
                option.addEventListener('click', (event) => {
                    const filterType = option.dataset.filter;
                    const filterValue = option.dataset.value;
            
                    // Deseleccionar cualquier otra opción de color
                    document.querySelectorAll(`.color-option`).forEach(opt => {
                        opt.classList.remove('selected');
                    });
            
                    option.classList.add('selected');
                    activeFilters[filterType] = filterValue;
                });
            });

            // Event Listener para el botón de aplicar filtros
            applyFiltersBtn.addEventListener('click', filterKidsProducts);

            // Event Listener para el botón de limpiar filtros
            clearFiltersBtn.addEventListener('click', () => {
                for (const key in activeFilters) {
                    activeFilters[key] = null;
                }
                filterButtons.forEach(button => button.classList.remove('selected'));
                colorOptions.forEach(option => option.classList.remove('selected'));
                renderKidsProducts(kidsProductsData); // Mostrar todos los productos
            });

            // Renderizar productos iniciales al cargar la página de niños
            if (kidsProductsGrid) {
                renderKidsProducts(kidsProductsData);
            }
        });