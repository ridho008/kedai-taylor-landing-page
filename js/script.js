const navbarNav = document.querySelector(".navbar-nav");
const hamburgerMenu = document.querySelector("#hamburger-menu");
hamburgerMenu.addEventListener("click", function () {
  navbarNav.classList.toggle("active");
});

// klik diluar sidebar untuk menghilangkan navbar
document.addEventListener("click", function (e) {
  // jika tidak mengeklik hamburger menu dan tidak mengeklik list menu
  if (!hamburgerMenu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
