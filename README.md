# Ecoffe 

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como Executar o Projeto com Docker Compose

Siga os passos abaixo para configurar e executar o projeto usando Docker Compose:

1. **Clone o Repositório** (se ainda não o fez):
   ```bash
   git clone <URL-do-repositório>
   cd ecoffe
   ```

2. **Configurar Variáveis de Ambiente**:
   - Crie um arquivo `.env.prod` na raiz do projeto com base no exemplo fornecido ou configure as variáveis de ambiente diretamente no seu sistema.
   - As variáveis essenciais incluem:
     - `POSTGRES_USER`: Usuário do banco de dados PostgreSQL.
     - `POSTGRES_PASSWORD`: Senha do banco de dados PostgreSQL.
     - `POSTGRES_DB_NAME`: Nome do banco de dados.
     - `PORT`: Porta onde a aplicação será executada (padrão: 3000).
     - `NODE_ENV`: Ambiente de execução (ex.: `production` ou `development`).
     - `REPOSITORY_TYPE`: Tipo de repositório a ser usado (`prisma` ou `sql`).

3. **Construir e Iniciar os Contêineres**:
   Execute o comando abaixo para construir a imagem Docker e iniciar os serviços:
   ```bash
   docker-compose up --build
   ```
   Isso iniciará tanto o serviço da aplicação `ecoffe` quanto o banco de dados PostgreSQL.

4. **Acessar a Aplicação**:
   Após a inicialização, a aplicação estará disponível em `http://localhost:3000`.

5. **Parar os Contêineres**:
   Quando terminar, você pode parar os serviços com:
   ```bash
   docker-compose down
   ```

## Alternando entre Prisma e SQL

O projeto permite que você alterne entre o uso de **Prisma ORM** e **SQL direto** para interagir com o banco de dados. Isso é controlado pela variável de ambiente `REPOSITORY_TYPE`.

Implementei o repositório utilizando Arquitetura Hexagonal, dessa forma fica desacoplado da lógica de negócios. Separando a camada de domínio (regras de negócio) da camada de infraestrutura (acesso ao banco de dados), permitindo que diferentes implementações de repositórios sejam usadas sem alterar o núcleo da aplicação. Assim, é possível alternar entre o uso de um ORM como o Prisma ou consultas SQL puras sem impactar a lógica central do sistema.

- **Para usar Prisma**:
  Defina `REPOSITORY_TYPE=prisma` no arquivo `.env.prod` ou como variável de ambiente ao executar o Docker Compose.

- **Para usar SQL direto**:
  Defina `REPOSITORY_TYPE=sql` no arquivo `.env.prod` ou como variável de ambiente.

Após alterar o valor de `REPOSITORY_TYPE`, você precisará reiniciar os contêineres para que a mudança tenha efeito:
```bash
docker-compose down
docker-compose up --build
```

## Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `prisma/`: Configurações e esquemas do Prisma.
- `database/`: Scripts SQL para inicialização do banco de dados.
- `docker-compose.yml`: Arquivo de configuração do Docker Compose.
- `Dockerfile`: Arquivo para construção da imagem Docker da aplicação.