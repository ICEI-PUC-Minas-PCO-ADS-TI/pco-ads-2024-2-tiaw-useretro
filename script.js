document.addEventListener("DOMContentLoaded", function () {
    const imagePreview = document.getElementById("imagePreview");
    const imageUpload = document.getElementById("imageUpload");
    const uploadedImagesContainer = document.getElementById("uploadedImagesContainer");
    const priceInput = document.getElementById("price");
    const form = document.getElementById("productForm");
    const imageCountText = document.getElementById("imageCount");

    // Abrir seleção de arquivos ao clicar na área de upload
    imagePreview.addEventListener("click", () => {
        if (uploadedImagesContainer.children.length < 6) {  // Permitir clique apenas se o número de imagens for menor que 6
            imageUpload.click();
        }
    });

    // Manipulação do upload de imagem
    imageUpload.addEventListener("change", () => {
        const files = Array.from(imageUpload.files);

        // Limitar o número de imagens a serem adicionadas e mostrar o alerta uma única vez
        if (uploadedImagesContainer.children.length + files.length > 6) {
            alert("Você só pode adicionar até 6 imagens.");
        }

        const allowedFiles = files.slice(0, 6 - uploadedImagesContainer.children.length);

        allowedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imgWrapper = document.createElement("div");
                imgWrapper.classList.add("uploaded-image");

                const img = document.createElement("img");
                img.src = e.target.result;

                const deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-image-btn");
                deleteBtn.textContent = "X"; // Adiciona "X" como texto do botão

                deleteBtn.addEventListener("click", () => {
                    imgWrapper.remove();
                    updateImageCount();
                    showOrHideImageMessage();  // Verifica se precisa mostrar a mensagem novamente
                });

                imgWrapper.appendChild(img);
                imgWrapper.appendChild(deleteBtn);
                uploadedImagesContainer.appendChild(imgWrapper);

                updateImageCount(); // Atualizar contagem de imagens
                showOrHideImageMessage(); // Verifica se precisa esconder a mensagem
            };

            reader.readAsDataURL(file);
        });

        // Resetar o valor do input para permitir adicionar mais imagens posteriormente
        imageUpload.value = '';
    });

    // Função para atualizar a contagem de imagens
    function updateImageCount() {
        const imageCount = uploadedImagesContainer.children.length;
        // Corrigir a ortografia para o plural
        if (imageCount === 1) {
            imageCountText.textContent = `${imageCount} imagem adicionada`;
        } else {
            imageCountText.textContent = `${imageCount} imagens adicionadas`;
        }
    }

    // Função para mostrar ou esconder a mensagem "Incluir Fotos"
    function showOrHideImageMessage() {
        const imageCount = uploadedImagesContainer.children.length;
        if (imageCount >= 6) {
            imagePreview.querySelector("p:first-child").style.display = 'none';  // Oculta a mensagem "Incluir fotos"
            imagePreview.style.pointerEvents = 'none';  // Desativa a possibilidade de clicar
        } else {
            imagePreview.querySelector("p:first-child").style.display = 'block';  // Mostra a mensagem "Incluir fotos"
            imagePreview.style.pointerEvents = 'auto';  // Reativa a possibilidade de clicar
        }
    }

    // Formatar campo de preço
    priceInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/[^\d]/g, ""); // Remove tudo que não for número
        value = (value / 100).toFixed(2); // Ajusta para 2 casas decimais
        e.target.value = `R$ ${value.replace(".", ",")}`; // Formata com o prefixo "R$" e substitui o ponto por vírgula
    });

    // Validação do formulário ao submeter
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let missingFields = [];

        // Verificar se o campo 'Nome do Produto' está preenchido
        const productName = form.querySelector("#productName");
        if (!productName.value.trim()) {
            missingFields.push("- Nome do Produto");
        }

        // Verificar se o campo 'Descrição' está preenchido
        const description = form.querySelector("#description");
        if (!description.value.trim()) {
            missingFields.push("- Descrição");
        }

        // Verificar se o campo 'Preço' está preenchido e se o valor é maior que zero
        if (priceInput.value === "R$ 0,00" || priceInput.value.trim() === "R$ 0,00" || priceInput.value === "") {
            missingFields.push("- Preço (R$)");
        }

        // Verifica o número de imagens carregadas
        const uploadedImages = uploadedImagesContainer.querySelectorAll(".uploaded-image");
        if (uploadedImages.length < 3) {
            missingFields.push("- Adicionar pelo menos 3 imagens");
        }

        // Se houver campos faltando, exibir alerta
        if (missingFields.length > 0) {
            alert(`Por favor, preencha os seguintes campos:\n${missingFields.join("\n")}`);
        } else {
            // Se tudo estiver válido, redireciona
            window.location.href = "index2.html";
        }
    });
});
