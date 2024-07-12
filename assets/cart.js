document.addEventListener('DOMContentLoaded', function() {
  function recalculateTotals() {
      let total = 0;
      const items = document.querySelectorAll('.cart-product');
      items.forEach(item => {
          const quantity = parseInt(item.querySelector('.quantity-content span').textContent);
          const pricePerItem = parseFloat(item.querySelector('.item-total').dataset.price) / 100;
          const linePrice = quantity * pricePerItem;
          item.querySelector('.item-total').textContent = `Rs ${linePrice.toFixed(2)}`;
          total += linePrice;
      });
      document.querySelector('.subtotal-price').innerHTML = `Rs ${total.toFixed(2)} <span>(All prices are ex VAT)</span>`;
  }

  function updateCartItem(key, quantity) {
      return fetch('/cart/change.js', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: key,
              quantity: quantity
          })
      })
      .then(response => response.json());
  }

  document.querySelectorAll('.quantity-btn').forEach(function(button) {
      button.addEventListener('click', function() {
          const span = button.parentElement.querySelector('span');
          const oldValue = parseInt(span.textContent);
          const key = button.getAttribute('data-key');
          let newValue = oldValue;

          if (button.classList.contains('decrease')) {
              newValue = oldValue > 1 ? oldValue - 1 : 1;
          } else if (button.classList.contains('increase')) {
              newValue = oldValue + 1;
          }

          span.textContent = newValue;
          button.parentElement.querySelector('input[name="updates[]"]').value = newValue;

          // Update product price
          const pricePerItem = parseFloat(document.getElementById(`product-price-${key}`).dataset.price) / 100;
          const newPrice = pricePerItem * newValue;
          document.getElementById(`product-price-${key}`).textContent = `Rs ${newPrice.toFixed(2)}`;

          recalculateTotals();
      });
  });

  document.querySelector('.update-button').addEventListener('click', function(e) {
      e.preventDefault();

      const updatePromises = [];
      document.querySelectorAll('.cart-product').forEach(item => {
          const key = item.getAttribute('data-key');
          const quantity = parseInt(item.querySelector('.quantity-content span').textContent);
          updatePromises.push(updateCartItem(key, quantity));
      });

      Promise.all(updatePromises)
          .then(results => {
              const updatedCart = results[results.length - 1];
              recalculateTotals();
          })
          .catch(error => console.error('Error:', error));
  });

  recalculateTotals(); // Initial total calculation
});






// slider
$(document).ready(function(){
    $('.installation-removal-slider').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: $('.slick-prev'),
      nextArrow: $('.slick-next'),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 460,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
});