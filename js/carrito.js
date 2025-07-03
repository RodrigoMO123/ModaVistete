        // Custom Message Box Function (reutilizado)
        function showCustomMessage(message) {
            const messageBox = document.getElementById('customMessageBox');
            const messageText = document.getElementById('customMessageText');
            const closeBtn = document.getElementById('customMessageCloseBtn');

            messageText.textContent = message;
            messageBox.classList.add('show');

            const closeHandler = () => {
                messageBox.classList.remove('show');
                closeBtn.removeEventListener('click', closeHandler);
                messageBox.removeEventListener('click', overlayClickHandler);
            };

            const overlayClickHandler = (event) => {
                if (event.target === messageBox) {
                    closeHandler();
                }
            };

            closeBtn.addEventListener('click', closeHandler);
            messageBox.addEventListener('click', overlayClickHandler);
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Datos de productos (simulados, puedes integrar con tu `productsData` de `index.html`)
            let cartItems = [
                { id: 'prod001', name: 'Zapato De Vestir Negro 15Z003', size: '42', price: 429.90, quantity: 1, image: 'img/jpg/zapato7.jpg' },
                { id: 'prod002', name: 'Zapato De Vestir Negro 1VAE003', size: '41', price: 430.00, quantity: 1, image: 'img/jpg/zapato8.jpg' },
                { id: 'prod003', name: 'Zapato De Vestir Taupe 1VAE003', size: '41', price: 430.00, quantity: 1, image: 'img/jpg/zapato9.jpg' }
            ];

            // Elementos del DOM para los pasos del checkout
            const mainContainer = document.querySelector('.checkout-main-container');
            const progressBarSteps = document.querySelectorAll('.progress-step');
            const checkoutStepsContent = document.querySelectorAll('.checkout-step-content');
            const cartStep = document.getElementById('cartStep');
            const personalDataStep = document.getElementById('personalDataStep');
            const shippingStep = document.getElementById('shippingStep');
            const paymentStep = document.getElementById('paymentStep');
            const purchaseSuccess = document.getElementById('purchaseSuccess');
            const checkoutSummarySidebar = document.getElementById('checkoutSummarySidebar'); // Referencia al sidebar

            let currentStep = 0; // 0: Carrito, 1: Datos Personales, 2: Envío, 3: Pago, 4: Éxito

            // Elementos del Carrito
            const cartItemsList = document.getElementById('cartItemsList');
            const cartSubtotalElem = document.getElementById('cartSubtotal');
            const cartShippingElem = document.getElementById('cartShipping');
            const cartTotalElem = document.getElementById('cartTotal');
            const finalizePurchaseBtn = document.getElementById('finalizePurchaseBtn');

            // Elementos Paso 1: Datos Personales
            const emailInputSection = document.getElementById('emailInputSection');
            const checkoutEmailInput = document.getElementById('checkoutEmail');
            const continueEmailBtn = document.getElementById('continueEmailBtn');
            const personalDataFormFull = document.getElementById('personalDataFormFull');
            const personalEmailInput = document.getElementById('personalEmail');
            const personalNameInput = document.getElementById('personalName');
            const personalLastNameInput = document.getElementById('personalLastName');
            const personalDocIdInput = document.getElementById('personalDocId');
            const personalPhoneInput = document.getElementById('personalPhone');
            const personalAddressInput = document.getElementById('personalAddress');
            const personalDepartmentSelect = document.getElementById('personalDepartment');
            const personalProvinceSelect = document.getElementById('personalProvince');
            const personalDistrictSelect = document.getElementById('personalDistrict');
            const acceptTermsCheckbox = document.getElementById('acceptTerms');
            const authorizeDataCheckbox = document.getElementById('authorizeData');
            const continuePersonalDataBtn = document.getElementById('continuePersonalDataBtn');

            // Elementos Paso 2: Envío
            const deliveryOptionBtn = document.getElementById('deliveryOptionBtn');
            const pickupOptionBtn = document.getElementById('pickupOptionBtn');
            const deliveryDetails = document.getElementById('deliveryDetails');
            const pickupDetails = document.getElementById('pickupDetails');
            const continueShippingBtn = document.getElementById('continueShippingBtn');
            let selectedShippingType = 'delivery'; // 'delivery' or 'pickup'

            // Elementos Paso 3: Pago
            const creditCardBtn = document.getElementById('creditCardBtn');
            const googlePayBtn = document.getElementById('googlePayBtn');
            const pagoEfectivoBtn = document.getElementById('pagoEfectivoBtn');
            const yapeBtn = document.getElementById('yapeBtn');
            const creditCardForm = document.getElementById('creditCardForm');
            const googlePayInfo = document.getElementById('googlePayInfo');
            const pagoEfectivoInfo = document.getElementById('pagoEfectivoInfo');
            const yapeInfo = document.getElementById('yapeInfo');
            const payNowBtn = document.getElementById('payNowBtn');
            let selectedPaymentMethod = 'credit-card';

            // --- Funciones de Renderizado y Lógica del Carrito ---

            function renderCartItems() {
                cartItemsList.innerHTML = '';
                if (cartItems.length === 0) {
                    cartItemsList.innerHTML = '<p style="text-align: center; padding: 20px; color: var(--subtle-blue);">Tu carrito está vacío. ¡Es un buen momento para explorar nuestra colección!</p>';
                    finalizePurchaseBtn.disabled = true;
                } else {
                    finalizePurchaseBtn.disabled = false;
                    cartItems.forEach(item => {
                        const cartItemElem = document.createElement('div');
                        cartItemElem.classList.add('cart-item');
                        cartItemElem.dataset.id = item.id;
                        cartItemElem.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h4>${item.name}</h4>
                                <p>Talla: ${item.size}</p>
                            </div>
                            <div class="cart-item-quantity-control">
                                <button class="decrease-quantity-btn">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="item-quantity-input">
                                <button class="increase-quantity-btn">+</button>
                            </div>
                            <span class="cart-item-price">S/ ${(item.price * item.quantity).toFixed(2)}</span>
                            <button class="remove-item-btn"><i class="fas fa-times"></i></button>
                        `;
                        cartItemsList.appendChild(cartItemElem);
                    });
                }
                updateCartSummary();
            }

            function updateCartSummary() {
                let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                let shippingCost = subtotal > 0 ? 0.00 : 0.00; // Envío gratis si el carrito no está vacío, o un costo fijo
                let total = subtotal + shippingCost;

                cartSubtotalElem.textContent = `S/ ${subtotal.toFixed(2)}`;
                cartShippingElem.textContent = `S/ ${shippingCost.toFixed(2)}`;
                cartTotalElem.textContent = `S/ ${total.toFixed(2)}`;

                // Actualizar resumen en el sidebar del checkout (si está visible)
                updateCheckoutSummarySidebar();
            }

            function updateItemQuantity(id, change) {
                const itemIndex = cartItems.findIndex(item => item.id === id);
                if (itemIndex > -1) {
                    cartItems[itemIndex].quantity += change;
                    if (cartItems[itemIndex].quantity < 1) {
                        cartItems[itemIndex].quantity = 1; // No permitir menos de 1
                    }
                    renderCartItems(); // Volver a renderizar para actualizar la UI
                }
            }

            function removeItemFromCart(id) {
                cartItems = cartItems.filter(item => item.id !== id);
                renderCartItems(); // Volver a renderizar para actualizar la UI
            }

            // Event listeners para el carrito
            cartItemsList.addEventListener('click', (event) => {
                const target = event.target;
                const itemElem = target.closest('.cart-item');
                if (!itemElem) return;

                const itemId = itemElem.dataset.id;

                if (target.classList.contains('decrease-quantity-btn')) {
                    updateItemQuantity(itemId, -1);
                } else if (target.classList.contains('increase-quantity-btn')) {
                    updateItemQuantity(itemId, 1);
                } else if (target.classList.contains('remove-item-btn') || target.closest('.remove-item-btn')) {
                    removeItemFromCart(itemId);
                }
            });

            cartItemsList.addEventListener('change', (event) => {
                const target = event.target;
                if (target.classList.contains('item-quantity-input')) {
                    const itemElem = target.closest('.cart-item');
                    const itemId = itemElem.dataset.id;
                    const newQuantity = parseInt(target.value);
                    const itemIndex = cartItems.findIndex(item => item.id === itemId);
                    if (itemIndex > -1 && newQuantity >= 1) {
                        cartItems[itemIndex].quantity = newQuantity;
                        renderCartItems();
                    } else if (itemIndex > -1 && newQuantity < 1) {
                        target.value = cartItems[itemIndex].quantity; // Restaura el valor si es inválido
                    }
                }
            });

            // --- Lógica de Navegación de Pasos ---

            function showStep(stepNumber) {
                // Ocultar todos los contenidos de los pasos
                checkoutStepsContent.forEach(content => content.classList.remove('active'));
                // Remover clases de progreso de la barra
                progressBarSteps.forEach(step => {
                    step.classList.remove('active', 'completed');
                });

                // Controlar el layout de la cuadrícula principal y la visibilidad del sidebar
                if (stepNumber >= 1 && stepNumber <= 3) {
                    mainContainer.classList.add('checkout-grid-layout');
                    checkoutSummarySidebar.style.display = 'flex'; // Mostrar el sidebar
                } else {
                    mainContainer.classList.remove('checkout-grid-layout');
                    checkoutSummarySidebar.style.display = 'none'; // Ocultar el sidebar
                }

                // Mostrar el paso actual y actualizar la barra de progreso
                if (stepNumber === 0) { // Carrito
                    cartStep.classList.add('active');
                } else if (stepNumber === 1) { // Datos Personales
                    personalDataStep.classList.add('active');
                    progressBarSteps[0].classList.add('active');
                } else if (stepNumber === 2) { // Envío
                    shippingStep.classList.add('active');
                    progressBarSteps[0].classList.add('completed');
                    progressBarSteps[1].classList.add('active');
                } else if (stepNumber === 3) { // Pago
                    paymentStep.classList.add('active');
                    progressBarSteps[0].classList.add('completed');
                    progressBarSteps[1].classList.add('completed');
                    progressBarSteps[2].classList.add('active');
                } else if (stepNumber === 4) { // Éxito
                    purchaseSuccess.classList.add('active');
                    progressBarSteps.forEach(step => step.classList.add('completed'));
                    mainContainer.classList.remove('checkout-grid-layout'); // Quitar layout de grid para el mensaje de éxito
                    checkoutSummarySidebar.style.display = 'none'; // Asegurarse de que el sidebar esté oculto
                }
                currentStep = stepNumber;
                updateCheckoutSummarySidebar(); // Asegurar que el sidebar se actualice con cada paso
            }

            // --- Resumen de Compra en Sidebar (para pasos 1, 2, 3) ---
            function updateCheckoutSummarySidebar() {
                // Asegurarse de que el sidebar exista antes de intentar acceder a sus elementos internos
                if (!checkoutSummarySidebar) return;

                const summaryProductsContainer = checkoutSummarySidebar.querySelector('.summary-products-list');
                const summarySubtotalElem = checkoutSummarySidebar.querySelector('#summarySubtotal');
                const summaryShippingElem = checkoutSummarySidebar.querySelector('#summaryShipping');
                const summaryTotalElem = checkoutSummarySidebar.querySelector('#summaryTotal');

                if (summaryProductsContainer) {
                    summaryProductsContainer.innerHTML = '';
                    cartItems.forEach(item => {
                        const productItem = document.createElement('div');
                        productItem.classList.add('summary-product-item');
                        productItem.innerHTML = `
                            <img src="${item.image}" alt="${item.name}">
                            <div class="summary-product-details">
                                <h4>${item.name}</h4>
                                <p>Talla: ${item.size} | Cant: ${item.quantity}</p>
                            </div>
                            <span class="summary-product-price">S/ ${(item.price * item.quantity).toFixed(2)}</span>
                        `;
                        summaryProductsContainer.appendChild(productItem);
                    });
                }

                let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                let shippingCost = subtotal > 0 ? 0.00 : 0.00; // Envío gratis si el carrito no está vacío
                let total = subtotal + shippingCost;

                if (summarySubtotalElem) summarySubtotalElem.textContent = `S/ ${subtotal.toFixed(2)}`;
                if (summaryShippingElem) summaryShippingElem.textContent = `S/ ${shippingCost.toFixed(2)}`;
                if (summaryTotalElem) summaryTotalElem.textContent = `S/ ${total.toFixed(2)}`;
            }

            // --- Lógica de Botones de Navegación ---

            finalizePurchaseBtn.addEventListener('click', () => {
                if (cartItems.length === 0) {
                    showCustomMessage('Tu carrito está vacío. Añade productos para finalizar la compra.');
                    return;
                }
                showStep(1); // Ir a Paso 1
            });

            continueEmailBtn.addEventListener('click', () => {
                if (checkoutEmailInput.reportValidity()) {
                    personalEmailInput.value = checkoutEmailInput.value;
                    emailInputSection.style.display = 'none';
                    personalDataFormFull.style.display = 'flex'; // Usar flex para la nueva disposición
                } else {
                    showCustomMessage('Por favor, ingresa un correo electrónico válido.');
                }
            });

            continuePersonalDataBtn.addEventListener('click', () => {
                const form = personalDataFormFull;
                // Get all required inputs and selects within the form
                const requiredInputs = form.querySelectorAll('input[required], select[required]');
                let allFieldsValid = true;

                requiredInputs.forEach(input => {
                    if (!input.reportValidity()) {
                        allFieldsValid = false;
                    }
                });

                if (allFieldsValid && acceptTermsCheckbox.checked) {
                    showStep(2); // Ir a Paso 2
                } else {
                    showCustomMessage('Por favor, completa todos los campos requeridos y acepta los términos y condiciones.');
                }
            });

            // Lógica de selección de envío
            deliveryOptionBtn.addEventListener('click', () => {
                deliveryOptionBtn.classList.add('selected');
                pickupOptionBtn.classList.remove('selected');
                deliveryDetails.classList.add('active');
                pickupDetails.classList.remove('active');
                selectedShippingType = 'delivery';
            });

            pickupOptionBtn.addEventListener('click', () => {
                pickupOptionBtn.classList.add('selected');
                deliveryOptionBtn.classList.remove('selected');
                pickupDetails.classList.add('active');
                deliveryDetails.classList.remove('active');
                selectedShippingType = 'pickup';
            });

            continueShippingBtn.addEventListener('click', () => {
                let isValid = true;
                if (selectedShippingType === 'delivery') {
                    // Validar campos de envío a domicilio
                    const inputs = deliveryDetails.querySelectorAll('input[required], select[required]');
                    inputs.forEach(input => {
                        if (!input.reportValidity()) {
                            isValid = false;
                        }
                    });
                } else {
                    // Validar campos de recogida en tienda
                    // No hay campos requeridos en la simulación actual de recogida, solo el botón de ubicación
                }

                if (isValid) {
                    showStep(3); // Ir a Paso 3
                } else {
                    showCustomMessage('Por favor, completa todos los campos de envío/recogida requeridos.');
                }
            });

            // Lógica de selección de método de pago
            document.querySelectorAll('.payment-method-btn').forEach(button => {
                button.addEventListener('click', () => {
                    document.querySelectorAll('.payment-method-btn').forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                    selectedPaymentMethod = button.dataset.paymentMethod;

                    // Ocultar todos los formularios de pago y mostrar el seleccionado
                    creditCardForm.classList.remove('active');
                    googlePayInfo.classList.remove('active');
                    pagoEfectivoInfo.classList.remove('active');
                    yapeInfo.classList.remove('active');

                    if (selectedPaymentMethod === 'credit-card') {
                        creditCardForm.classList.add('active');
                    } else if (selectedPaymentMethod === 'google-pay') {
                        googlePayInfo.classList.add('active');
                    } else if (selectedPaymentMethod === 'pago-efectivo') {
                        pagoEfectivoInfo.classList.add('active');
                    } else if (selectedPaymentMethod === 'yape') {
                        yapeInfo.classList.add('active');
                    }
                });
            });

            payNowBtn.addEventListener('click', () => {
                let isValid = true;
                if (selectedPaymentMethod === 'credit-card') {
                    const inputs = creditCardForm.querySelectorAll('input[required], select[required]');
                     inputs.forEach(input => {
                        if (!input.reportValidity()) {
                            isValid = false;
                        }
                    });
                }
                // Otros métodos de pago no tienen validación de formulario compleja aquí, solo simulación
                
                if (isValid) {
                    showCustomMessage('Procesando tu pago...');
                    setTimeout(() => {
                        showStep(4); // Ir a la página de éxito
                        cartItems = []; // Vaciar el carrito
                        renderCartItems(); // Actualizar el carrito vacío
                    }, 2000); // Simular el procesamiento del pago
                } else {
                    showCustomMessage('Por favor, completa los detalles de pago requeridos.');
                }
            });

            // Inicializar el carrito y mostrar el primer paso
            renderCartItems();
            showStep(0); // Mostrar el carrito al cargar la página
        });
