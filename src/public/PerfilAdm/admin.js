// Simulação de mensagens recebidas
const mensagens = [
    { nome: "João Silva", numero: "999999999", email: "joao@gmail.com", comentario: "Adorei o site!" },
    { nome: "Maria Oliveira", numero: "888888888", email: "maria@gmail.com", comentario: "Gostaria de mais opções de camisas." },
];

// Carrega as mensagens na tabela
function carregarMensagens() {
    const tabela = document.getElementById('messages-table');
    mensagens.forEach((mensagem) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${mensagem.nome}</td>
            <td>${mensagem.numero}</td>
            <td>${mensagem.email}</td>
            <td>${mensagem.comentario}</td>
            <td><button class="responder" data-numero="${mensagem.numero}">Responder</button></td>
        `;
        tabela.appendChild(linha);
    });
}

// Responder mensagem via WhatsApp
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('responder')) {
        const numero = event.target.getAttribute('data-numero');
        window.open(`https://wa.me/${numero}`, '_blank');
    }
});

// Exportar dados da página para PDF
document.getElementById('export-pdf').addEventListener('click', function () {
    const content = document.body.innerHTML;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pagina-administrador.pdf';
    link.click();
    URL.revokeObjectURL(url);
});

// Inicialização
document.addEventListener('DOMContentLoaded', carregarMensagens);
