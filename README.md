# Plataforma de Tênis - Frontend

## Visão Geral

Este é o frontend da Plataforma de Tênis, uma aplicação web construída em React para visualização interativa de partidas, jogadores e estatísticas de tênis. O frontend consome uma API backend que gerencia autenticação, usuários e dados da aplicação.

## Funcionalidades

- Login e cadastro de usuários com persistência de token via `localStorage`
- Navegação protegida por rotas, com controle de acesso baseado no perfil do usuário (comum ou admin)
- Visualização de jogadores com cards que exibem imagem, país e data de nascimento (consumo de API externa)
- Busca e exibição de partidas com cards scrolláveis
- Dashboard com partidas ao vivo e dados em tempo real
- Tela de configurações para administração de usuários (apenas para admins)
- Layout responsivo para dispositivos móveis e desktop
- Sidebar fixa para facilitar navegação

## Tecnologias

- React
- React Router DOM
- Axios
- CSS modular e responsivo

## Como rodar localmente
- Clone este repositório: git clone git@github.com:joanamaggioni/tennis-watcher-frontend.git
- Entre na pasta do frontend, e instale as dependências: npm install
- Inicie o servidor de desenvolvimento: npm start
A aplicação estará disponível em http://localhost:3000

Configurações importantes
- O frontend espera que o backend (git@github.com:joanamaggioni/tennis-watcher-backend.git) esteja rodando e disponível em uma URL configurada (ex: http://localhost:5000).
- O token JWT é armazenado no localStorage para persistência da sessão.
- As rotas protegidas bloqueiam acesso a páginas de acordo com o perfil do usuário.

## Próximos passos / melhorias
- Integração com banco de dados real
- Notificações em tempo real usando WebSockets
- Melhorias na UX e UI
- Inclusão de mais estatísticas e filtros avançados
