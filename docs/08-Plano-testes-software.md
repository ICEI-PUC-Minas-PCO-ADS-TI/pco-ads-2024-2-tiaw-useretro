# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="03-Product-design.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="03-Product-design.md">Especificação do projeto</a>.

# Plano de Testes de Software

## Caso de teste: CT-001 – Exibição de Produtos em Destaque
| **Atributo** | **Descrição** |
|:---:|:---|
| **Requisito associado** | RF-001 - Exibição de produtos em destaque. |
| **Objetivo do teste** | Verificar se os produtos populares ou em promoção são exibidos corretamente na página inicial. |
| **Passos** | - Acessar o site<br> - Verificar a seção de produtos em destaque<br> - Conferir se os produtos exibidos possuem as informações de imagem, descrição e preço |
| **Critério de êxito** | - Os produtos são exibidos corretamente com todas as informações detalhadas. |
| **Responsável pela elaboração do caso de teste** | Nome do integrante da equipe. |

---

## Caso de teste: CT-002 – Funcionamento do Menu de Navegação
| **Atributo** | **Descrição** |
|:---:|:---|
| **Requisito associado** | RF-002 - Menu de navegação. |
| **Objetivo do teste** | Validar a navegação entre as categorias, novidades, ofertas e informações da loja. |
| **Passos** | - Acessar o site<br> - Clicar em cada opção do menu<br> - Verificar se a página correspondente é carregada corretamente |
| **Critério de êxito** | - Todas as opções do menu redirecionam corretamente. |
| **Responsável pela elaboração do caso de teste** | Nome do integrante da equipe. |

---

## Caso de teste: CT-003 – Exibição do Banner Promocional
| **Atributo** | **Descrição** |
|:---:|:---|
| **Requisito associado** | RF-003 - Banner ou slider. |
| **Objetivo do teste** | Garantir que o banner ou slider exibe imagens promocionais corretamente. |
| **Passos** | - Acessar o site<br> - Verificar o carregamento das imagens no banner<br> - Observar a transição automática ou manual das imagens |
| **Critério de êxito** | - As imagens promocionais são exibidas e alternam corretamente. |
| **Responsável pela elaboração do caso de teste** | Nome do integrante da equipe. |

---

## Caso de teste: CT-004 – Sistema de Busca
| **Atributo** | **Descrição** |
|:---:|:---|
| **Requisito associado** | RF-013 - Sistema de busca. |
| **Objetivo do teste** | Verificar se a barra de busca localiza produtos corretamente. |
| **Passos** | - Acessar o site<br> - Inserir um termo de busca (nome, time ou categoria)<br> - Conferir os resultados retornados |
| **Critério de êxito** | - O sistema retorna resultados relevantes e corretos. |
| **Responsável pela elaboração do caso de teste** | Nome do integrante da equipe. |

---

## Caso de teste: CT-005 – Responsividade
| **Atributo** | **Descrição** |
|:---:|:---|
| **Requisito associado** | RNF-004 - Responsividade. |
| **Objetivo do teste** | Garantir que o site é exibido corretamente em diferentes dispositivos e tamanhos de tela. |
| **Passos** | - Acessar o site em um navegador de desktop<br> - Acessar o site em um dispositivo móvel (smartphone e tablet)<br> - Verificar a adaptação do layout |
| **Critério de êxito** | - O site é exibido corretamente em todos os dispositivos testados. |
| **Responsável pela elaboração do caso de teste** | Nome do integrante da equipe. |

---

## Caso de teste: CT-006 – Processo de Checkout
| **Atributo** | **Descrição** |
|:---:|:---|
| **Requisito associado** | RF-015 e RNF-001 - Processo de checkout. |
| **Objetivo do teste** | Verificar se o usuário consegue realizar o checkout do carrinho de compras. |
| **Passos** | - Adicionar itens ao carrinho<br> - Acessar o carrinho<br> - Preencher os dados de envio e pagamento<br> - Finalizar a compra |
| **Critério de êxito** | - O pedido é confirmado com sucesso. |
| **Responsável pela elaboração do caso de teste** | Nome do integrante da equipe. |

