        document.addEventListener('DOMContentLoaded', () => {
            const livePreviewFrame = document.getElementById('livePreviewFrame');
            let previewDoc = null;

            // Esperar a que el iframe cargue para obtener su contenido
            livePreviewFrame.onload = () => {
                previewDoc = livePreviewFrame.contentDocument || livePreviewFrame.contentWindow.document;
                console.log('Iframe cargado y previewDoc disponible.');
            };

            // Función para actualizar un elemento en el iframe de previsualización
            function updatePreview(selector, property, value) {
                if (!previewDoc) {
                    console.warn('Preview document not ready.');
                    return;
                }

                if (selector === 'document.title') {
                    previewDoc.title = value;
                    return;
                }

                const elements = previewDoc.querySelectorAll(selector);
                elements.forEach(element => {
                    if (property === 'textContent') {
                        element.textContent = value;
                    } else if (property === 'src') {
                        element.src = value;
                    } else if (property === 'backgroundImage') {
                        element.style.backgroundImage = `url('${value}')`;
                    } else if (property === 'backgroundColor') {
                        element.style.backgroundColor = value;
                    }
                    // Agrega más propiedades CSS o atributos HTML según sea necesario
                });
            }

            // 1. Navegación de la barra lateral
            const sidebarMenuItems = document.querySelectorAll('.admin-sidebar-nav .menu-item');
            const adminCardSections = document.querySelectorAll('.admin-card-section');

            sidebarMenuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault(); // Evita el salto de ancla por defecto
                    const targetSectionId = item.dataset.section;

                    // Remover 'active' de todos los elementos del menú y secciones
                    sidebarMenuItems.forEach(li => li.classList.remove('active'));
                    adminCardSections.forEach(section => section.classList.remove('active-section'));

                    // Añadir 'active' al elemento del menú y sección clicados
                    item.classList.add('active');
                    document.getElementById(targetSectionId).classList.add('active-section');
                });
            });

            // 2. Lógica para alternar entre Subir Imagen y Pegar URL
            // Modificado para inicializar solo si los elementos existen
            document.querySelectorAll('.image-upload-options').forEach(optionsContainer => {
                const toggleUploadBtn = optionsContainer.querySelector('.btn-toggle-upload');
                const toggleUrlBtn = optionsContainer.querySelector('.btn-toggle-url');
                
                if (toggleUploadBtn && toggleUrlBtn) { // Asegurarse de que los botones existen
                    const uploadArea = document.getElementById(toggleUploadBtn.dataset.toggleTarget);
                    const urlArea = document.getElementById(toggleUrlBtn.dataset.toggleTarget);

                    // Mostrar por defecto el área de URL si ya tiene un valor
                    const urlInput = urlArea.querySelector('.image-url-input');
                    if (urlInput && urlInput.value) {
                        urlArea.classList.remove('hidden');
                        toggleUrlBtn.classList.add('active');
                    } else {
                        uploadArea.classList.remove('hidden');
                        toggleUploadBtn.classList.add('active');
                    }

                    toggleUploadBtn.addEventListener('click', () => {
                        uploadArea.classList.remove('hidden');
                        urlArea.classList.add('hidden');
                        toggleUploadBtn.classList.add('active');
                        toggleUrlBtn.classList.remove('active');
                    });

                    toggleUrlBtn.addEventListener('click', () => {
                        urlArea.classList.remove('hidden');
                        uploadArea.classList.add('hidden');
                        toggleUrlBtn.classList.add('active');
                        toggleUploadBtn.classList.remove('active');
                    });
                }
            });

            // 3. Lógica de Previsualización en Tiempo Real
            document.querySelectorAll('.editable-field').forEach(input => {
                input.addEventListener('input', (e) => {
                    const selector = input.dataset.targetSelector;
                    const property = input.dataset.property;
                    let value = e.target.value;

                    updatePreview(selector, property, value);
                });
            });

            // Manejo de inputs de imagen (URL y File) para previsualización
            document.querySelectorAll('.image-url-input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const previewImage = document.querySelector(input.dataset.previewTarget);
                    const selector = input.dataset.targetSelector;
                    const property = input.dataset.property;
                    const value = e.target.value;

                    if (previewImage) {
                        previewImage.src = value; // Actualiza la imagen en el panel de admin
                    }
                    updatePreview(selector, property, value); // Actualiza la imagen en el iframe
                });
            });

            document.querySelectorAll('.image-upload-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const previewImage = document.querySelector(input.dataset.previewTarget);
                    const selector = input.dataset.targetSelector;
                    const property = input.dataset.property;

                    if (e.target.files && e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = (readerEvent) => {
                            if (previewImage) {
                                previewImage.src = readerEvent.target.result;
                            }
                        };
                        reader.readAsDataURL(e.target.files[0]);
                    }
                });
            });

            // 4. Funcionalidad de "Guardar Cambios" (simulada)
            document.querySelectorAll('.btn-save').forEach(button => {
                button.addEventListener('click', () => {
                    alert('¡Cambios guardados simuladamente! En un sistema real, esto enviaría los datos al servidor.');
                });
            });

            // 5. Funcionalidad de "Eliminar" (simulada)
            // Modificado para inicializar solo si el botón existe
            document.querySelectorAll('.admin-card').forEach(card => {
                const deleteButton = card.querySelector('.btn-delete');
                if (deleteButton) { // Asegurarse de que el botón de eliminar existe
                    deleteButton.addEventListener('click', (e) => {
                        if (confirm('¿Estás seguro de que quieres eliminar este elemento? (Simulado)')) {
                            card.remove();
                            alert('Elemento eliminado simuladamente.');
                        }
                    });
                }
            });

            // 6. Funcionalidad de "Añadir Nuevo" (simulada)
            document.querySelectorAll('.btn-add-new').forEach(button => {
                button.addEventListener('click', (e) => {
                    const sectionType = e.target.dataset.sectionType;
                    const parentGrid = e.target.closest('.admin-card-grid');
                    let newCardHtml = '';
                    let newId = Date.now(); // ID único para el nuevo elemento

                    // Clonar una tarjeta existente para mantener la estructura
                    let templateCard;
                    if (sectionType === 'banner-slide') {
                        templateCard = document.querySelector('.admin-card[data-slide-index="0"]');
                        newCardHtml = templateCard.outerHTML; // Obtener HTML completo
                        newCardHtml = newCardHtml.replace(/data-slide-index="0"/g, `data-slide-index="${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="bannerTitle0"/g, `id="bannerTitle${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="bannerSubtitle0"/g, `id="bannerSubtitle${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="banner-upload-0"/g, `id="banner-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="banner-url-0"/g, `id="banner-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="DESCUBRE LA POTENCIA EN CADA PISADA"/g, 'value="Nuevo Título"');
                        newCardHtml = newCardHtml.replace(/Donde la ingeniería y el diseño se fusionan para desafiar tus límites./g, 'Nuevo Subtítulo');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato1.jpg"/g, 'value="https://placehold.co/600x400/cccccc/333333?text=Nueva+Imagen"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato1.jpg"/g, 'src="https://placehold.co/600x400/cccccc/333333?text=Nueva+Imagen"');
                        newCardHtml = newCardHtml.replace(/<h4>Slide 1<\/h4>/g, `<h4>Nuevo Slide ${newId}</h4>`);

                    } else if (sectionType === 'product') {
                        templateCard = document.querySelector('.admin-card[data-product-id="prod001"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-product-id="prod001"/g, `data-product-id="prod${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="productName001"/g, `id="productName${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="productDesc001"/g, `id="productDesc${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="productPrice001"/g, `id="productPrice${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="product-upload-001"/g, `id="product-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="product-url-001"/g, `id="product-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="Bota Táctica 'Apex'"/g, 'value="Nuevo Producto"');
                        newCardHtml = newCardHtml.replace(/Diseñadas para terrenos extremos, máxima tracción y resistencia a la abrasión./g, 'Descripción del nuevo producto.');
                        newCardHtml = newCardHtml.replace(/value="\$249.99"/g, 'value="$0.00"');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato7.jpg"/g, 'value="https://placehold.co/350x350/cccccc/333333?text=Nuevo+Producto"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato7.jpg"/g, 'src="https://placehold.co/350x350/cccccc/333333?text=Nuevo+Producto"');
                        newCardHtml = newCardHtml.replace(/<h4>Bota Táctica "Apex"<\/h4>/g, `<h4>Nuevo Producto ${newId}</h4>`);

                    } else if (sectionType === 'category') {
                        templateCard = document.querySelector('.admin-card[data-category-id="1"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-category-id="1"/g, `data-category-id="${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="categoryName1"/g, `id="categoryName${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="category-upload-1"/g, `id="category-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="category-url-1"/g, `id="category-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="FASHION"/g, 'value="Nueva Categoría"');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato13.jpg"/g, 'value="https://placehold.co/400x300/cccccc/333333?text=Nueva+Categoría"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato13.jpg"/g, 'src="https://placehold.co/400x300/cccccc/333333?text=Nueva+Categoría"');
                        newCardHtml = newCardHtml.replace(/<h4>FASHION<\/h4>/g, `<h4>Nueva Categoría ${newId}</h4>`);

                    } else if (sectionType === 'coming-soon') {
                        templateCard = document.querySelector('.admin-card[data-cs-original-index="0"]');
                        newCardHtml = templateCard.outerHTML;
                        newCardHtml = newCardHtml.replace(/data-cs-original-index="0"/g, `data-cs-original-index="${newId}"`);
                        newCardHtml = newCardHtml.replace(/data-cs-hover-index="1"/g, `data-cs-hover-index="${newId + 1}"`); // Asignar un índice de hover consecutivo
                        newCardHtml = newCardHtml.replace(/id="csName0"/g, `id="csName${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="cs-upload-0"/g, `id="cs-upload-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="cs-url-0"/g, `id="cs-url-${newId}"`);
                        newCardHtml = newCardHtml.replace(/id="csColor0"/g, `id="csColor${newId}"`);
                        newCardHtml = newCardHtml.replace(/value="Modelo Elegancia Clásica"/g, 'value="Nuevo Diseño"');
                        newCardHtml = newCardHtml.replace(/value="img\/jpg\/zapato16.jpg"/g, 'value="https://placehold.co/600x450/cccccc/333333?text=Nuevo+Diseño"');
                        newCardHtml = newCardHtml.replace(/src="img\/jpg\/zapato16.jpg"/g, 'src="https://placehold.co/600x450/cccccc/333333?text=Nuevo+Diseño"');
                        newCardHtml = newCardHtml.replace(/value="#2b5a74"/g, 'value="#000000"'); // Color por defecto
                        newCardHtml = newCardHtml.replace(/<h4>Modelo Elegancia Clásica<\/h4>/g, `<h4>Nuevo Diseño ${newId}</h4>`);
                        newCardHtml = newCardHtml.replace(/<p class="coming-soon-product-name">Modelo Elegancia Clásica<\/p>/g, `<p class="coming-soon-product-name">Nuevo Diseño</p>`);
                    }
                    
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newCardHtml;
                    const newCard = tempDiv.firstElementChild;

                    parentGrid.insertBefore(newCard, button.closest('.add-new-card')); // Insertar antes del botón "Añadir Nuevo"

                    // Re-inicializar listeners para los nuevos elementos
                    initializeCardListeners(newCard);

                    alert(`¡Nuevo ${sectionType} añadido simuladamente!`);
                });
            });

            // Función para inicializar listeners para una tarjeta (útil para nuevas tarjetas añadidas)
            function initializeCardListeners(card) {
                // Editable fields
                card.querySelectorAll('.editable-field').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const selector = input.dataset.targetSelector;
                        const property = input.dataset.property;
                        updatePreview(selector, property, e.target.value);
                    });
                });

                // Image URL inputs
                card.querySelectorAll('.image-url-input').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const previewImage = card.querySelector(input.dataset.previewTarget);
                        const selector = input.dataset.targetSelector;
                        const property = input.dataset.property;
                        const value = e.target.value;

                        if (previewImage) {
                            previewImage.src = value;
                        }
                        updatePreview(selector, property, value);
                    });
                });

                // Image upload inputs (for local preview only)
                card.querySelectorAll('.image-upload-input').forEach(input => {
                    input.addEventListener('change', (e) => {
                        const previewImage = card.querySelector(input.dataset.previewTarget);
                        if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader();
                            reader.onload = (readerEvent) => {
                                if (previewImage) {
                                    previewImage.src = readerEvent.target.result;
                                }
                            };
                            reader.readAsDataURL(e.target.files[0]);
                        }
                    });
                });

                // Toggle buttons for image upload/url
                card.querySelectorAll('.image-upload-options').forEach(optionsContainer => {
                    const toggleUploadBtn = optionsContainer.querySelector('.btn-toggle-upload');
                    const toggleUrlBtn = optionsContainer.querySelector('.btn-toggle-url');
                    
                    if (toggleUploadBtn && toggleUrlBtn) { // Asegurarse de que los botones existen
                        const uploadArea = document.getElementById(toggleUploadBtn.dataset.toggleTarget);
                        const urlArea = document.getElementById(toggleUrlBtn.dataset.toggleTarget);

                        toggleUploadBtn.addEventListener('click', () => {
                            uploadArea.classList.remove('hidden');
                            urlArea.classList.add('hidden');
                            toggleUploadBtn.classList.add('active');
                            toggleUrlBtn.classList.remove('active');
                        });

                        toggleUrlBtn.addEventListener('click', () => {
                            urlArea.classList.remove('hidden');
                            uploadArea.classList.add('hidden');
                            toggleUrlBtn.classList.add('active');
                            toggleUploadBtn.classList.remove('active');
                        });
                    }
                });

                // Delete button
                const deleteButton = card.querySelector('.btn-delete');
                if (deleteButton) { // Asegurarse de que el botón de eliminar existe
                    deleteButton.addEventListener('click', (e) => {
                        if (confirm('¿Estás seguro de que quieres eliminar este elemento? (Simulado)')) {
                            card.remove();
                            alert('Elemento eliminado simuladamente.');
                        }
                    });
                }

                // Save button
                card.querySelector('.btn-save').addEventListener('click', () => {
                    alert('¡Cambios guardados simuladamente!');
                });
            }

            // Inicializar listeners para todas las tarjetas existentes al cargar
            document.querySelectorAll('.editable-card').forEach(card => {
                initializeCardListeners(card);
            });
        });
