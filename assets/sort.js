// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }
  
//   // Close the dropdown if the user clicks outside of it
//   window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   }


// variant js
document.addEventListener('DOMContentLoaded', function() {
    var products = document.querySelectorAll('.grid-container');

    products.forEach(function(product) {
        var productId = product.id.split('-')[1];
        var variantRadios = product.querySelectorAll('.variant-radio-' + productId);
        var mainImage = product.querySelector('.main-image-' + productId);
        var secondaryImage = product.querySelector('.secondary-image-' + productId);
        var thumbnails = product.querySelectorAll('.product-thumbnails .thumbnail');

        variantRadios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                var selectedImage = this.getAttribute('data-image');
                var selectedAlt = this.getAttribute('data-alt');

                // Update the main and secondary images
                if (mainImage) {
                    mainImage.src = selectedImage;
                    mainImage.alt = selectedAlt;
                }
                if (secondaryImage) {
                    secondaryImage.src = selectedImage;
                    secondaryImage.alt = selectedAlt;
                }

                // Update thumbnails to reflect the variant's images
                thumbnails.forEach(function(thumbnail) {
                    var thumbnailImage = thumbnail.getAttribute('data-image');
                    if (thumbnailImage === selectedImage) {
                        thumbnail.classList.add('active');
                    } else {
                        thumbnail.classList.remove('active');
                    }
                });
            });
        });

        // Handle thumbnail click
        thumbnails.forEach(function(thumbnail) {
            thumbnail.addEventListener('click', function(event) {
                event.preventDefault();
                var thumbnailImage = this.getAttribute('data-image');
                if (mainImage) {
                    mainImage.src = thumbnailImage;
                    mainImage.alt = this.querySelector('img').getAttribute('alt');
                }
                if (secondaryImage) {
                    secondaryImage.src = thumbnailImage;
                    secondaryImage.alt = this.querySelector('img').getAttribute('alt');
                }
                thumbnails.forEach(function(thumb) {
                    thumb.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    });
});
