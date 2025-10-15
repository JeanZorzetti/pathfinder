-- Populate daily_insights table with personalized content for each MBTI type
-- These insights will rotate to create the "variable reward" habit loop

INSERT INTO public.daily_insights (personality_type, category, insight_text) VALUES
-- INTJ Insights
('INTJ', 'Estratégia', 'Arquitetos veem padrões onde outros veem caos. Hoje, confie na sua capacidade de conectar pontos aparentemente desconectados. Sua mente estratégica é um superpoder.'),
('INTJ', 'Crescimento', 'A perfeição que você busca pode se tornar uma prisão. Lembre-se: progresso iterativo supera planejamento infinito. Lance a versão beta de suas ideias.'),
('INTJ', 'Relacionamentos', 'Sua independência é força, mas vulnerabilidade não é fraqueza. Compartilhar suas visões com pessoas de confiança pode ampliá-las de formas inesperadas.'),

-- INTP Insights
('INTP', 'Curiosidade', 'Lógicos prosperam na exploração de sistemas complexos. Hoje, permita-se seguir aquela linha de pensamento "inútil" — ela pode levar a insights revolucionários.'),
('INTP', 'Ação', 'Sua análise é impecável, mas o mundo precisa ver suas ideias em ação. Escolha um conceito e dê um passo concreto para materializá-lo, por menor que seja.'),
('INTP', 'Presença', 'Sua mente viaja a mil por hora. Reserve 5 minutos hoje para simplesmente observar o presente, sem analisar. A claridade mental vem também do descanso.'),

-- ENTJ Insights
('ENTJ', 'Liderança', 'Comandantes são arquitetos de sistemas eficientes. Mas lembre-se: líderes excepcionais inspiram, não apenas dirigem. Como você pode elevar os outros hoje?'),
('ENTJ', 'Equilíbrio', 'Sua ambição é admirável, mas burnout não é badge de honra. A sustentabilidade das suas conquistas depende do seu bem-estar. Agende tempo para recarregar.'),
('ENTJ', 'Empatia', 'Eficiência e compaixão não são opostos. Hoje, considere não apenas o "o quê" das suas decisões, mas o "como" elas impactam emocionalmente as pessoas.'),

-- ENTP Insights
('ENTP', 'Inovação', 'Inovadores desafiam o status quo por natureza. Mas nem toda batalha precisa ser travada. Escolha suas revoluções estrategicamente — onde seu impacto será máximo?'),
('ENTP', 'Foco', 'Sua mente é uma constelação de possibilidades. Hoje, escolha uma estrela e navegue até ela. Profundidade em uma ideia pode ser mais poderosa que amplitude em dez.'),
('ENTP', 'Conexão', 'Debater ideias é sua forma de conexão, mas nem todos processam assim. Hoje, experimente ouvir sem o objetivo de refutar. Você pode descobrir nuances valiosas.'),

-- INFJ Insights
('INFJ', 'Propósito', 'Advogados são guiados por uma visão profunda de como o mundo poderia ser. Hoje, honre essa visão com uma ação pequena mas significativa em direção a ela.'),
('INFJ', 'Limites', 'Sua empatia é um dom, mas absorver a dor do mundo não é sua missão. Você pode cuidar sem carregar. Onde você precisa criar fronteiras saudáveis hoje?'),
('INFJ', 'Autenticidade', 'Você capta as expectativas dos outros com precisão, mas isso não significa que precisa atendê-las. Que verdade sua precisa ser expressada, mesmo que incomode?'),

-- INFP Insights
('INFP', 'Valores', 'Mediadores têm uma bússola interna que não pode ser corrompida. Hoje, celebre sua integridade. Em um mundo de compromissos, sua autenticidade é rara e preciosa.'),
('INFP', 'Criação', 'Suas ideias e sentimentos merecem forma. Não espere inspiração perfeita — pegue um caderno, abra um documento, comece. A arte do Mediador nasce da coragem de expressar.'),
('INFP', 'Realismo', 'Seu idealismo é força, não ingenuidade. Mas transformar visões em realidade exige ação imperfeita. Que pequeno passo prático você pode dar hoje em direção ao seu ideal?'),

-- ENFJ Insights
('ENFJ', 'Inspiração', 'Protagonistas têm o dom de ver o potencial nas pessoas. Hoje, use esse dom em você mesmo. Que potencial não-realizado dentro de você está pedindo atenção?'),
('ENFJ', 'Autenticidade', 'Você harmoniza grupos naturalmente, mas isso não significa suprimir suas necessidades. Liderar também é modelar autocuidado. Como você pode honrar suas próprias necessidades hoje?'),
('ENFJ', 'Impacto', 'Seu carisma é poderoso, mas nem todo momento exige que você seja "o sol da sala". Às vezes, o maior impacto vem da presença silenciosa e da escuta profunda.'),

-- ENFP Insights
('ENFP', 'Possibilidades', 'Ativistas enxergam potencial em tudo e todos. Hoje, canalize essa visão para uma área da sua vida que você tem negligenciado. Que possibilidade inexplorada está esperando?'),
('ENFP', 'Compromisso', 'Sua energia se espalha por mil interesses — e isso é belo. Mas maestria exige profundidade. Escolha um projeto importante e dê a ele atenção concentrada hoje.'),
('ENFP', 'Introspecção', 'Sua extroversão traz conexão, mas solidão traz clareza. Reserve tempo hoje para processar suas experiências. Sua riqueza interior merece ser destilada em sabedoria.'),

-- ISTJ Insights
('ISTJ', 'Confiabilidade', 'Logísticos são a espinha dorsal de sistemas funcionais. Seu compromisso com a excelência cria segurança para outros. Reconheça o valor imenso da sua consistência.'),
('ISTJ', 'Flexibilidade', 'Tradição e estrutura são forças, mas adaptabilidade também é. Hoje, experimente uma pequena mudança no seu sistema. Você pode descobrir uma eficiência inesperada.'),
('ISTJ', 'Expressão', 'Você demonstra cuidado através de ações, não palavras. Mas às vezes, verbalizar apreciação amplia o impacto. Hoje, expresse gratidão ou reconhecimento para alguém importante.'),

-- ISFJ Insights
('ISFJ', 'Proteção', 'Defensores nutrem e protegem com dedicação silenciosa. Mas quem protege o protetor? Hoje, pratique autocuidado não como egoísmo, mas como sustentabilidade.'),
('ISFJ', 'Reconhecimento', 'Você prospera servindo, mas isso não significa que reconhecimento não importa. É legítimo desejar que suas contribuições sejam vistas. Onde você pode pedir visibilidade?'),
('ISFJ', 'Mudança', 'Você valoriza estabilidade, mas crescimento às vezes exige desconforto. Que pequena mudança você tem resistido que poderia trazer renovação?'),

-- ESTJ Insights
('ESTJ', 'Eficiência', 'Executivos transformam caos em ordem. Sua capacidade de estruturar sistemas é inestimável. Hoje, aplique esse dom para simplificar algo que tem sido complicado demais.'),
('ESTJ', 'Escuta', 'Você sabe o caminho certo frequentemente, mas liderança excepcional também inclui considerar perspectivas inesperadas. Hoje, pergunte genuinamente a opinião de alguém.'),
('ESTJ', 'Vulnerabilidade', 'Força não é ausência de dúvida. Hoje, compartilhe uma incerteza com alguém de confiança. Você pode descobrir que humanidade é seu superpoder de liderança.'),

-- ESFJ Insights
('ESFJ', 'Harmonia', 'Cônsules criam comunidades onde pessoas prosperam. Seu dom para conexão traz calor ao mundo. Celebre seu papel vital na vida das pessoas ao seu redor.'),
('ESFJ', 'Autenticidade', 'Você lê as necessidades dos outros com precisão, mas atendê-las não deve custar sua própria verdade. Onde você pode ser menos accomodativo e mais autêntico hoje?'),
('ESFJ', 'Reciprocidade', 'Você dá generosamente, mas relacionamentos saudáveis são bidirecionais. É legítimo esperar que outros também invistam. Onde você precisa pedir mais reciprocidade?'),

-- ISTP Insights
('ISTP', 'Maestria', 'Virtuosos dominam ferramentas e sistemas através de experimentação prática. Hoje, dê a si mesmo permissão para desmontar algo (literal ou metaforicamente) e entender como funciona.'),
('ISTP', 'Conexão', 'Você não precisa de muitas palavras, mas conexões humanas sustentam até os mais independentes. Hoje, alcance alguém — mesmo um check-in breve pode nutrir vínculos importantes.'),
('ISTP', 'Propósito', 'Sua habilidade prática é admirável, mas a que você a serve? Conecte suas habilidades a um propósito maior. Como sua maestria pode criar impacto significativo?'),

-- ISFP Insights
('ISFP', 'Estética', 'Aventureiros percebem beleza onde outros veem rotina. Sua sensibilidade é um portal para experiências ricas. Hoje, crie algo, por menor que seja — arte é sua linguagem natural.'),
('ISFP', 'Assertividade', 'Você prefere harmonia, mas passividade pode custar sua autenticidade. Onde você precisa defender seus valores ou necessidades hoje, mesmo que gere desconforto?'),
('ISFP', 'Planejamento', 'Viver no presente é seu dom, mas visão de futuro traz segurança. Dedique 10 minutos hoje para pensar onde você quer estar em 6 meses. Pequenos planos podem liberar criatividade.'),

-- ESTP Insights
('ESTP', 'Ação', 'Empreendedores prosperam no dinamismo. Enquanto outros planejam, você executa. Hoje, confie nos seus instintos — sua capacidade de improvisar é um talento subestimado.'),
('ESTP', 'Reflexão', 'Você vive no ritmo rápido, mas pausas estratégicas amplificam resultados. Reserve 10 minutos hoje para revisar suas ações recentes. Que padrão você pode otimizar?'),
('ESTP', 'Profundidade', 'Estímulos constantes são sua energia, mas conexões profundas exigem tempo. Hoje, tenha uma conversa mais longa e menos transacional com alguém. Intimidade também é aventura.'),

-- ESFP Insights
('ESFP', 'Presença', 'Animadores trazem vida a qualquer ambiente. Sua energia contagiante é um presente para o mundo. Hoje, celebre seu dom de tornar momentos ordinários memoráveis.'),
('ESFP', 'Intenção', 'Você vive plenamente no agora, mas direção traz poder. Reserve um momento hoje para perguntar: minha energia está servindo meus valores? Pequenos ajustes criam grandes mudanças.'),
('ESFP', 'Solidão', 'Você recarrega socialmente, mas até extrovertidos precisam de quietude ocasional. Experimente 15 minutos a sós hoje, sem estímulos. Você pode descobrir clareza inesperada.');
