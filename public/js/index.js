
console.log("Hello from Script!")

const navBtn = document.getElementById("responsive-toggle-btn");
const navLinks= document.getElementsByClassName("navlinks-container")[0]

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("active");
  navLinks.classList.toggle("active");
}
)