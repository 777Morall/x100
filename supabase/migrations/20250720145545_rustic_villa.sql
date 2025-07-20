/*
  # Criação da tabela de filmes

  1. Nova Tabela
    - `movies`
      - `id` (uuid, chave primária)
      - `title` (text, título do filme)
      - `description` (text, descrição do filme)
      - `embed_url` (text, URL do vídeo embed)
      - `cover_image_url` (text, URL da imagem de capa)
      - `genre` (text, gênero do filme)
      - `release_year` (integer, ano de lançamento)
      - `duration` (text, duração do filme)
      - `rating` (numeric, avaliação de 0-10)
      - `created_at` (timestamp, data de criação)
      - `updated_at` (timestamp, data de atualização)

  2. Segurança
    - Habilita RLS na tabela `movies`
    - Adiciona política para leitura pública dos filmes
    - Adiciona política para usuários autenticados gerenciarem filmes
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  embed_url text NOT NULL,
  cover_image_url text NOT NULL,
  genre text NOT NULL,
  release_year integer NOT NULL,
  duration text NOT NULL,
  rating numeric(3,1) NOT NULL CHECK (rating >= 0 AND rating <= 10),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilita Row Level Security
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública dos filmes
CREATE POLICY "Permitir leitura pública dos filmes"
  ON movies
  FOR SELECT
  TO public
  USING (true);

-- Política para permitir que usuários autenticados insiram filmes
CREATE POLICY "Usuários autenticados podem inserir filmes"
  ON movies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Política para permitir que usuários autenticados atualizem filmes
CREATE POLICY "Usuários autenticados podem atualizar filmes"
  ON movies
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para permitir que usuários autenticados deletem filmes
CREATE POLICY "Usuários autenticados podem deletar filmes"
  ON movies
  FOR DELETE
  TO authenticated
  USING (true);

-- Função para atualizar automaticamente o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar automaticamente updated_at quando um filme é modificado
CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON movies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();