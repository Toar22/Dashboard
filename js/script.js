document.addEventListener('DOMContentLoaded', () => {
    const previewElement = document.querySelector('.dashboard-preview-container');

    // Scroll animation for dashboard preview
    window.addEventListener('scroll', () => {
        const rect = previewElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            previewElement.classList.add('scrolled');
        }
    });

    console.log('Dashboard preview section loaded.');
});

document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript fungerer!");

    // Velg alle knappene og legg til en klikkhendelse
    const buttons = document.querySelectorAll('.cta-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Knapp klikket!");
            alert("Du la til en komponent i kurven!");
        });
    });
});












document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const cartSummary = document.getElementById('cart-summary');
    const orderDetailsTextarea = document.getElementById('order-details');

    // Oppdater handlekurven
    function updateCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="text-gray-600 text-center">Handlekurven er tom.</p>`;
            cartSummary.classList.add('hidden');
            orderDetailsTextarea.value = "";
        } else {
            let totalSum = 0;
            cartItemsContainer.innerHTML = cart.map((item, index) => {
                totalSum += item.price;
                return `
                    <li>
                        <div class="flex items-center">
                            <img src="${item.image}" alt="${item.name}" />
                            <span class="ml-4 font-medium text-gray-700">${item.name}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">${item.price.toLocaleString('no-NO')} NOK</span>
                            <button class="ml-4 text-red-500 hover:text-red-700" onclick="removeItem(${index})">Fjern</button>
                        </div>
                    </li>
                `;
            }).join('');
            cartTotalContainer.innerText = `${totalSum.toLocaleString('no-NO')} NOK`;
            cartSummary.classList.remove('hidden');

            // Oppdater bestillingsdetaljer i skjemaet
            orderDetailsTextarea.value = cart.map(item => `${item.name}: ${item.price.toLocaleString('no-NO')} NOK`).join('\n');
            orderDetailsTextarea.value += `\n\nTotal: ${totalSum.toLocaleString('no-NO')} NOK`;
        }
    }

    // Legg til klikkhendelse for knappene
    const buttons = document.querySelectorAll('.cta-btn');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemName = button.parentElement.querySelector('h3').innerText;
            const itemPriceText = button.parentElement.querySelector('.font-bold').innerText;
            const itemPrice = parseInt(itemPriceText.replace(/[^0-9]/g, ''));
            const itemImage = button.parentElement.querySelector('img').src;

            cart.push({ name: itemName, price: itemPrice, image: itemImage });
            updateCart(); // Oppdater handlekurven
        });
    });

    // Fjern et element fra handlekurven
    window.removeItem = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    updateCart(); // Oppdater handlekurven ved start
});
