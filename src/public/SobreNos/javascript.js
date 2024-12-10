document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".menu-horizontal a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });
});
