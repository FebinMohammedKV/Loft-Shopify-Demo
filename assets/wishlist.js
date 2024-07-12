document.addEventListener('DOMContentLoaded', function() {
    const wishlistItems = document.querySelectorAll('.wishlist-item, .wishlist-icon');
  
    wishlistItems.forEach(item => {
      item.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        addToWishlist(productId);
      });
    });
  
    function addToWishlist(productId) {
      fetch('/wishlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ id: productId })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showPopupMessage('1 product added to wishlist');
          updateWishlistCount(data.wishlist_count);
        }
      });
    }
  
    function showPopupMessage(message) {
      const popup = document.createElement('div');
      popup.className = 'popup-message';
      popup.innerText = message;
      document.body.appendChild(popup);
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 3000);
    }
  
    function updateWishlistCount(count) {
      const wishlistCount = document.querySelector('.wishlist .item-count');
      if (wishlistCount) {
        wishlistCount.innerText = count;
      }
    }
  });
  