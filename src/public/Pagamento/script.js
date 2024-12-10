let pagamentos = [];
let editandoId = null;

// Alterna entre as formas de pagamento
function mostrarPagamento(tipo) {
  const cartaoContainer = document.getElementById("cartao-container");
  const pixContainer = document.getElementById("pix-container");

  if (tipo === "cartao") {
    cartaoContainer.classList.remove("hidden");
    pixContainer.classList.add("hidden");
  } else if (tipo === "pix") {
    cartaoContainer.classList.add("hidden");
    pixContainer.classList.remove("hidden");
  }
}

// Copia a chave PIX para a área de transferência
function copiarChave() {
  const chavePix = document.getElementById("pix-chave");
  chavePix.select();
  document.execCommand("copy");

  const mensagemCopiada = document.getElementById("copied-message");
  mensagemCopiada.classList.remove("hidden");

  setTimeout(() => {
    mensagemCopiada.classList.add("hidden");
  }, 2000);
}

// Formata o número do cartão
document.getElementById("numeroCartao").addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  valor = valor.replace(/(.{4})/g, "$1 ").trim(); // Adiciona espaço após cada 4 números
  e.target.value = valor;
});

// Garante que o CVV aceite apenas números
document.getElementById("cvv").addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
});

// Adiciona ou edita um pagamento
function adicionarPagamento() {
  const nome = document.getElementById("nome").value.trim();
  const numeroCartao = document.getElementById("numeroCartao").value.trim();
  const validade = document.getElementById("validade").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  if (!nome || !numeroCartao || !validade || !cvv) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  if (editandoId === null) {
    const novoPagamento = {
      id: pagamentos.length + 1,
      nome,
      numeroCartao,
      validade,
      cvv
    };
    pagamentos.push(novoPagamento);
  } else {
    const pagamento = pagamentos.find(pag => pag.id === editandoId);
    pagamento.nome = nome;
    pagamento.numeroCartao = numeroCartao;
    pagamento.validade = validade;
    pagamento.cvv = cvv;
    editandoId = null;
  }

  document.getElementById("payment-form").reset();
  alert("Pagamento adicionado com sucesso!");
}
// Formata o número do cartão (adiciona espaço após cada 4 números)
document.getElementById("numeroCartao").addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  valor = valor.replace(/(.{4})/g, "$1 ").trim(); // Adiciona espaço após cada 4 números
  e.target.value = valor;
});

// Garante que o CVV aceite apenas números
document.getElementById("cvv").addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
});

// Formata o campo de validade como MM/AA
document.getElementById("validade").addEventListener("input", function (e) {
  let valor = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
  if (valor.length > 2) {
    valor = valor.substring(0, 2) + "/" + valor.substring(2, 4); // Adiciona barra após os dois primeiros números
  }
  e.target.value = valor.substring(0, 5); // Limita o valor a 5 caracteres (MM/AA)
});

function adicionarPagamento() {
    const nome = document.getElementById("nome").value.trim();
    const numeroCartao = document.getElementById("numeroCartao").value.trim();
    const validade = document.getElementById("validade").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
  
    // Validação obrigatória dos campos
    if (!nome || !numeroCartao || !validade || !cvv) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
  
    if (editandoId === null) {
      const novoPagamento = {
        id: pagamentos.length + 1,
        nome,
        numeroCartao,
        validade,
        cvv
      };
      pagamentos.push(novoPagamento);
    } else {
      const pagamento = pagamentos.find(pag => pag.id === editandoId);
      pagamento.nome = nome;
      pagamento.numeroCartao = numeroCartao;
      pagamento.validade = validade;
      pagamento.cvv = cvv;
      editandoId = null;
    }
  
    // Resetando o formulário
    document.getElementById("payment-form").reset();
  
    // Redireciona para a página de pagamento aprovado
    window.location.href = "pagamento-aprovado.html"; // Redireciona após sucesso
  }
