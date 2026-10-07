const WA = 'https://wa.me/5579991239606'
const wa = (text: string) => `${WA}?text=${encodeURIComponent(text)}`

export const WA_TRIAL = wa('Oi Jamile, quero agendar minha aula experimental')
export const WA_LEVEL = wa('Oi Jamile, quero fazer o teste de nível')
export const WA_DOUBT = wa('Oi Jamile, tenho uma dúvida sobre a Bloomin')
export const WA_ASK = wa('Oi Jamile, quero saber mais sobre as aulas')
export const INSTAGRAM = { handle: '@jams.englishteacher', url: 'https://www.instagram.com/jams.englishteacher/' }
export const EMAIL = 'jamile@bloominenglish.com.br'
export const waCourse = (name: string) => wa(`Oi Jamile, quero saber mais sobre o curso ${name}`)

export const NAV_LINKS = [
  { label: 'Sobre', href: '#professora' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Cursos', href: '#cursos' },
  { label: 'Metodologia', href: '#metodologia' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
]

export type Step = {
  title: string
  desc: string
  cta: string
  href: string
  external: boolean
  bg: string
  fg: string
  sub: string
  accent: string
  track: string
}

export const STEPS: Step[] = [
  {
    title: 'Teste de nível',
    desc: 'Uma conversa rápida para descobrir de onde você parte e qual curso faz sentido para os seus objetivos.',
    cta: 'Fazer teste de nível',
    href: WA_LEVEL,
    external: true,
    bg: '#F6E4E6',
    fg: '#221419',
    sub: '#5C4E53',
    accent: '#781444',
    track: 'rgba(120,20,68,.18)',
  },
  {
    title: 'Aula experimental',
    desc: 'Conheça o método e a professora na prática, em uma aula ao vivo, 100% online.',
    cta: 'Agendar aula experimental',
    href: WA_TRIAL,
    external: true,
    bg: '#EBCBD4',
    fg: '#221419',
    sub: '#3A2A30',
    accent: '#5A1834',
    track: 'rgba(90,24,52,.22)',
  },
  {
    title: 'Sua turma',
    desc: 'Você entra na turma certa para o seu nível, com no máximo 10 alunos, ou em aulas individuais.',
    cta: 'Ver cursos',
    href: '#cursos',
    external: false,
    bg: '#781444',
    fg: '#F4F0EC',
    sub: '#F6E4E6',
    accent: '#F4F0EC',
    track: 'rgba(244,240,236,.3)',
  },
]

export const INTRO =
  'Sou professora de inglês há 15 anos e acredito que aprender um idioma vai muito além de estudar regras: é sobre ganhar confiança para se expressar, se conectar e ocupar novos espaços.'

export const BIO = [
  {
    label: 'Formação',
    text: 'Sou formada em Comunicação Social e em Letras – Inglês e morei por 4 anos na Flórida, uma experiência de imersão na língua e na cultura que ampliou minha compreensão sobre diferentes formas de comunicação e trouxe novas perspectivas para a maneira como ensino inglês.',
  },
  {
    label: 'A escola',
    text: 'Depois de anos ensinando em escolas de idiomas, criei minha própria escola digital: a Bloomin. Aqui, o inglês é ensinado de forma estruturada, clara e conectada ao uso real da língua, respeitando o processo de cada aluno e construindo, passo a passo, a segurança necessária para se comunicar.',
  },
  {
    label: 'Filosofia',
    text: 'Porque, assim como uma flor, a fluência também é um processo. Ela acontece com tempo, prática, cuidado e constância. E é isso que quero cultivar com você: conhecimento, confiança e a liberdade de se comunicar em inglês.',
  },
]

export type CourseLevel = { title: string; desc: string }

export type Course = {
  name: string
  tag: string
  desc: string
  alt: string
  tint: string
  levels: CourseLevel[]
}

export const COURSES: Course[] = [
  {
    name: 'Beginner',
    tag: 'A1 · A2',
    desc: 'Construa uma base sólida no inglês, dos fundamentos à comunicação básica do dia a dia.',
    alt: 'Botão de flor de cerejeira fechado',
    tint: '#FBF3F4',
    levels: [
      {
        title: 'A1 — First Steps',
        desc: 'O ponto de partida para quem está começando no inglês. Um módulo pensado para construir uma base sólida e, principalmente, dar os primeiros passos com segurança para compreender e se comunicar em situações do dia a dia.\n\nVocê começa a construir sua autonomia no inglês e ganha confiança para se expressar desde o início.',
      },
      {
        title: 'A2 — Building Confidence',
        desc: 'Depois de construir a base, é hora de ampliar a comunicação. No A2, você desenvolve mais segurança para compreender e participar de conversas simples, falar sobre diferentes situações e usar o inglês de forma cada vez mais espontânea.\n\nVocê deixa de apenas reconhecer o inglês e começa a usá-lo com mais naturalidade.',
      },
    ],
  },
  {
    name: 'Intermediate-Advanced',
    tag: 'B1 · B2-C1',
    desc: 'Aprimore sua fluência e alcance domínio avançado do idioma.',
    alt: 'Flor de cerejeira se abrindo',
    tint: '#F6E4E6',
    levels: [
      {
        title: 'B1 — Expanding Communication',
        desc: 'Um novo estágio de autonomia. No B1, você amplia sua capacidade de se comunicar, desenvolve mais recursos para expressar ideias e passa a lidar com situações cotidianas com muito mais segurança.\n\nVocê começa a se comunicar de forma mais independente, conectando ideias e participando de conversas com mais confiança.',
      },
      {
        title: 'B2–C1 — Advanced Communication',
        desc: 'Para quem já tem uma boa base e quer levar o inglês a um nível mais avançado. Este módulo é voltado para o desenvolvimento de uma comunicação mais natural, precisa e sofisticada, com maior autonomia para lidar com diferentes contextos.\n\nVocê desenvolve mais fluidez, repertório e confiança para se comunicar em inglês com profundidade e naturalidade.',
      },
    ],
  },
  {
    name: 'Conversation',
    tag: 'Todos os níveis',
    desc: 'Pratique conversação em situações cotidianas e eleve seu nível para temas complexos.',
    alt: 'Flor de cerejeira quase aberta',
    tint: '#F1D6DD',
    levels: [
      {
        title: 'Conversation 1 — Beyond Advanced',
        desc: 'Depois de alcançar um nível avançado, o próximo passo é continuar praticando e expandindo sua capacidade de comunicação. O Conversation 1 cria espaço para desenvolver ainda mais espontaneidade, confiança e naturalidade ao falar inglês.\n\nVocê transforma conhecimento em comunicação cada vez mais fluida e autêntica.',
      },
      {
        title: 'Conversation 2 — Speak with Confidence',
        desc: 'Uma continuação para quem quer ir além e tornar o inglês cada vez mais natural. Um espaço de prática e desenvolvimento para quem já se comunica em inglês e busca mais segurança, repertório e liberdade para se expressar.\n\nVocê ganha cada vez mais confiança para sustentar conversas, expressar suas ideias e se comunicar com naturalidade.',
      },
      {
        title: 'Conversation Club',
        desc: 'Uma turma extra de conversação para alunos da Bloomin que querem praticar ainda mais, independentemente do nível em que estejam. Um espaço leve e dinâmico para colocar o inglês em uso, desenvolver a confiança e manter a língua presente na rotina.\n\nMais prática, mais contato com o inglês e mais oportunidades para falar.',
      },
    ],
  },
  {
    name: 'Specialty',
    tag: 'Viagens · Negócios',
    desc: 'Inglês aplicado: prepare-se para viajar com confiança ou atuar no ambiente corporativo.',
    alt: 'Flor de cerejeira totalmente aberta',
    tint: '#EBCBD4',
    levels: [
      {
        title: 'Travel English',
        desc: 'Inglês para quem quer viajar com mais tranquilidade e autonomia. Um curso focado em preparar você para se comunicar com segurança durante diferentes momentos de uma viagem, tornando a experiência mais leve e independente.\n\nVocê ganha confiança para usar o inglês como ferramenta de comunicação onde quer que sua viagem leve você.',
      },
      {
        title: 'Business English',
        desc: 'Inglês para quem precisa se comunicar no ambiente profissional com mais segurança e clareza. Um curso voltado para desenvolver uma comunicação adequada a diferentes situações do mundo dos negócios e do trabalho.\n\nVocê fortalece sua comunicação profissional e ganha mais segurança para usar o inglês no ambiente de trabalho.',
      },
    ],
  },
]

export const WHY_TITLE_LINES = ['Você não precisa', 'florescer sozinho.']

export type WhyPanel = { title: string; desc: string; cta: string; href: string; external: boolean }

export const WHY: WhyPanel[] = [
  {
    title: 'Uma comunidade para florescer',
    desc: 'Na Bloomin, você encontra um espaço acolhedor para praticar inglês, trocar experiências e ganhar confiança para se comunicar. Porque aprender uma língua também é compartilhar o caminho, crescer junto e descobrir que cada interação pode fazer parte do seu desenvolvimento.',
    cta: 'Fale com a Jamile',
    href: WA_TRIAL,
    external: true,
  },
  {
    title: 'Acompanhamento e suporte',
    desc: 'Você não precisa florescer sozinho. Ao longo da sua jornada, você conta com orientação, feedback e suporte para perceber seu progresso, superar desafios e continuar avançando com confiança.',
    cta: 'Tirar dúvidas',
    href: '#faq',
    external: false,
  },
  {
    title: 'Diagnóstico de nível',
    desc: 'Seu inglês começa de onde você está. O teste de nivelamento identifica seu nível atual e indica o ponto de partida mais adequado para você avançar com clareza, segurança e de acordo com seus objetivos.',
    cta: 'Fazer teste de nível',
    href: WA_LEVEL,
    external: true,
  },
]

export const PILLARS = [
  { title: 'Abordagem Comunicativa', desc: 'Uso prático do inglês desde a primeira aula', photo: 'grass-pink' },
  { title: 'Aprendizagem Ativa', desc: 'Participação constante através de atividades dinâmicas', photo: 'florals-blur' },
  { title: 'Task-Based Learning', desc: 'Ensino baseado em situações reais e objetivos claros', photo: 'grass-hill' },
  { title: 'Gamificação', desc: 'Jogos e desafios que tornam o aprendizado mais eficiente', photo: 'lily-lines' },
]

export type Testimonial = {
  name: string
  detail: string
  result?: string
  headline: string
  quote: string
  photo: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Karoline Santana',
    headline: 'Aprender inglês acontece de forma tão natural.',
    detail: 'Aluna',
    photo: 'karoline',
    quote:
      'Adoro as aulas da teacher! O momento antes e durante as aulas me encantam, como somos acolhidos e incentivados, como os assuntos instigam a curiosidade, a compreensão e o aprendizado. É incrível perceber que entre afetos, encontros e momentos, aprender inglês acontece de forma tão natural.',
  },
  {
    name: 'Bruno Marcel Santos da Silva',
    headline: 'Sou muito grato por todo o suporte e dedicação!',
    detail: 'Aluno',
    photo: 'bruno',
    quote:
      'As aulas têm sido uma experiência muito positiva. A professora é muito atenciosa, paciente e possui uma excelente didática, tornando o aprendizado leve e agradável. O conteúdo é bem explicado e as aulas são dinâmicas, o que facilita bastante a evolução. Sou muito grato por todo o suporte e dedicação!',
  },
  {
    name: 'Sandra da Silva Ataide',
    headline: 'Quando olho para trás e vejo o quanto já evoluí, fico muito feliz e orgulhosa de mim.',
    detail: 'Aluna',
    photo: 'sandra',
    quote:
      'Hoje quero agradecer por uma conquista que tem sido muito especial para mim: minha evolução no inglês! Sou muito grata à @jams.englishteacher por tornar esse aprendizado tão leve e prazeroso. As aulas são dinâmicas, alegres e cheias de aprendizado. E a Teacher Jamile, com toda sua paciência, carinho e dedicação, faz toda diferença nessa caminhada. Ainda tenho muito a aprender, mas quando olho para trás e vejo o quanto já evoluí, fico muito feliz e orgulhosa de mim. Obrigada, Teacher Jamile, por fazer parte dessa fase tão importante e por me incentivar a continuar. Que venham muitos outros aprendizados e conquistas!',
  },
  {
    name: 'Ana Clara dos Santos',
    headline: 'Percebo o quanto evoluo com as aulas da Jamile.',
    detail: 'Aluna',
    photo: 'ana-clara',
    quote:
      'Sempre tive muita dificuldade com o inglês e apesar de ainda ter, percebo o quanto evoluo com as aulas da Jamile. Ela tem uma didática incrível, sabe ensinar, tem muita paciência e torna as aulas leves e descontraídas. Ela explora muito bem o vocabulário e a pronúncia, além de utilizar jogos, textos, áudios e outras atividades que tornam o aprendizado muito mais dinâmico. Além de ser uma excelente professora, a Jamile é uma pessoa muito humana e realmente se preocupa com o aprendizado dos alunos.',
  },
  {
    name: 'Milla Maria Souza Nascimento',
    result: 'Do iniciante ao avançado',
    headline: 'Hoje, no avançado, posso dizer que meu inglês está em outro nível.',
    detail: 'Aluna',
    photo: 'milla',
    quote:
      'Teacher, eu adoro as suas aulas de inglês! Faço parte desde a turma iniciante, depois intermediário e hoje, no avançado, posso dizer que meu inglês está em outro nível. As aulas são completas, é muito bom treinar todas as habilidades, e o material ajuda muito nos estudos, sempre uso.',
  },
  {
    name: 'Skarlat Lais da Silva Santos',
    headline: 'Cada aula representa uma nova oportunidade de aprender.',
    detail: 'Aluna',
    photo: 'skarlat',
    quote:
      'As aulas de inglês têm sido uma experiência muito positiva e enriquecedora. Cada aula representa uma nova oportunidade de aprender, superar desafios e acreditar cada vez mais no meu potencial. O material é didático, a metodologia facilita o aprendizado e a dedicação da professora tornam esse processo mais leve, dinâmico e motivador. Grata por fazer parte dessa experiência e por todo conhecimento adquirido.',
  },
]

export type Faq = { q: string; a: string }

export const FAQS: Faq[] = [
  {
    q: 'Como funcionam as aulas?',
    a: 'As aulas são 100% online e ao vivo e seguem uma metodologia estruturada, com foco no desenvolvimento da fluência e na comunicação prática. Cada encontro é planejado para ser dinâmico, interativo e direcionado às suas necessidades no idioma.\n\nOfereço tanto aulas individuais quanto pequenas turmas, com número reduzido de no máximo 10 alunos, garantindo um acompanhamento de qualidade em ambos os formatos.\n\nAulas em grupo: têm duração de 1h40, uma vez por semana.\n\nAulas individuais: a duração é flexível e definida de acordo com o combinado entre professor e aluno, conforme a necessidade e disponibilidade de cada um.',
  },
  {
    q: 'Qual é o material e o que está incluso?',
    a: "Utilizamos um material completo, estruturado para proporcionar uma jornada de aprendizado clara, prática e eficiente, alinhada ao CEFR (Quadro Europeu Comum de Referência para Línguas). O conteúdo é organizado em módulos, com unidades focadas em vocabulário, gramática, leitura, compreensão auditiva, conversação e escrita, além de warm-ups e atividades interativas para tornar o aprendizado dinâmico e envolvente.\n\nO material é 100% digital, pensado para que você possa acessá-lo facilmente de qualquer dispositivo — computador, tablet ou celular —, e também pode ser impresso para facilitar seus estudos.\n\nO custo é de R$137,00 por módulo, podendo ser pago à vista no ato da matrícula ou parcelado ao longo dos 6 meses do módulo, junto com as mensalidades.\n\nO pacote completo inclui:\n\n• Student's Book (apostila principal em PDF)\n• Student's Homework (apostila de exercícios em PDF)\n• Apostila de Games (atividades lúdicas em PDF)\n• Pasta com todos os áudios das atividades e lições\n• Slides das aulas (bônus exclusivo para reforçar o conteúdo visual)\n• Cronograma semanal de estudos (para te ajudar a se organizar e manter a consistência)\n• Acesso ao aplicativo de games e revisão, para praticar de forma leve e divertida, onde e quando quiser.",
  },
  {
    q: 'E se eu faltar ou tiver dúvidas fora da aula?',
    a: 'Se você faltar, não perde o conteúdo! Você recebe:\n\n• A gravação da aula\n• Um resumo escrito dos principais pontos abordados\n• A transcrição do chat da aula, com tudo o que foi compartilhado e conversado.\n\nSim! Ofereço suporte via WhatsApp durante a semana para tirar dúvidas rápidas, enviar áudios, orientações e acompanhar seu progresso entre as aulas.',
  },
  {
    q: 'Em quanto tempo eu fico fluente? Existe certificado?',
    a: 'O tempo para alcançar fluência depende de fatores como frequência de estudo, dedicação, prática fora das aulas e seu objetivo específico. Meu compromisso é te guiar nesse caminho, com clareza sobre seus avanços desde o primeiro dia.\n\nSim! Ao concluir o curso, você recebe um certificado oficial que comprova sua dedicação e o domínio do conteúdo aprendido. Além disso, acompanho seu progresso com relatórios detalhados para garantir que você está sempre evoluindo.',
  },
  { q: 'Tem taxa de matrícula?', a: 'Não. Aqui você não paga matrícula!' },
]
