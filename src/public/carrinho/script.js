function calcularFrete() {
    const cep = document.getElementById('cep').value;
    const freteElement = document.querySelector('.resumo p:nth-child(2)');
    console.log(cep)
    if (cep) {
        
        freteElement.innerHTML = `<strong>Frete:</strong> R$ 15,00`;
        atualizarTotal();
    } else {
        alert('Por favor, insira um CEP válido.');
    }
}


function aplicarCupom() {
    const cupom = document.getElementById('cupom').value;
    const cupomElement = document.querySelector('.resumo p:nth-child(3)');

    let desconto = 0;

    if (cupom === 'DESCONTO10') {
        desconto = 10; 
        cupomElement.innerHTML = `<strong>Cupom:</strong> -R$ ${desconto},00`;
        atualizarTotal();
    } else {
        alert('Cupom inválido.');
    }
}


function atualizarTotal() {
    const subtotal = 99.90;  
    const frete = 15.00;  
    const cupom = 10.00;  

    
    const total = subtotal + frete - cupom;

    const totalElement = document.querySelector('.resumo p:nth-child(4)');
    totalElement.innerHTML = `<strong>Total:</strong> R$ ${total.toFixed(2)}`;
}


function continuarCompra() {
    alert('Continuando a compra...');

}


function limparCarrinho() {
    // Limpar o campo de quantidade
    const quantidadeInput = document.querySelector('.item input[type="number"]');
    quantidadeInput.value = 1;

    document.getElementById('cep').value = '';
    document.getElementById('cupom').value = '';


    const freteElement = document.querySelector('.resumo p:nth-child(2)');
    const cupomElement = document.querySelector('.resumo p:nth-child(3)');
    const totalElement = document.querySelector('.resumo p:nth-child(4)');

    freteElement.innerHTML = `<strong>Frete:</strong> R$ 15,00`;
    cupomElement.innerHTML = `<strong>Cupom:</strong> -R$ 0,00`;
    totalElement.innerHTML = `<strong>Total:</strong> R$ 99,90`;

    alert('Carrinho limpo!');
}

// Adicionar evento ao botão do carrinho
document.getElementById('carrinho-btn').addEventListener('click', () => {
    window.location.href = '/useRetro - Site funcionando/useRetro - Todas as paginas/useRetrô/Pagamento/pagamento.html';
});