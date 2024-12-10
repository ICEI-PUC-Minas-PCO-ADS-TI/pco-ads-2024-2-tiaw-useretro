  
  document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Impede o recarregamento da página

    const name = document.getElementById('name').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validação de campos vazios
    if (!name || !cpf || !email || !password || !confirmPassword) {
      showMessage('Por favor, preencha todos os campos.', 'error');
      return;
    }

    // Validação de CPF simples (verifica apenas o formato)
    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfPattern.test(cpf)) {
      showMessage('CPF inválido. Use o formato 123.456.789-10.', 'error');
      return;
    }

    // Validação de senha
    if (password !== confirmPassword) {
      showMessage('As senhas não coincidem.', 'error');
      return;
    }

    const user = { name, cpf, email, password };

    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(Erro: ${ errorData.message || 'Erro no servidor' });
      }

      showMessage('Usuário cadastrado com sucesso!', 'success');
      document.getElementById('userForm').reset();

    } catch (error) {
      console.error(error); // Exibe o erro no console para facilitar o debug
      showMessage(Erro: ${ error.message }, 'error');
    }
    document.getElementById('usuario-btn').addEventListener('click', () => {
      window.location.href = '/useRetro - Site funcionando/useRetro - Todas as paginas/useRetrô/Cadastro usuario/index.html';
  });
  });

  // Função para exibir mensagens de feedback
  function showMessage(msg, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    messageDiv.className = type;
  }
