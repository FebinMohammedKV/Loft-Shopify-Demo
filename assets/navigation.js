function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("openbtn").style.display = "none";
  document.getElementById("closebtn").style.display = "block";
  document.body.classList.add('no-scroll'); // Disable background scrolling
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementById("openbtn").style.display = "block";
  document.getElementById("closebtn").style.display = "none";
  document.body.classList.remove('no-scroll'); // Enable background scrolling
}

document.addEventListener('DOMContentLoaded', function() {
  // Event listener for plus icons
  document.querySelectorAll('.plus-dropdown').forEach(function(plus) {
      plus.addEventListener('click', function() {
          const submenu = this.closest('li').querySelector('.submenu');
          const minusIcon = this.nextElementSibling;
          submenu.style.display = 'block';
          this.style.display = 'none';
          minusIcon.style.display = 'block';
          document.body.classList.add('no-scroll'); // Disable background scrolling when submenu is opened
      });
  });

  // Event listener for minus icons
  document.querySelectorAll('.minus-dropdown').forEach(function(minus) {
      minus.addEventListener('click', function() {
          const submenu = this.closest('li').querySelector('.submenu');
          const plusIcon = this.previousElementSibling;
          submenu.style.display = 'none';
          this.style.display = 'none';
          plusIcon.style.display = 'block';
          document.body.classList.remove('no-scroll'); // Enable background scrolling when submenu is closed
      });
  });
});

// bottom nav
document.addEventListener('DOMContentLoaded', function () {
  const accountIcon = document.querySelector('.account-icon');
  const searchIcon = document.querySelector('.bi-search');
  const accountDropdown = document.querySelector('.account .sub');
  const searchDropdown = document.querySelector('.Search');

  accountIcon.addEventListener('click', function () {
    if (accountDropdown.classList.contains('active')) {
      accountDropdown.classList.remove('active');
    } else {
      accountDropdown.classList.add('active');
      searchDropdown.classList.remove('active');
    }
  });

  searchIcon.parentNode.addEventListener('click', function () {
    if (searchDropdown.classList.contains('active')) {
      searchDropdown.classList.remove('active');
    } else {
      searchDropdown.classList.add('active');
      accountDropdown.classList.remove('active');
    }
  });
});
