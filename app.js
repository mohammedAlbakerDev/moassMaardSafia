const products = [
    { id: "1", name: "عكس فلات", image: "url_to_image_1.jpg" },
    { id: "2", name: "Product 2", image: "url_to_image_2.jpg" },
    // Add more products as needed
];

function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
        `;
        productList.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker registered', reg))
            .catch(err => console.log('Service Worker registration failed', err));
    });
}
