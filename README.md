# 🎬 CineStream - Plataforma de Filmes

Uma plataforma moderna de streaming de filmes com design inspirado no YouTube, construída com React, TypeScript, Tailwind CSS e Supabase.

## ✨ Funcionalidades

- 🎥 **Catálogo de Filmes**: Grade responsiva com visualização em grid e lista
- 🔍 **Busca Avançada**: Pesquisa por título, descrição e categoria
- 📱 **Design Responsivo**: Interface otimizada para todos os dispositivos
- 🎭 **Categorias**: 12 categorias de filmes (Ação, Comédia, Drama, etc.)
- 🔐 **Área Administrativa**: Sistema de login para gerenciar filmes
- ▶️ **Player Integrado**: Reprodução de vídeos com suporte a YouTube e outros
- 📊 **Estatísticas**: Visualizações, curtidas e dados de engajamento
- 🎨 **Interface Moderna**: Design limpo inspirado no YouTube

## 🚀 Deploy na Vercel

### 1. Preparação
```bash
# Clone o repositório
git clone <seu-repositorio>
cd cinestream

# Instale as dependências
npm install
```

### 2. Configuração do Supabase
1. Crie um projeto no [Supabase](https://supabase.com)
2. Copie `.env.example` para `.env`
3. Configure as variáveis de ambiente:
```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 3. Deploy na Vercel
1. Instale a CLI da Vercel: `npm i -g vercel`
2. Execute: `vercel`
3. Configure as variáveis de ambiente na dashboard da Vercel
4. O site estará disponível em: `https://seu-projeto.vercel.app`

## 🛠️ Tecnologias

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Build**: Vite
- **Deploy**: Vercel
- **Icons**: Lucide React

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── lib/                # Utilitários e configurações
└── types/              # Definições de tipos TypeScript
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting do código
```

## 📝 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.