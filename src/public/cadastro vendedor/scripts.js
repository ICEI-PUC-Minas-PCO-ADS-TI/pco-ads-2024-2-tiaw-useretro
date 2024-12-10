document.addEventListener('DOMContentLoaded', function() {
    fetch('vendedores.json')
        .then(response => response.json())
        .then(data => {
            carregarVendedores(data.vendedores);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});

function carregarVendedores(vendedores) {
    console.log('Dados dos vendedores carregados:', vendedores);

    vendedores.forEach(vendedor => {
        console.log(`Nome: ${vendedor.nome}, Email: ${vendedor.email}`);
    });
}

document.getElementById('vendedorForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const successMessage = document.getElementById('successMessage');

    successMessage.style.display = 'none';
    progressBar.style.width = '0%';

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    if (!validarFormulario(nome, email, telefone, endereco, cpf)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    progressContainer.style.display = 'block';
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(progressInterval);

            setTimeout(() => {
                enviarDadosAoServidor(nome, email, telefone, endereco, cpf)
                    .then(() => {
                        progressContainer.style.display = 'none';
                        successMessage.style.display = 'block';
                        resetFormulario();
                    })
                    .catch(() => {
                        progressContainer.style.display = 'none';
                        alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
                    });
            }, 500);
        }
    }, 300);
});

function validarFormulario(nome, email, telefone, endereco, cpf) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^[0-9]{10,11}$/;
    const cpfRegex = /^[0-9]{11}$/;

    if (nome === '' || !emailRegex.test(email) || !telefoneRegex.test(telefone) || endereco === '' || !cpfRegex.test(cpf)) {
        return false;
    }

    return true;
}

function enviarDadosAoServidor(nome, email, telefone, endereco, cpf) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const sucesso = Math.random() > 0.2;
            if (sucesso) {
                resolve();
            } else {
                reject();
            }
        }, 1000);
    });
}

function resetFormulario() {
    document.getElementById('vendedorForm').reset();
}
document.getElementById('vend-btn').addEventListener('click', () => {
    window.location.href = '/useRetro - Site funcionando/useRetro - Todas as paginas/useRetrô/Pagina Inicial/index.html';
});