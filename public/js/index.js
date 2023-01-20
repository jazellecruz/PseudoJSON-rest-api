
const navBtn = document.getElementById("responsive-toggle-btn");
const navLinks= document.getElementsByClassName("navlinks-container")[0]
const copyright = document.getElementById('copyright');

const currentYear = new Date().getFullYear();

copyright.textContent +=  `${currentYear} PseudoJSON`;

navBtn.addEventListener("click", () => {
    navBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
  }
)
