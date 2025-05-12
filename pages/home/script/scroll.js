window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");

  console.log("scrollY:", window.scrollY); // debug value

  if (window.scrollY > 0) {
    console.log("Start");
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
