// Lógica específica para la página de hombres

document.addEventListener('DOMContentLoaded', function() {
    // 1. Lista de imágenes disponibles (agrega aquí los nombres reales de tus imágenes)
    const jpegImages = [
        'img/jpeg/zapato1.jpeg', 'img/jpeg/zapato2.jpeg'
    ];
    const jpgImages = [
        'img/jpg/zapato1.jpg', 'img/jpg/zapato2.jpg', 'img/jpg/zapato3.jpg',
        'img/jpg/zapato4.jpg', 'img/jpg/zapato5.jpg', 'img/jpg/zapato6.jpg',
        'img/jpg/zapato7.jpg', 'img/jpg/zapato8.jpg', 'img/jpg/zapato9.jpg',
        'img/jpg/zapato10.jpg'
    ];
    const allImages = [...jpegImages, ...jpgImages];

    // 2. Productos de ejemplo (puedes ampliar o modificar)
    const products = [
        {
            name: "Zapatilla Urbana",
            color: "black",
            type: "zapatillas",
            size: ["39", "40", "41"],
            price: 129.99,
            occasion: "casual",
            upper: "cuero",
            sole: "goma"
        },
        {
            name: "Bota Trekking",
            color: "brown",
            type: "botas",
            size: ["40", "41"],
            price: 189.99,
            occasion: "aventura",
            upper: "sintético",
            sole: "goma"
        },
        {
            name: "Zapato Formal",
            color: "gray",
            type: "formal",
            size: ["39", "41"],
            price: 159.99,
            occasion: "formal",
            upper: "cuero",
            sole: "cuero"
        },
        {
            name: "Zapatilla Deportiva",
            color: "blue",
            type: "zapatillas",
            size: ["39", "40"],
            price: 119.99,
            occasion: "deporte",
            upper: "malla",
            sole: "eva"
        },
        {
            name: "Zapato Casual Verde",
            color: "green",
            type: "casual",
            size: ["40", "41"],
            price: 99.99,
            occasion: "casual",
            upper: "lona",
            sole: "goma"
        },
        {
            name: "Bota Elegante",
            color: "black",
            type: "botas",
            size: ["39", "40"],
            price: 179.99,
            occasion: "formal",
            upper: "cuero",
            sole: "goma"
        },
        {
            name: "Zapato Blanco",
            color: "white",
            type: "casual",
            size: ["39", "40", "41"],
            price: 109.99,
            occasion: "casual",
            upper: "cuero",
            sole: "eva"
        }
    ];

    // Asigna imágenes aleatorias a los productos
    products.forEach(p => {
        p.img = allImages[Math.floor(Math.random() * allImages.length)];
    });

    // 3. Renderizado de productos
    const grid = document.getElementById('menProductsGrid');
    function renderProducts(list) {
        grid.innerHTML = '';
        if (list.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No se encontraron productos.</p>';
            return;
        }
        list.forEach(prod => {
            grid.innerHTML += `
                <div class="product-card">
                    <div class="product-card-img-container">
                        <img src="${prod.img}" alt="${prod.name}">
                    </div>
                    <div class="product-card-info">
                        <h4>${prod.name}</h4>
                        <span class="price">$${prod.price.toFixed(2)}</span>
                        <button class="btn btn-primary">Ver Detalles</button>
                    </div>
                </div>
            `;
        });
    }
    renderProducts(products);

    // 4. Filtros
    let activeFilters = {
        color: null,
        type: null,
        size: null
    };

    // Color
    document.querySelectorAll('.color-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            activeFilters.color = this.dataset.value;
        });
    });

    // Tipo
    document.querySelectorAll('.filter-option-btn[data-filter="type"]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-option-btn[data-filter="type"]').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            activeFilters.type = this.dataset.value;
        });
    });

    // Talla
    document.querySelectorAll('.filter-option-btn[data-filter="size"]').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-option-btn[data-filter="size"]').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            activeFilters.size = this.dataset.value;
        });
    });

    // Botón aplicar filtros
    document.getElementById('applyFiltersBtn').addEventListener('click', function() {
        let filtered = products.filter(p => {
            let ok = true;
            if (activeFilters.color) ok = ok && p.color === activeFilters.color;
            if (activeFilters.type) ok = ok && p.type === activeFilters.type;
            if (activeFilters.size) ok = ok && p.size.includes(activeFilters.size);
            return ok;
        });
        renderProducts(filtered);
    });

    // Botón limpiar filtros
    document.getElementById('clearFiltersBtn').addEventListener('click', function() {
        activeFilters = { color: null, type: null, size: null };
        document.querySelectorAll('.color-option, .filter-option-btn').forEach(e => e.classList.remove('selected'));
        renderProducts(products);
    });
});
