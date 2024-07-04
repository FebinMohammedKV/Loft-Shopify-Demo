document.addEventListener('DOMContentLoaded', function () {
    // Shipping link handler
    document.querySelector('.price-info p a').addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = '/pages/shipping';
    });
    // Show more/less functionality for product description
    const showMoreLink = document.querySelector(".product-description .show-more");
    showMoreLink.addEventListener("click", function () {
      const description = document.getElementById("product-description");
      description.classList.toggle("closed");
      showMoreLink.textContent = description.classList.contains("closed") ? "...show more" : " show less";
    });
});

// additional details
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('.product-additional-details .heading');
    const contents = document.querySelectorAll('.product-additional-details .info');
    // Default to show the first detail
    contents[0].classList.add('active');
    headings.forEach(heading => {
      heading.addEventListener('click', function() {
        // Remove active class from all headings
        headings.forEach(h => h.classList.remove('active'));
        // Hide all content sections
        contents.forEach(c => c.classList.remove('active'));
        // Add active class to the clicked heading
        this.classList.add('active');
        // Show the corresponding content section
        const blockId = this.getAttribute('data-block-id');
        document.querySelector(`.info[data-block-id="${blockId}"]`).classList.add('active');
      });
    });

    // similar products
    $(document).ready(function(){
      $('.similar-products-slider').slick({
        infinite: true,
        slidesToShow: 5,
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
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });

    // similar heading
    document.addEventListener('DOMContentLoaded', function() {
      function toCamelCase(str) {
        return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
      var productTitleElement = document.getElementById('product-title');
      if (productTitleElement) {
        productTitleElement.textContent = toCamelCase(productTitleElement.textContent);
      }
    });
});
