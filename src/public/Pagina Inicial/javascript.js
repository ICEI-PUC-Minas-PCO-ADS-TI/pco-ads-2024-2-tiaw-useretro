// Gerenciamento de slides
let indiceSlide = 0;
const slides = document.querySelectorAll('.slider .slide');
const totalSlides = slides.length;

// Muda para o próximo ou anterior slide
function mudarSlide(direcao) {
    indiceSlide = (indiceSlide + direcao + totalSlides) % totalSlides;
    atualizarSlide();
}

// Atualiza a posição do slide no carrossel
function atualizarSlide() {
    const offset = -indiceSlide * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

// Carrossel automático
setInterval(() => mudarSlide(1), 5000);

// Funções para produtos
// Atualiza o tamanho selecionado
function updateSelectedSize(size) {
    const sizeSpan = document.querySelector('.size-info .size');
    const sizeBoxes = document.querySelectorAll('.size-options .size-box');

    sizeSpan.textContent = size;
    sizeBoxes.forEach(box => box.classList.remove('selected'));

    const selectedBox = Array.from(sizeBoxes).find(box => box.textContent === size);
    if (selectedBox) selectedBox.classList.add('selected');
}

// Inicializa os controles de quantidade
function initializeQuantityControls() {
    const quantitySpan = document.querySelector('.quantity span');
    const increaseButton = document.querySelector('.quantity .increase');
    const decreaseButton = document.querySelector('.quantity .decrease');

    increaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantitySpan.textContent, 10);
        quantitySpan.textContent = currentQuantity + 1;
    });

    decreaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantitySpan.textContent, 10);
        if (currentQuantity > 1) quantitySpan.textContent = currentQuantity - 1;
    });
}

// Inicializa a rolagem vertical
function initializeVerticalScroll() {
    const scrollContainer = document.querySelector('.content-scroll-vertical');
    const [scrollUpButton, scrollDownButton] = document.querySelectorAll('.button-action-scroll');
    const scrollStep = 150;

    scrollUpButton.addEventListener('click', () => scrollContainer.scrollTop -= scrollStep);
    scrollDownButton.addEventListener('click', () => scrollContainer.scrollTop += scrollStep);
}

// Inicializa a seleção de tamanho
function initializeSizeSelection() {
    const sizeBoxes = document.querySelectorAll('.size-options .size-box');
    
    sizeBoxes.forEach(box => box.addEventListener('click', () => updateSelectedSize(box.textContent)));

    const initialSize = document.querySelector('.size-box.selected')?.textContent || sizeBoxes[0]?.textContent;
    if (initialSize) updateSelectedSize(initialSize);
}

// Atualiza a imagem principal com base na miniatura clicada
function atualizarImagemGrande() {
    const thumbnails = document.querySelectorAll('.content-scroll-vertical img');
    const largeImage = document.querySelector('.image.large');

    thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', () => {
        largeImage.src = thumbnail.src;
    }));
}

// Exibe os detalhes de um produto selecionado
function clicarNoProduto(camisa) {
    const carrossel = document.querySelector(".carrossel");
    const containerPrincipal = document.querySelector(".container");
    const desktop = document.querySelector(".desktop");
    const sizeOptions = desktop.querySelector(".size-options");
    const imageContainer = document.querySelector('.content-scroll-vertical');

    carrossel.style.display = "none";
    containerPrincipal.style.display = "none";
    desktop.style.display = "flex";

    desktop.querySelector(".title").textContent = camisa.nome;
    desktop.querySelector(".current-price").textContent = `R$${camisa.preco.toFixed(2).replace(".", ",")}`;
    desktop.querySelector(".large").src = camisa.imagens[0];
    desktop.querySelector(".large").alt = camisa.nome;

    sizeOptions.innerHTML = camisa.tamanhos.map((tamanho, index) =>
        `<div class="size-box ${index === 0 ? "selected" : ""}">${tamanho}</div>`
    ).join("");

    if (imageContainer) {
        imageContainer.innerHTML = '';
        camisa.imagens.forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.className = "image";
            imgElement.src = imageUrl;
            imgElement.alt = `Imagem de ${camisa.nome}`;
            imageContainer.appendChild(imgElement);
        });
    }

    initializeSizeSelection();
    atualizarImagemGrande();

    document.querySelector(".button-back").addEventListener("click", () => {
        document.querySelector('.quantity span').textContent = "1";
        desktop.style.display = "none";
        carrossel.style.display = "block";
        containerPrincipal.style.display = "flex";
    });
}

// Busca as camisas no servidor
async function buscarCamisas() {
    try {
        const resposta = await fetch("http://localhost:3000/camisas");
        if (!resposta.ok) throw new Error('Erro ao buscar as camisas');
        return await resposta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Renderiza o catálogo de produtos
async function renderizarCatalogo() {
    const catalogoContainer = document.getElementById("catalogo");
    const slides = document.querySelectorAll(".slide");
    const camisas = await buscarCamisas();
    const camisasExibidas = camisas.slice(0, 5);

    catalogoContainer.innerHTML = "";

    if (camisasExibidas.length === 0) {
        catalogoContainer.innerHTML = "<p class='mensagem-indisponivel'>Produto indisponível</p>";
    } else {
        camisasExibidas.forEach(camisa => {
            const camisaCard = document.createElement("div");
            camisaCard.classList.add("card");
            camisaCard.innerHTML = `
                <img src="${camisa.imagens[0]}" alt="${camisa.nome}">
                <h3>${camisa.nome}</h3>
                <p class="preco">Preço: R$ ${camisa.preco.toFixed(2).replace('.', ',')}</p>
                <div class="tamanhos-disponiveis">
                    ${camisa.tamanhos.map(tamanho => `<div class="tamanho">${tamanho}</div>`).join("")}
                </div>
            `;

            // Adiciona o evento de clique para cada slide
            slides.forEach(slide => {
                slide.addEventListener("click", () => clicarNoProduto(camisa));
            });

            // Adiciona o evento de clique ao card
            camisaCard.addEventListener("click", () => clicarNoProduto(camisa));
            catalogoContainer.appendChild(camisaCard);
        });
    }

    const camisasSlide = camisas.slice(0, 3);
    camisasSlide.forEach((camisa, index) => {
        // Adiciona o evento de clique para cada slide
        slides[index].addEventListener("click", () => clicarNoProduto(camisa));
    });
}

// Inicialização após o DOM estar carregado
document.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogo();
    initializeQuantityControls();
    initializeVerticalScroll();
    atualizarImagemGrande();
});