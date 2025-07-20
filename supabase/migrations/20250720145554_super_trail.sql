/*
  # Inserção de filmes de exemplo

  1. Dados de Exemplo
    - Adiciona filmes de exemplo para demonstrar a funcionalidade
    - Inclui diferentes gêneros e anos
    - Usa URLs de imagens do Pexels para as capas
    - URLs de embed do YouTube para os vídeos

  2. Observações
    - Os dados são inseridos apenas se a tabela estiver vazia
    - URLs de exemplo funcionais para demonstração
*/

-- Insere filmes de exemplo apenas se a tabela estiver vazia
INSERT INTO movies (title, description, embed_url, cover_image_url, genre, release_year, duration, rating)
SELECT * FROM (VALUES
  (
    'Blade Runner 2049',
    'Trinta anos após os eventos do primeiro filme, um novo blade runner, K, descobre um segredo há muito enterrado que tem o potencial de mergulhar o que resta da sociedade no caos.',
    'https://www.youtube.com/embed/gCcx85zbxz4',
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Ficção Científica',
    2017,
    '2h 44min',
    8.0
  ),
  (
    'Mad Max: Estrada da Fúria',
    'Em um mundo pós-apocalíptico, Max se une à Imperatriz Furiosa para fugir de um senhor da guerra tirano em busca da terra natal perdida de Furiosa.',
    'https://www.youtube.com/embed/hEJnMQG9ev8',
    'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Ação',
    2015,
    '2h 0min',
    8.1
  ),
  (
    'Interestelar',
    'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    'https://www.youtube.com/embed/zSWdZVtXT7E',
    'https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Ficção Científica',
    2014,
    '2h 49min',
    8.6
  ),
  (
    'John Wick',
    'Um ex-assassino sai da aposentadoria para rastrear os gângsters que mataram seu cachorro e levaram tudo dele.',
    'https://www.youtube.com/embed/C0BMx-qxsP4',
    'https://images.pexels.com/photos/7991582/pexels-photo-7991582.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Ação',
    2014,
    '1h 41min',
    7.4
  ),
  (
    'A Origem',
    'Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um CEO.',
    'https://www.youtube.com/embed/YoHD9XEInc0',
    'https://images.pexels.com/photos/7991583/pexels-photo-7991583.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Ficção Científica',
    2010,
    '2h 28min',
    8.8
  ),
  (
    'Parasita',
    'Toda a família de Ki-taek está desempregada, vivendo em um porão sujo e apertado. Uma oportunidade se apresenta quando o filho consegue um emprego como tutor da filha de uma família rica.',
    'https://www.youtube.com/embed/5xH0HfJHsaY',
    'https://images.pexels.com/photos/7991584/pexels-photo-7991584.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Thriller',
    2019,
    '2h 12min',
    8.5
  ),
  (
    'Coringa',
    'Em Gotham City, Arthur Fleck, um comediante fracassado, é levado ao crime e ao caos na cidade. Ele se torna o infame psicopata criminoso conhecido como Coringa.',
    'https://www.youtube.com/embed/zAGVQLHvwOY',
    'https://images.pexels.com/photos/7991585/pexels-photo-7991585.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Drama',
    2019,
    '2h 2min',
    8.4
  ),
  (
    'Vingadores: Ultimato',
    'Após os eventos devastadores de Vingadores: Guerra Infinita, o universo está em ruínas. Com a ajuda de aliados remanescentes, os Vingadores se reúnem mais uma vez.',
    'https://www.youtube.com/embed/TcMBFSGVi1c',
    'https://images.pexels.com/photos/7991586/pexels-photo-7991586.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    'Ação',
    2019,
    '3h 1min',
    8.4
  )
) AS sample_data(title, description, embed_url, cover_image_url, genre, release_year, duration, rating)
WHERE NOT EXISTS (SELECT 1 FROM movies LIMIT 1);