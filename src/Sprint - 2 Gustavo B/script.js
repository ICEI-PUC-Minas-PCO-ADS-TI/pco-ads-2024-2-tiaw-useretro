
   
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
    function loadUserReviews() {
        const reviewContainer = document.querySelector(".user-reviews");
        userReviews.forEach(({ name, review, rating }) => {
            const reviewDiv = document.createElement("div");
            reviewDiv.classList.add("review");
            reviewDiv.innerHTML = `
                <h3>${name}</h3>
                <p>${review}</p>
                <div class="stars">${"⭐".repeat(rating)}</div>
            `;
            reviewContainer.appendChild(reviewDiv);
        });
    }


    document.addEventListener("DOMContentLoaded", loadUserReviews);

    const cartButtons = document.querySelectorAll(".btn-dark, .btn-primary");
    cartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const action = event.target.textContent.trim();
            alert(`${action} !`);
        });
    });

   
    window.addEventListener("resize", () => {
        const slides = document.querySelector(".carousel-slide");
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    let currentIndex = 0;

        function moveSlide(direction) {
            const slides = document.querySelector(".carousel-slide");
            const totalSlides = slides.children.length;

            currentIndex += direction;

            if (currentIndex < 0) {
                currentIndex = totalSlides - 1;
            } else if (currentIndex >= totalSlides) {
                currentIndex = 0;
            }

            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function toggleMenu() {
            const navMenu = document.getElementById("nav-menu");
            navMenu.classList.toggle("active");
        }
        
        