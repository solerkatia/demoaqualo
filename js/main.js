document.addEventListener('DOMContentLoaded', () => {
    // 1. Validación del formulario de contacto (si existe en la página)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }

    // 2. Validación de Newsletter (si existe)
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por suscribirte al newsletter de AQUALO!');
            newsletterForm.reset();
        });
    }

    // 3. Sistema de Filtrado y Ordenamiento para el Catálogo
    const filterStock = document.getElementById('filter-stock');
    const sortProducts = document.getElementById('sort-products');
    
    if (filterStock && sortProducts) {
        filterStock.addEventListener('change', applyCatalogFilters);
        sortProducts.addEventListener('change', applyCatalogFilters);
    }
});

// Función global para filtrar y ordenar los productos del catálogo de forma segura
function applyCatalogFilters() {
    const filterStockSelect = document.getElementById('filter-stock');
    const sortProductsSelect = document.getElementById('sort-products');
    const grid = document.getElementById('product-grid');

    if (!filterStockSelect || !sortProductsSelect || !grid) return;

    const filterStock = filterStockSelect.value;
    const sortProducts = sortProductsSelect.value;
    let items = Array.from(grid.getElementsByClassName('product-item'));

    // Filtrado seguro basado en el atributo data-stock o visibilidad general
    items.forEach(item => {
        const stock = item.getAttribute('data-stock') || 'in';
        if (filterStock === 'all' || (filterStock === 'in-stock' && stock === 'in') || (filterStock === 'out-of-stock' && stock === 'out')) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    // Ordenamiento Alfabético A-Z / Z-A basado en el atributo data-name
    items.sort((a, b) => {
        const nameA = (a.getAttribute('data-name') || '').toLowerCase();
        const nameB = (b.getAttribute('data-name') || '').toLowerCase();
        if (sortProducts === 'az') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    // Reordenar los elementos en el DOM sin alterar los componentes de Shopify
    items.forEach(item => grid.appendChild(item));
}