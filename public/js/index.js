
console.log("Hello from Script!")

const navBtn = document.getElementById("responsive-toggle-btn");

navBtn.addEventListener("click", () => {
  navBtn.classList.toggle("active");
})
