// Função para atualizar o tamanho selecionado
function updateSelectedSize(size) {
    // Atualiza o texto do span com o tamanho selecionado
    const sizeSpan = document.querySelector('.size-info .size');
    sizeSpan.textContent = size;

    // Remove a classe 'selected' de todas as caixas de tamanho
    const sizeBoxes = document.querySelectorAll('.size-options .size-box');
    sizeBoxes.forEach(box => box.classList.remove('selected'));

    // Adiciona a classe 'selected' à caixa de tamanho clicada
    const selectedBox = Array.from(sizeBoxes).find(box => box.textContent === size);
    if (selectedBox) {
        selectedBox.classList.add('selected');
    }
}

// Função para inicializar os controles de quantidade
function initializeQuantityControls() {
    const quantitySpan = document.querySelector('.quantity span');
    const increaseButton = document.querySelector('.quantity .increase');
    const decreaseButton = document.querySelector('.quantity .decrease');

    // Evento para aumentar a quantidade
    increaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantitySpan.textContent, 10);
        quantitySpan.textContent = currentQuantity + 1;
    });

    // Evento para diminuir a quantidade
    decreaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantitySpan.textContent, 10);
        if (currentQuantity > 1) {
            quantitySpan.textContent = currentQuantity - 1;
        }
    });
}

// Função para inicializar o controle de rolagem vertical
function initializeVerticalScroll() {
    const scrollContainer = document.querySelector('.content-scroll-vertical');
    const scrollUpButton = document.querySelectorAll('.button-action-scroll')[0]; // Primeiro botão (para cima)
    const scrollDownButton = document.querySelectorAll('.button-action-scroll')[1]; // Segundo botão (para baixo)

    // Definir a quantidade de pixels a serem deslocados por clique
    const scrollStep = 150;

    // Adiciona evento ao botão de subir
    scrollUpButton.addEventListener('click', () => {
        scrollContainer.scrollTop -= scrollStep; // Subtrai do scroll atual
    });

    // Adiciona evento ao botão de descer
    scrollDownButton.addEventListener('click', () => {
        scrollContainer.scrollTop += scrollStep; // Soma ao scroll atual
    });
}

// Função para inicializar a seleção de tamanho
function initializeSizeSelection() {
    const sizeBoxes = document.querySelectorAll('.size-options .size-box');

    // Adiciona evento de clique a cada caixa de tamanho
    sizeBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const size = box.textContent; // Obtém o tamanho da caixa clicada
            updateSelectedSize(size); // Atualiza o tamanho selecionado
        });
    });

    // Define o tamanho inicial selecionado ao carregar a página
    const initialSize = document.querySelector('.size-box.selected').textContent;
    updateSelectedSize(initialSize);
}

function atualizarImagemGrande() {
    // Seleciona todas as imagens de miniaturas
    const thumbnails = document.querySelectorAll('.content-scroll-vertical img');
    const largeImage = document.querySelector('.image.large');

    // Adiciona um evento de clique para cada miniatura
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {

            // Atualiza o src da imagem grande com o src da miniatura clicada
            largeImage.src = thumbnail.src;
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const catalogoContainer = document.getElementById("catalogo");
    const ordenarPorSelect = document.getElementById("ordenar-por");
    const filtroTamanho = document.getElementById("filtro-tamanho");
    const precoMinimo = document.getElementById("preco-minimo");
    const precoMaximo = document.getElementById("preco-maximo");
    const botaoAplicarFiltros = document.getElementById("aplicar-filtros");
    const botaoRemoverFiltros = document.getElementById("remover-filtros");
    const formPesquisa = document.getElementById("form-pesquisa");
    const campoPesquisa = document.getElementById("campo-pesquisa");


    // Elementos relacionados ao filtro móvel
    const botaoFiltroMobile = document.querySelector(".botao-filtro-mobile");
    const filtroContainer = document.querySelector(".filtro-container");
    const botaoFecharFiltro = document.querySelector(".fechar-filtro");

    // Função para remover acentos e normalizar strings
    function removerAcentos(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    // Buscar camisas do JSON server
    async function buscarCamisas() {
        try {
            const resposta = await fetch("http://localhost:3000/camisas");
            if (!resposta.ok) {
                throw new Error('Erro ao buscar as camisas');
            }
            return await resposta.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Renderizar catálogo
    async function renderizarCatalogo(filtros = {}) {
        let camisas = await buscarCamisas();

        // Aplicar filtros de busca
        if (filtros.termoPesquisa) {
            const termoNormalizado = removerAcentos(filtros.termoPesquisa.toLowerCase().trim());
            camisas = camisas.filter(camisa => {
                const nomeCamisaNormalizado = removerAcentos(camisa.nome.toLowerCase());
                return nomeCamisaNormalizado.includes(termoNormalizado);
            });
        }

        // Aplicar filtros adicionais (ordenar, tamanho, etc.)
        if (filtros.tamanho) {
            camisas = camisas.filter(camisa => camisa.tamanhos.includes(filtros.tamanho));
        }
        if (filtros.precoMinimo != null) {
            camisas = camisas.filter(camisa => camisa.preco >= filtros.precoMinimo);
        }
        if (filtros.precoMaximo != null) {
            camisas = camisas.filter(camisa => camisa.preco <= filtros.precoMaximo);
        }

        // Ordenar camisas
        if (filtros.ordenarPor) {
            camisas.sort((a, b) => {
                if (filtros.ordenarPor === "preco-asc") {
                    return a.preco - b.preco;
                } else if (filtros.ordenarPor === "preco-desc") {
                    return b.preco - a.preco;
                } else if (filtros.ordenarPor === "nome-asc") {
                    return a.nome.localeCompare(b.nome);
                } else if (filtros.ordenarPor === "nome-desc") {
                    return b.nome.localeCompare(a.nome);
                }
            });
        }

        // Renderizar camisas
        catalogoContainer.innerHTML = "";

        if (camisas.length === 0) {
            // Se não houver camisas para exibir
            catalogoContainer.innerHTML = "<p class='mensagem-indisponivel'>Produto indisponível</p>";
        } else {
            camisas.forEach(camisa => {
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

                // Adicionar evento de clique ao card
                camisaCard.addEventListener("click", () => {
                    clicarNoProduto(camisa);
                });

                catalogoContainer.appendChild(camisaCard);
            });
        }
    }

    // Aplicar filtros e ordenação
    botaoAplicarFiltros.addEventListener("click", () => {
        const filtros = {
            ordenarPor: ordenarPorSelect.value,
            tamanho: filtroTamanho.value,
            precoMinimo: precoMinimo.value ? parseFloat(precoMinimo.value.trim().replace(",", ".")) : null,
            precoMaximo: precoMaximo.value ? parseFloat(precoMaximo.value.trim().replace(",", ".")) : null,
        };
        renderizarCatalogo(filtros);
    });

    // Remover filtros e renderizar catálogo completo
    botaoRemoverFiltros.addEventListener("click", () => {
        // Redefinir campos de filtro para valores padrão
        ordenarPorSelect.value = "";
        filtroTamanho.value = "";
        precoMinimo.value = "";
        precoMaximo.value = "";

        // Renderizar catálogo sem filtros
        renderizarCatalogo();
    });

    // Capturar evento de pesquisa
    formPesquisa.addEventListener("submit", (event) => {
        event.preventDefault(); // Impedir o comportamento padrão do formulário

        const termoPesquisa = campoPesquisa.value.trim();
        renderizarCatalogo({ termoPesquisa });

        // Limpar o campo de pesquisa após a busca
        campoPesquisa.value = "";
    });

    // Mostrar filtro em telas móveis
    if (botaoFiltroMobile) {
        botaoFiltroMobile.addEventListener("click", () => {
            filtroContainer.classList.add("ativo");
        });
    }

    // Fechar filtro em telas móveis
    if (botaoFecharFiltro) {
        botaoFecharFiltro.addEventListener("click", () => {
            filtroContainer.classList.remove("ativo");
        });
    }

    function clicarNoProduto(camisa) {
        // Esconder o container-principal
        const containerPrincipal = document.querySelector(".container-principal");
        containerPrincipal.style.display = "none";

        // Mostrar o desktop
        const desktop = document.querySelector(".desktop");
        desktop.style.display = "flex";

        // Atualizar o conteúdo do desktop com os detalhes da camisa selecionada
        desktop.querySelector(".title").textContent = camisa.nome;
        desktop.querySelector(".current-price").textContent = `R$${camisa.preco.toFixed(2).replace(".", ",")}`;
        desktop.querySelector(".large").src = camisa.imagens[0];
        desktop.querySelector(".large").alt = camisa.nome;

        // Atualizar os tamanhos disponíveis
        const sizeOptions = desktop.querySelector(".size-options");
        sizeOptions.innerHTML = camisa.tamanhos
            .map(
                (tamanho, index) =>
                    `<div class="size-box ${index === 0 ? "selected" : ""}">${tamanho}</div>`
            )
            .join("");

        // Atualiza a galeria de imagens
        const imageContainer = document.querySelector('.content-scroll-vertical');
        if (imageContainer) {
            imageContainer.innerHTML = ''; // Limpa imagens anteriores
            camisa.imagens.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.className = "image";
                imgElement.src = imageUrl;
                imgElement.alt = `Imagem de ${camisa.nome}`;
                imgElement.classList.add('image');
                imageContainer.appendChild(imgElement); // Adiciona a imagem à galeria
            });
        }

        initializeSizeSelection(); 
        initializeQuantityControls(); 
        initializeVerticalScroll(); 
        atualizarImagemGrande();

        // Fechar produto
        const produto = document.querySelector(".button-back");

        produto.addEventListener("click", (event) => {
            desktop.style.display = "none";
            containerPrincipal.style.display = "flex";
        });
    }




    // Renderizar catálogo inicial
    renderizarCatalogo();
});
