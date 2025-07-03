// main.js
document.addEventListener('DOMContentLoaded', () => {
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

            // 2. Lógica del Carrusel del Banner Principal (ahora cada 7 segundos)
            const heroSlides = document.querySelectorAll('.hero-carousel .carousel-slide');
            const totalHeroSlides = heroSlides.length;
            let currentHeroSlide = 0;
            let heroSlideInterval;

            function showHeroSlide(index) {
                heroSlides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                    }
                });
            }

            function nextHeroSlide() {
                currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
                showHeroSlide(currentHeroSlide);
            }

            function prevHeroSlide() {
                currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
                showHeroSlide(currentHeroSlide);
            }

            function startHeroSlideShow() {
                heroSlideInterval = setInterval(nextHeroSlide, 7000); // Rotación cada 7 segundos
            }

            function stopHeroSlideShow() {
                clearInterval(heroSlideInterval);
            }

            const heroLeftArrow = document.querySelector('.hero-carousel .carousel-arrow-left');
            const heroRightArrow = document.querySelector('.hero-carousel .carousel-arrow-right');

            if (heroLeftArrow && heroRightArrow) {
                heroLeftArrow.addEventListener('click', () => {
                    stopHeroSlideShow();
                    prevHeroSlide();
                    startHeroSlideShow();
                });

                heroRightArrow.addEventListener('click', () => {
                    stopHeroSlideShow();
                    nextHeroSlide();
                    startHeroSlideShow();
                });
            }

            showHeroSlide(currentHeroSlide);
            startHeroSlideShow();


            // 3. Lógica del Carrusel de Productos Destacados (Bucle Infinito)
            const productsCarouselTrack = document.querySelector('.products-carousel-track');
            const productsLeftArrow = document.querySelector('.products-carousel-nav-left');
            const productsRightArrow = document.querySelector('.products-carousel-nav-right');

            const productsData = [
                {
                    id: 'prod001',
                    name: 'Bota Táctica "Apex"',
                    price: 249.99,
                    image: 'img/jpg/zapato7.jpg',
                    description: 'Diseñadas para terrenos extremos, máxima tracción y resistencia a la abrasión. Perfectas para la aventura.',
                    availability: 'En Stock',
                    code: 'BT-A001',
                    type: 'Bota Táctica',
                    vendor: 'Vístete',
                    sizes: ['38', '39', '40', '41', '42', '43']
                },
                {
                    id: 'prod002',
                    name: 'Runner de Ciudad "Dash"',
                    price: 139.50,
                    image: 'img/jpg/zapato8.jpg',
                    description: 'Ultraligeras y con amortiguación adaptable, ideales para conquistar el asfalto urbano con estilo y velocidad.',
                    availability: 'En Stock',
                    code: 'RC-D002',
                    type: 'Zapatilla Deportiva',
                    vendor: 'Vístete',
                    sizes: ['36', '37', '38', '39', '40', '41']
                },
                {
                    id: 'prod003',
                    name: 'Zapatilla Casual "Forge"',
                    price: 99.00,
                    image: 'img/jpg/zapato9.jpg',
                    description: 'Confeccionadas con materiales de primera calidad, ofrecen una comodidad inigualable y un diseño minimalista. Versatilidad para el día a día.',
                    availability: 'En Stock',
                    code: 'ZC-F003',
                    type: 'Zapatilla Casual',
                    vendor: 'Vístete',
                    sizes: ['39', '40', '41', '42', '43', '44']
                },
                {
                    id: 'prod004',
                    name: 'Botín Urbano "Vanguard"',
                    price: 180.00,
                    image: 'img/jpg/zapato10.jpg',
                    description: 'La combinación perfecta de robustez y elegancia. Ideales para el entorno urbano que exige resistencia y distinción.',
                    availability: 'Últimas Unidades',
                    code: 'BU-V004',
                    type: 'Botín Urbano',
                    vendor: 'Vístete',
                    sizes: ['40', '41', '42', '43', '44', '45']
                },
                {
                    id: 'prod005',
                    name: 'Zapatos Oxford "Clásico Elite"',
                    price: 165.00,
                    image: 'img/jpg/zapato11.jpg',
                    description: 'Diseño atemporal con un toque moderno. Perfecto para ocasiones formales y profesionales.',
                    availability: 'En Stock',
                    code: 'ZO-CE05',
                    type: 'Zapato Formal',
                    vendor: 'Vístete',
                    sizes: ['39', '40', '41', '42', '43']
                },
                {
                    id: 'prod006',
                    name: 'Sandalias Deportivas "Hydro"',
                    price: 75.00,
                    image: 'img/jpg/zapato12.jpg',
                    description: 'Ligeras, transpirables y de secado rápido. Ideales para el verano y actividades acuáticas.',
                    availability: 'En Stock',
                    code: 'SD-H006',
                    type: 'Sandalia',
                    vendor: 'Vístete',
                    sizes: ['36', '37', '38', '39', '40']
                }
            ];

            function createProductCarouselCard(product) {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card-carousel');
                productCard.dataset.productId = product.id;

                productCard.innerHTML = `
                    <div class="product-card-carousel-img-container">
                        <img src="${product.image}" alt="${product.name}">
                        <span class="product-price-tag">$${product.price.toFixed(2)}</span>
                        <div class="product-actions-overlay">
                            <button class="action-icon-btn favorite-btn" aria-label="Añadir a favoritos">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="action-icon-btn cart-btn" aria-label="Añadir al carrito">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                            <button class="action-icon-btn view-details-btn" aria-label="Ver detalles">
                                <i class="fas fa-search-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="product-card-carousel-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                `;
                return productCard;
            }

            let productScrollPosition = 0;
            const productCardWidth = 350 + 40; // Ancho de la tarjeta + gap

            function setupInfiniteProductCarousel() {
                productsCarouselTrack.innerHTML = '';
                // Duplicar los productos suficientes veces para asegurar el "loop" visual
                const numCopies = 3; // Mostrar al menos 3 copias de los productos
                for (let j = 0; j < numCopies; j++) {
                    productsData.forEach(product => {
                        productsCarouselTrack.appendChild(createProductCarouselCard(product));
                    });
                }
                // Ajustar la posición inicial para que parezca un bucle continuo
                productScrollPosition = productsData.length * productCardWidth; // Posicionarse al inicio de la segunda "copia"
                productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;
                productsCarouselTrack.style.transition = 'none'; // Desactivar transición para el salto inicial

                // Re-activar la transición después de un breve momento
                setTimeout(() => {
                    productsCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }

            setupInfiniteProductCarousel();

            productsRightArrow.addEventListener('click', () => {
                productScrollPosition += productCardWidth;
                productsCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
                productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;

                // Si se desplaza más allá de la primera copia completa de los productos originales,
                // "resetea" la posición del scroll de forma instantánea para simular el bucle.
                if (productScrollPosition >= (productsData.length * productCardWidth * 2)) {
                    setTimeout(() => {
                        productsCarouselTrack.style.transition = 'none';
                        productScrollPosition = productsData.length * productCardWidth;
                        productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;
                    }, 500); // Coincide con la duración de la transición CSS
                }
            });

            productsLeftArrow.addEventListener('click', () => {
                productScrollPosition -= productCardWidth;
                productsCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
                productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;

                // Si se desplaza antes del inicio de la segunda copia de los productos originales,
                // "salta" al final de la segunda copia para simular el bucle.
                if (productScrollPosition < productsData.length * productCardWidth) {
                    setTimeout(() => {
                        productsCarouselTrack.style.transition = 'none';
                        productScrollPosition = (productsData.length * productCardWidth * 2) - productCardWidth; // Ir al final de la segunda copia
                        productsCarouselTrack.style.transform = `translateX(-${productScrollPosition}px)`;
                    }, 500);
                }
            });


            // 4. Lógica de la Sección de Categorías (Draggable e Infinite Loop con Auto-scroll)
            const categoriesCarouselContainer = document.querySelector('.categories-carousel-container');
            const categoriesCarouselTrack = categoriesCarouselContainer.querySelector('.categories-carousel-track');
            
            const categoryData = [
                { title: 'FASHION', image: 'img/jpg/zapato13.jpg' },
                { title: 'SPRING', image: 'img/jpg/zapato14.jpg' },
                { title: 'FESTIVAL', image: 'img/jpg/zapato15.jpg' },
                { title: 'SEASON', image: 'img/jpg/zapato16.jpg' },
                { title: 'URBAN', image: 'img/jpg/zapato17.jpg' },
                { title: 'LUXE', image: 'img/jpg/zapato18.jpg' }
            ];

            function createCategoryCard(category) {
                const card = document.createElement('div');
                card.classList.add('category-card-draggable');
                card.innerHTML = `
                    <img src="${category.image}" alt="Categoría ${category.title}">
                    <span class="category-title-overlay">${category.title}</span>
                `;
                return card;
            }

            let isDraggingCategories = false;
            let startXCategories;
            let scrollLeftCategories;
            let categoriesInterval;
            const categoryCardWidth = 400 + 20; // Ancho de la tarjeta + gap (300px width + 20px gap)

            function setupInfiniteCategoryCarousel() {
                categoriesCarouselTrack.innerHTML = '';
                // Duplicar los productos suficientes veces para asegurar el "loop" visual
                const numCopies = 3; // Mostrar al menos 3 copias de los productos
                for (let j = 0; j < numCopies; j++) {
                    categoryData.forEach(category => categoriesCarouselTrack.appendChild(createCategoryCard(category)));
                }
                // Ajustar la posición inicial para que parezca un bucle continuo
                categoriesCarouselTrack.style.transform = `translateX(-${categoryData.length * categoryCardWidth}px)`;
                categoriesCarouselTrack.style.transition = 'none'; // Desactivar transición para el salto inicial

                // Re-activar la transición después de un breve momento
                setTimeout(() => {
                    categoriesCarouselTrack.style.transition = 'transform 0.3s ease-out';
                }, 50);
            }

            setupInfiniteCategoryCarousel();

            // Auto-scroll para categorías (cada 4 segundos)
            function startCategoriesAutoScroll() {
                categoriesInterval = setInterval(() => {
                    const currentTransform = categoriesCarouselTrack.style.transform;
                    let currentX = currentTransform ? parseFloat(currentTransform.match(/-?[\d.]+/)[0]) : 0;
                    
                    let targetX = currentX - categoryCardWidth; // Mover a la izquierda

                    const totalOriginalWidth = categoryData.length * categoryCardWidth;
                    
                    // Si el carrusel se ha desplazado más allá de la segunda "copia" de los elementos originales,
                    // lo reinicia instantáneamente a la posición de la primera copia para simular un bucle.
                    if (Math.abs(targetX) >= totalOriginalWidth * 2) {
                        categoriesCarouselTrack.style.transition = 'none'; // Deshabilitar transición
                        targetX = -totalOriginalWidth; // Salta al inicio de la primera copia real
                        setTimeout(() => {
                            categoriesCarouselTrack.style.transition = 'transform 0.3s ease-out'; // Reactivar transición
                        }, 50);
                    }
                    categoriesCarouselTrack.style.transform = `translateX(${targetX}px)`;
                }, 4000); // Cada 4 segundos
            }

            function stopCategoriesAutoScroll() {
                clearInterval(categoriesInterval);
            }

            startCategoriesAutoScroll(); // Iniciar auto-scroll al cargar

            // Lógica de arrastre (drag) para categorías
            let categoriesCurrentX = 0; // Guardar la posición actual del transform
            let categoriesStartDragX = 0; // Posición X al inicio del arrastre
            let categoriesStartTransformX = 0; // Transformación X al inicio del arrastre
            
            categoriesCarouselContainer.addEventListener('click', (e) => {
                if(categoriesCurrentX != 0) {
                    window.location.href = "#";
                    console.log(categoriesCurrentX);
                } else {
                
                }
            });
            categoriesCarouselContainer.addEventListener('mousedown', (e) => {
                isDraggingCategories = true;

                categoriesCarouselContainer.classList.add('grabbing');
                categoriesStartDragX = e.pageX;
                const currentTransform = categoriesCarouselTrack.style.transform;
                categoriesStartTransformX = currentTransform ? parseFloat(currentTransform.match(/-?[\d.]+/)[0]) : 0;
                stopCategoriesAutoScroll(); // Pausar auto-scroll al arrastrar
                categoriesCarouselTrack.style.transition = 'none'; // Desactivar transición al arrastrar
                e.preventDefault();
            });

            categoriesCarouselContainer.addEventListener('mouseleave', () => {
                if (isDraggingCategories) {
                    isDraggingCategories = false;
                    categoriesCarouselContainer.classList.remove('grabbing');
                    categoriesCarouselTrack.style.transition = 'transform 0.3s ease-out'; // Reactivar transición
                    startCategoriesAutoScroll(); // Retomar auto-scroll al salir
                }
            });

            categoriesCarouselContainer.addEventListener('mouseup', () => {
                if (isDraggingCategories) {
                    isDraggingCategories = false;
                    categoriesCarouselContainer.classList.remove('grabbing');
                    categoriesCarouselTrack.style.transition = 'transform 0.3s ease-out'; // Reactivar transición al soltar
                    startCategoriesAutoScroll(); // Retomar auto-scroll al soltar
                }
            });

            categoriesCarouselContainer.addEventListener('mousemove', (e) => {
                if (!isDraggingCategories) return;
                e.preventDefault(); // Evitar selección de texto y arrastre de imágenes nativo

                const dx = e.pageX - categoriesStartDragX;
                categoriesCurrentX = categoriesStartTransformX + dx;
                categoriesCarouselTrack.style.transform = `translateX(${categoriesCurrentX}px)`;

                // Lógica de bucle para arrastre:
                const totalOriginalWidth = categoryData.length * categoryCardWidth;
                // Si arrastra demasiado a la derecha (menos negativo), salta al final de la copia anterior
                if (categoriesCurrentX > 0) {
                    categoriesCarouselTrack.style.transition = 'none';
                    categoriesCurrentX -= totalOriginalWidth; // Salta un bloque completo hacia la izquierda
                    categoriesCarouselTrack.style.transform = `translateX(${categoriesCurrentX}px)`;
                    categoriesStartDragX = e.pageX; // Resetear startX para que el arrastre siga siendo fluido
                    categoriesStartTransformX = categoriesCurrentX;
                }
                // Si arrastra demasiado a la izquierda (más negativo), salta al inicio de la siguiente copia
                else if (Math.abs(categoriesCurrentX) > totalOriginalWidth * 2) {
                    categoriesCarouselTrack.style.transition = 'none';
                    categoriesCurrentX += totalOriginalWidth; // Salta un bloque completo hacia la derecha
                    categoriesCarouselTrack.style.transform = `translateX(${categoriesCurrentX}px)`;
                    categoriesStartDragX = e.pageX;
                    categoriesStartTransformX = categoriesCurrentX;
                }                    
               
            });

            // Compatibilidad con Touch para arrastrar (similar al de mouse)
            categoriesCarouselContainer.addEventListener('touchstart', (e) => {
                isDraggingCategories = true;
                categoriesCarouselContainer.classList.add('grabbing');
                categoriesStartDragX = e.touches[0].pageX;
                const currentTransform = categoriesCarouselTrack.style.transform;
                categoriesStartTransformX = currentTransform ? parseFloat(currentTransform.match(/-?[\d.]+/)[0]) : 0;
                stopCategoriesAutoScroll();
                categoriesCarouselTrack.style.transition = 'none';
            });

            categoriesCarouselContainer.addEventListener('touchend', () => {
                if (isDraggingCategories) {
                    isDraggingCategories = false;
                    categoriesCarouselContainer.classList.remove('grabbing');
                    categoriesCarouselTrack.style.transition = 'transform 0.3s ease-out';
                    startCategoriesAutoScroll();
                }
            });

            categoriesCarouselContainer.addEventListener('touchmove', (e) => {
                if (!isDraggingCategories) return;
                e.preventDefault();
                const dx = e.touches[0].pageX - categoriesStartDragX;
                categoriesCurrentX = categoriesStartTransformX + dx;
                categoriesCarouselTrack.style.transform = `translateX(${categoriesCurrentX}px)`;

                // Lógica de bucle para arrastre (touch):
                const totalOriginalWidth = categoryData.length * categoryCardWidth;
                if (categoriesCurrentX > 0) {
                    categoriesCarouselTrack.style.transition = 'none';
                    categoriesCurrentX -= totalOriginalWidth;
                    categoriesCarouselTrack.style.transform = `translateX(${categoriesCurrentX}px)`;
                    categoriesStartDragX = e.touches[0].pageX;
                    categoriesStartTransformX = categoriesCurrentX;
                }
                else if (Math.abs(categoriesCurrentX) > totalOriginalWidth * 2) {
                    categoriesCarouselTrack.style.transition = 'none';
                    categoriesCurrentX += totalOriginalWidth;
                    categoriesCarouselTrack.style.transform = `translateX(${categoriesCurrentX}px)`;
                    categoriesStartDragX = e.touches[0].pageX;
                    categoriesStartTransformX = categoriesCurrentX;
                }
            });


            // 5. Manejo del formulario de Novedades (sección CTA inferior)
            const ctaForm = document.querySelector('.cta-form');
            if (ctaForm) {
                ctaForm.addEventListener('submit', (event) => {
                    event.preventDefault(); // Evita que el formulario se envíe
                    const emailInput = ctaForm.querySelector('input[type="email"]');
                    alert(`¡GRACIAS por unirte a la comunidad Vístete con el correo: ${emailInput.value}! Prepárate para recibir noticias de vanguardia.`);
                    emailInput.value = ''; // Limpiar el campo
                });
            }

            // 6. Funcionalidad de iconos de acción (simulada)
            productsCarouselTrack.addEventListener('click', (event) => {
                const targetBtn = event.target.closest('.action-icon-btn');
                if (!targetBtn) return; // No es un botón de acción

                const productCard = targetBtn.closest('.product-card-carousel');
                if (!productCard) {
                    console.error('Clicked button is not inside a product card.');
                    return;
                }
                
                const productId = productCard.dataset.productId;
                console.log('Clicked Product ID:', productId); // Debug log
                
                const product = productsData.find(p => p.id === productId);
                console.log('Found Product Data:', product); // Debug log

                if (!product) { // This check should now prevent calling showProductDetailsModal with undefined product.
                    console.error('Product data not found for ID:', productId);
                    return;
                }

                if (targetBtn.classList.contains('favorite-btn')) {
                    alert(`"${product.name}" ha sido añadido a tus favoritos. (Simulado)`);
                } else if (targetBtn.classList.contains('cart-btn')) {
                    alert(`"${product.name}" ha sido añadido al carrito. (Simulado)`);
                } else if (targetBtn.classList.contains('view-details-btn')) {
                    // Mostrar modal de detalles del producto
                    showProductDetailsModal(product);
                }
            });

            // 7. Animación de desplazamiento suave para anclas
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // 8. Lógica del Pop-up Modal de Suscripción
            const newsletterModal = document.getElementById('newsletterModal');
            const newsletterCloseBtn = newsletterModal.querySelector('.modal-close-btn');
            const newsletterForm = newsletterModal.querySelector('.modal-newsletter-form');
            const dontShowAgainCheckbox = document.getElementById('dontShowAgain');
            const hasSeenNewsletterModal = localStorage.getItem('hasSeenNewsletterModal');

            if (!hasSeenNewsletterModal) {
                setTimeout(() => {
                    newsletterModal.style.display = 'flex';
                    setTimeout(() => {
                        newsletterModal.classList.add('active');
                    }, 50);
                }, 2000);
            }

            newsletterCloseBtn.addEventListener('click', () => {
                newsletterModal.classList.remove('active');
                setTimeout(() => {
                    newsletterModal.style.display = 'none';
                }, 300);
                if (dontShowAgainCheckbox.checked) {
                    localStorage.setItem('hasSeenNewsletterModal', 'true');
                }
            });

            newsletterModal.addEventListener('click', (event) => {
                if (event.target === newsletterModal) {
                    newsletterModal.classList.remove('active');
                    setTimeout(() => {
                        newsletterModal.style.display = 'none';
                    }, 300);
                    if (dontShowAgainCheckbox.checked) {
                        localStorage.setItem('hasSeenNewsletterModal', 'true');
                    }
                }
            });


            if (newsletterForm) {
                newsletterForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const emailInput = newsletterForm.querySelector('input[type="email"]');
                    alert(`¡Bienvenido/a a la élite de Vístete con: ${emailInput.value}! Gracias por tu registro.`);
                    emailInput.value = '';
                    
                    newsletterModal.classList.remove('active');
                    setTimeout(() => {
                        newsletterModal.style.display = 'none';
                    }, 300);

                    if (dontShowAgainCheckbox.checked) {
                        localStorage.setItem('hasSeenNewsletterModal', 'true');
                    }
                });
            }

            // 9. Lógica del Modal de Detalles del Producto
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
                
                alert(`"${productName}" x ${quantity}${sizeInfo} ha sido añadido al carrito. (Simulado)`);
                
                // Cerrar el modal después de añadir al carrito
                productDetailsModal.classList.remove('active');
                setTimeout(() => {
                    productDetailsModal.style.display = 'none';
                }, 300);
            });

            // 10. Lógica de la Sección "Próximos Diseños" (Coming Soon)
            const comingSoonCards = document.querySelectorAll('.coming-soon-card');
            
            const productsComingSoon = [
                {
                    name: 'Modelo Elegancia Clásica',
                    image: 'img/jpg/zapato16.jpg',
                    themeColor: '#2b5a74' // Dark blue-green
                },
                {
                    name: 'Estilo Urbano Avant-Garde',
                    image: 'img/jpg/zapato17.jpg',
                    themeColor: '#6d5550' // Muted reddish-brown
                }
            ];

            // Initialize content and background color for each card
            comingSoonCards.forEach(card => {
                const imgElement = card.querySelector('.coming-soon-image-display');
                const nameElement = card.querySelector('.coming-soon-product-name');
                const originalProductIndex = parseInt(card.dataset.originalProduct);
                
                const initialProduct = productsComingSoon[originalProductIndex]; // Get the initial product data
                imgElement.src = initialProduct.image;
                nameElement.textContent = initialProduct.name;
                card.style.backgroundColor = initialProduct.themeColor; // Set initial background color
            });


            function animateComingSoonCard(cardElement, targetProductIndex) {
                const imgElement = cardElement.querySelector('.coming-soon-image-display');
                const nameElement = cardElement.querySelector('.coming-soon-product-name');
                const targetProduct = productsComingSoon[targetProductIndex];
                
                // Set target background color when transitioning in (for smooth color change)
                cardElement.style.backgroundColor = targetProduct.themeColor;

                // Phase 1: Wipe In (Shrink from outside to cover)
                cardElement.classList.add('transition-in'); 
                
                setTimeout(() => {
                    // Phase 2: Swap content when overlay is mostly covering
                    imgElement.src = targetProduct.image;
                    nameElement.textContent = targetProduct.name;

                    // Phase 3: Wipe Out (Expand from center to reveal)
                    cardElement.classList.remove('transition-in');
                    cardElement.classList.add('transition-out'); 

                    setTimeout(() => {
                        cardElement.classList.remove('transition-out'); 
                    }, 500); // Same duration as CSS transition
                }, 500); // Duration of the 'transition-in' CSS transition
            }

            comingSoonCards.forEach(card => {
                const originalProductIndex = parseInt(card.dataset.originalProduct);
                const hoverProductIndex = parseInt(card.dataset.hoverProduct); 

                card.addEventListener('mouseenter', () => {
                    animateComingSoonCard(card, hoverProductIndex);
                });

                card.addEventListener('mouseleave', () => {
                    animateComingSoonCard(card, originalProductIndex); // Return to original product
                });
            });
        });