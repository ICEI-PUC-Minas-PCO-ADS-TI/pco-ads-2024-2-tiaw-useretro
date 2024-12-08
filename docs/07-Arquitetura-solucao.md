Documentação de Arquitetura de Software
1. Visão Geral da Solução
A solução do site useRetrô surge da crescente demanda por produtos que remetem à nostalgia, em especial camisas retrô de times de futebol, que têm se tornado itens de colecionador e moda casual. Atualmente, muitas pessoas têm dificuldade em encontrar plataformas confiáveis que centralizem a compra, venda e troca dessas camisas. Além disso, a falta de opções intuitivas e bem-organizadas limita a experiência do usuário, afastando possíveis compradores e vendedores desse mercado. A arquitetura é construída utilizando uma combinação de HTML, CSS, JSON e JavaScript. Estes componentes trabalham juntos para fornecer uma interface de usuário interativa, estilizada e funcional.
2. Componentes Principais
HTML: Estrutura básica da página
⦁	index.html: Página principal que carrega outros componentes.
⦁	header.html, footer.html: Inclusões de cabeçalhos e rodapés reutilizáveis.
CSS: Estilos da página
⦁	styles.css: Arquivo principal de estilo.
⦁	responsive.css: Arquivo de estilos responsivos para dispositivos móveis.
JavaScript:
⦁	main.js: Lógica principal de interação com o DOM.
⦁	utils.js: Funções auxiliares, como validação de formulários.
JSON:
⦁	config.json: Arquivo de configuração para definir parâmetros do sistema.
⦁	data.json: Arquivo de configuração de dados em formato JSON.
3. Arquitetura do Sistema
O sistema segue uma arquitetura cliente-servidor, onde o cliente (navegador) envia requisições HTTP e o servidor processa essas requisições.
3.1. Fluxo de Dados
Frontend (HTML + CSS + JavaScript):
⦁	O navegador solicita a página HTML, que contém a estrutura básica do site.
⦁	O CSS é aplicado para definir o estilo visual.
⦁	O JavaScript é usado para manipular os dados em tempo real, fazer requisições AJAX ou Fetch para o servidor e atualizar a interface sem recarregar a página (usando JSON para dados).
4. Funcionalidades
Cadastro de Usuários
Permite que os usuários (incluindo administradores) se cadastrem, tendo seus dados e segurança após o login no sistema.
Estrutura de dados: Cadastro
Instruções de acesso:
⦁	Abra o site e efetue o login.
⦁	Acesse o menu principal e escolha a opção "Cadastro de Usuários".
⦁	Em seguida, preencha com seus dados (seja de um usuário comum ou de um administrador).
5. Tela de Funcionalidade
 ![Captura de tela 2024-12-07 173833](https://github.com/user-attachments/assets/088c25f5-c85a-458d-8da0-e4d1ceca4197)

6. Estrutura de dados

Json :

{
    "usuarios": []
}


7. Hospedagem do Website
A hospedagem da plataforma useRetrô foi realizada utilizando o GitHub Pages. Esta plataforma oferece uma maneira simples e eficiente de publicar sites estáticos (HTML, CSS e JavaScript) diretamente de um repositório GitHub. O GitHub Pages é uma excelente opção para projetos como o useRetrô, pois permite que a solução seja acessada por qualquer usuário com um navegador, sem a necessidade de configurar servidores complexos.
Passos para publicação com GitHub Pages:
⦁	Criação do Repositório no GitHub: Foi criado um repositório no GitHub contendo todos os arquivos necessários para a plataforma: HTML, CSS, JavaScript e arquivos JSON.
⦁	Configuração do GitHub Pages: Após o repositório ser configurado e os arquivos estarem prontos, a opção de GitHub Pages foi habilitada diretamente nas configurações do repositório. A partir disso, o site passou a ser acessível através de uma URL fornecida pelo GitHub.
⦁	Lançamento: Uma vez configurado, o site foi lançado e se tornou acessível para os usuários em qualquer dispositivo conectado à internet.
8. Programação Colaborativa e Desenvolvimento
Durante o desenvolvimento da plataforma, a programação colaborativa foi realizada com o auxílio da ferramenta Repl.it. O Repl.it facilita a programação em tempo real, permitindo que múltiplos desenvolvedores trabalhem juntos no mesmo código simultaneamente, e também oferece um ambiente integrado para testar e executar os scripts.
Benefícios do Repl.it:
⦁	Facilidade de Acesso: Como a plataforma é online, qualquer membro da equipe pode acessar e colaborar de qualquer lugar.
⦁	Execução Instantânea: A ferramenta permite que o código seja executado diretamente na plataforma, o que facilita os testes rápidos.
9. Links Úteis e Recursos
⦁	Website com GitHub Pages:⦁	 ⦁	Documentação GitHub Pages - Aqui você pode aprender como configurar e hospedar seu site estático no GitHub Pages.


