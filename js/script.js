const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");
hamburgerMenu.addEventListener("click", function () {
  navbarNav.classList.toggle("active");
});

const shoppingCartButton = document.getElementById("shopping-cart-button");
const shoppingCart = document.querySelector(".shopping-cart");
shoppingCartButton.addEventListener("click", function (e) {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
});

const searchButton = document.querySelector("#search");
const searchForm = document.querySelector(".search-form");
const searchBox = document.getElementById("search-box");
searchButton.addEventListener("click", function (e) {
  searchForm.classList.toggle("active");
  searchBox.focus();
  e.preventDefault();
});

// klik diluar sidebar untuk menghilangkan navbar
document.addEventListener("click", function (e) {
  // jika tidak mengeklik hamburger menu dan tidak mengeklik list menu
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }

  if (!searchButton.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove("active");
  }

  if (
    !shoppingCartButton.contains(e.target) &&
    !shoppingCart.contains(e.target)
  ) {
    shoppingCart.classList.remove("active");
  }
});

// Modal Box
const itemDetailModal = document.getElementById("item-detail-modal");
const itemDetailButtons = document.querySelectorAll(".item-detail-button");

itemDetailButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    itemDetailModal.style.display = "flex";
    e.preventDefault();
  });
});

// click button close modal
document.querySelector(".modal .close-icon").onclick = (e) => {
  itemDetailModal.style.display = "none";
  e.preventDefault();
};

window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = "none";
  }
};
