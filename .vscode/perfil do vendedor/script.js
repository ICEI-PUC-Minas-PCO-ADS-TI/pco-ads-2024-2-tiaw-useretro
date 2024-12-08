
const sellerData = {
    "sellerProfile": {
        "id": "seller001",
        "name": "Ana Retrô",
        "profilePicture": "ana-retro.jpg",
        "rating": {
            "average": 4.8,
            "totalReviews": 85
        },
        "products": [
            {
                "id": "product101",
                "name": "Camisa Botafogo Ano 1963",
                "price": 520.00,
                "image": "botafogo-63.jpg",
                "detailsLink": "#"
            }
        ]
    }
};

// Função para carregar os dados na página
function loadProfile() {
    document.getElementById("profile-picture").src = sellerData.sellerProfile.profilePicture;
    document.getElementById("seller-name").innerText = sellerData.sellerProfile.name;

    const ratingContainer = document.getElementById("rating");
    const ratingValue = document.createElement("span");
    ratingValue.classList.add("rating-value");
    ratingValue.innerText = sellerData.sellerProfile.rating.average;

    const starIcon = document.createElement("span");
    starIcon.classList.add("rating-star");
    starIcon.innerHTML = "&#9733;";

    const totalReviews = document.createElement("span");
    totalReviews.innerText = `(${sellerData.sellerProfile.rating.totalReviews} avaliações)`;

    ratingContainer.appendChild(starIcon);
    ratingContainer.appendChild(ratingValue);
    ratingContainer.appendChild(totalReviews);

    const productList = document.getElementById("product-list");
    sellerData.sellerProfile.products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        
        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;

        const productName = document.createElement("h4");
        productName.innerText = product.name;

        const productPrice = document.createElement("p");
        productPrice.innerText = `R$ ${product.price.toFixed(2)}`;

        const productLink = document.createElement("a");
        productLink.href = product.detailsLink;
        productLink.innerText = "Ver Detalhes";

        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(productLink);

        productList.appendChild(productCard);
    });
}
window.onload = loadProfile;
