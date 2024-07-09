document.addEventListener('DOMContentLoaded', function() {
    function updateCartSlider() {
        fetch('/cart.js')
            .then(response => response.json())
            .then(data => {
                const ajaxCartBody = document.querySelector('.ajaxcart-body');
                const ajaxCartProductCount = document.querySelector('.ajaxcart-product-count span');
                const cartTotal = document.getElementById('cart-total');
                ajaxCartBody.innerHTML = '';

                data.items.forEach(item => {
                    const productRow = document.createElement('div');
                    productRow.classList.add('ajaxcart-product-details');
                    productRow.id = `cart-product-${item.key}`;
                    productRow.innerHTML = `
                        <div class="ajaxcart-pimage">
                            <a href="${item.url}">
                                <img src="${item.image}" alt="${item.title}">
                            </a>
                        </div>
                        <div class="ajaxcart-productinfo">
                            <div class="ajax-product-info">
                                <a href="${item.url}" class="ajaxproduct-title">${item.title}</a>
                                <div class="remove">
                                    <a href="#" class="delete" data-key="${item.key}">Remove</a>
                                </div>
                            </div>
                            <div class="ajaxprice-qty">
                                <div class="ajax-quantity-content">
                                    <button type="button" class="ajax-quantity-btn ajax-decrease" data-key="${item.key}">-</button>
                                    <span id="Quantity_${item.key}" data-value="${item.quantity}">${item.quantity}</span>
                                    <button type="button" class="ajax-quantity-btn ajax-increase" data-key="${item.key}">+</button>
                                    <input type="hidden" name="updates[]" id="updates_${item.key}" value="${item.quantity}">
                                </div>
                                <div class="ajaxproduct-price" data-price="${item.price}">Rs ${(item.price / 100).toFixed(2)}</div>
                            </div>
                        </div>
                    `;
                    ajaxCartBody.appendChild(productRow);
                });

                ajaxCartProductCount.textContent = `(${data.item_count})`;
                cartTotal.textContent = `Rs ${(data.total_price / 100).toFixed(2)}`;

                attachEventListeners();
            })
            .catch(error => console.error('Error:', error));
    }

    function attachEventListeners() {
        document.querySelectorAll('.ajax-quantity-btn.ajax-decrease').forEach(button => {
            button.addEventListener('click', function() {
                const key = this.getAttribute('data-key');
                const quantitySpan = document.getElementById(`Quantity_${key}`);
                let quantity = parseInt(quantitySpan.getAttribute('data-value'), 10);
                if (quantity > 1) {
                    quantity--;
                    quantitySpan.setAttribute('data-value', quantity);
                    quantitySpan.textContent = quantity;
                    document.getElementById(`updates_${key}`).value = quantity;
                    updateCartItem(key, quantity);
                }
            });
        });

        document.querySelectorAll('.ajax-quantity-btn.ajax-increase').forEach(button => {
            button.addEventListener('click', function() {
                const key = this.getAttribute('data-key');
                const quantitySpan = document.getElementById(`Quantity_${key}`);
                let quantity = parseInt(quantitySpan.getAttribute('data-value'), 10);
                quantity++;
                quantitySpan.setAttribute('data-value', quantity);
                quantitySpan.textContent = quantity;
                document.getElementById(`updates_${key}`).value = quantity;
                updateCartItem(key, quantity);
            });
        });

        document.querySelectorAll('.delete').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const key = this.getAttribute('data-key');
                const productRow = document.getElementById(`cart-product-${key}`);
                productRow.parentNode.removeChild(productRow);
                updateCartItem(key, 0);
            });
        });
    }

    function updateCartItem(key, quantity) {
        fetch('/cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: key,
                quantity: quantity
            })
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.ajaxcart-product-count span').textContent = `(${data.item_count})`;
            updateCartTotal();
            updateCartSlider();
        })
        .catch(error => console.error('Error:', error));
    }

    function updateCartTotal() {
        let total = 0;
        document.querySelectorAll('.ajaxcart-product-details').forEach(function(item) {
            const quantity = parseInt(item.querySelector('.ajax-quantity-content span').getAttribute('data-value'), 10);
            const price = parseFloat(item.querySelector('.ajaxproduct-price').getAttribute('data-price')) / 100;
            const linePrice = quantity * price;
            item.querySelector('.ajaxproduct-price').textContent = `Rs ${linePrice.toFixed(2)}`;
            total += linePrice;
        });
        document.getElementById('cart-total').textContent = `Rs ${total.toFixed(2)}`;
    }

    function handleAddToCart(event) {
        event.preventDefault();
        const form = event.target.closest('form');
        const formData = new FormData(form);
        const productId = formData.get('id');

        fetch('/cart/add.js', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            updateCartSlider();
            toggleCartSlide();
        })
        .catch(error => console.error('Error:', error));
    }

    function toggleCartSlide() {
        const ajaxCartSlide = document.querySelector('.ajaxcart-slide');
        const overlay = document.querySelector('.ajaxcart-overlay');
        document.body.classList.add('no-scroll');
        ajaxCartSlide.style.right = '0';
        overlay.style.display = 'block';
    }

    document.querySelectorAll('.add-to-cart-form').forEach(form => {
        form.addEventListener('submit', handleAddToCart);
    });

    const closeButton = document.querySelector('.ajaxclose-btn.cart');
    closeButton.addEventListener('click', function() {
        document.body.classList.remove('no-scroll');
        document.querySelector('.ajaxcart-slide').style.right = '-500px';
        document.querySelector('.ajaxcart-overlay').style.display = 'none';
    });
});
