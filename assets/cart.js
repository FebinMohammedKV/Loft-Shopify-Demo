document.addEventListener('DOMContentLoaded', function() {
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    
    decreaseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const key = this.getAttribute('data-key');
        const quantitySpan = document.getElementById(`Quantity_${key}`);
        let quantity = parseInt(quantitySpan.getAttribute('data-value'), 10);
        if (quantity > 1) {
          quantity--;
          quantitySpan.setAttribute('data-value', quantity);
          quantitySpan.textContent = quantity;
          document.getElementById(`updates_${key}`).value = quantity;
        }
      });
    });

    increaseButtons.forEach(button => {
      button.addEventListener('click', function() {
        const key = this.getAttribute('data-key');
        const quantitySpan = document.getElementById(`Quantity_${key}`);
        let quantity = parseInt(quantitySpan.getAttribute('data-value'), 10);
        quantity++;
        quantitySpan.setAttribute('data-value', quantity);
        quantitySpan.textContent = quantity;
        document.getElementById(`updates_${key}`).value = quantity;
      });
    });
});

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
