## ![alt text](https://miro.medium.com/fit/c/128/128/2*pq7dg0Y11VmKBSy6qiJdtQ.png "Logo Title Text 1")Labenu Web Full-Stack Bootcamp
> Desenvolvimento de aplicações completas, incluindo frontend Web com React e backend com node.js.
______

## Projeto Backend desenvolvido por Marina Isabel
- [Linkedin](https://www.linkedin.com/in/marinaisabel/)

______

### Projeto Spotenu 

  O *Spotenu* é um projeto que visa facilitar o acesso a músicas pelo mundo. Para isso, vamos dar suporte para dois tipos de usuários: as bandas (ou músicos) e os ouvintes (usuários que consomem as músicas). Além disso, nós vamos montar uma operação com funcionários próprios que precisam gerenciar os dados que circulam no nosso sistema. Eles serão os nossos administradores.
  
  - 1. Signup de usuário ouvinte**

    Um usuário ouvinte tem que fornecer o nome, o email, o nickname uma senha. Faça as validações básicas e garanta que a senha tenha, no mínimo, 6 caracteres. **Em todos os cadastros e logins**, vamos usar somente o *access token*

    - Dicas

        Guarde todos os usuários em uma tabela só e crie 4 tipos: banda, ouvinte pagante, ouvinte não pagante e administradores

- 2. Cadastro de administrador
    Os administradores também se cadastram com nome, email, nickname e senha. Aqui, a senha tem que possuir, no mínimo, 10 carácteres. Somente um usuário administrador pode adicionar outro (ou seja, esse endpoint deve ser autenticado e verificar se o token é de um administrador)
- 3. Signup de bandas**
    A banda precisa informar o seu nome, o nickname, o email, a sua descrição e uma senha, com, no mínimo 6 caracteres. Uma banda deve começar com o status de não aprovada (ou seja, não retorne um *access token* nesse endpoint)
- 4. Ver todas as bandas**
    Esse endpoint deve retornar uma lista com todas as bandas registradas no banco, com as informações: nome, email,  nickname e um booleano indicando se está aprovado ou não. Somente administradores podem ter acesso a essa funcionalidade
- 5. Aprovação de bandas**
    Um administrador pode aprovar uma banda, para que ela, então, consiga se logar. Caso um administrador tente aprovar uma banda que já tinha sido aprovada, um erro deve ser retornado (e, obviamente, se a banda não existir também).
- 6. Login**
    Todos os usuários (ouvintes, administradores ou bandas) devem se logar pelo mesmo endpoint. Eles podem fornecer o email ou o nickname e a senha correta. 
- 7. Adicionar Gênero**
    Somente um administrador pode adicionar gêneros na nossa aplicação. Para isso, deve fornecer um nome. Caso já exista um gênero com esse nome, um erro deve ser retornado
  - 8. Ver gêneros músicias**
    Tanto um administrador como um usuário banda podem ver todos os gêneros músicas. Retorne uma lista com id e nome
- 9. Criação de álbuns**
    Uma banda pode criar um álbum para colocar as suas músicas. Deve fornecer o nome e uma lista de gêneros. Quando o álbum for criado, ele deve ser diretamente atrelado à banda que estiver autenticada na aplicação. Só bandas podem criar álbuns.
- 10. Criação de músicas**
    Para criar uma música, um nome e um álbum devem ser informados. Caso o álbum não exista, um erro deve ser informado. Se já existir uma música com esse nome no álbum, outro erro deve ser retornado. 

### Começando
  Para executar o projeto, será necessário instalar os seguintes programas:
  - [Node.js e Express](https://medium.com/@pedrompinto/tutorial-node-js-como-usar-o-express-js-7d3027f4f57b)
  - [Knex](http://knexjs.org/)
  
### Desenvolvimento
  Para iniciar o desenvolvimento, é necessário clonar o projeto do GitHub num diretório de sua preferência:
  
  ``cd "Pasta do arquivo"
    git clone https://github.com/marinaisabels/backend-project.git
    ``
### Configuração
  Para configurar o arquivo, é preciso instalar as depêndencias
  - Node e Typesript
    `npm init`
    `npm install typscript @types/node ts-node-dev`
  - Banco de dados 
    `npm install knex mysql @types/knex dotenv`
  - Express 
    `npm install express@4.17.0 @types/express@4.17.0`
  - UUID 
    `npm install uuid @types/uuid`
  - JWT 
    `npm install jsonwebtoken @types/jsonwebtoken`
    
### Instruções para rodar
As instruções são:
- `npm install` para instalar todas as dependências;
- `npm run start` para rodar localmente o projeto
- `npm run build` para gerar uma versão possível de ser deployada com 
os arquivos transpilados para Javascript    
    
Esse é um projeto de Backend feito utilizando NodeJS, Express, Typescript 
e MySQL. Além disso, ele segue uma arquitetura baseada em MVC, com 3 camadas 
simples:

- Controller: responsável pela comunicação com agentes externos 
(como o Frontend)
- Model: responsável pela representação das nossas entidades
- Business: responsável pela lógica de negócio

    
    
   
  
