export interface PracticeArea {
  slug: string;
  title: string;
  description: string;
  topics: string[];
  confirmed: boolean;
}
export const practiceAreas: PracticeArea[] = [
  {
    slug: "direito-imobiliario",
    title: "Direito Imobiliário",
    description:
      "Um olhar cuidadoso sobre os imóveis e as relações que se constroem ao redor deles.",
    topics: [
      "Regularização de imóveis",
      "Usucapião",
      "Posse e propriedade",
      "Relações imobiliárias",
    ],
    confirmed: true,
  },
  {
    slug: "direito-civil",
    title: "Direito Civil",
    description:
      "Informação e orientação sobre as relações e responsabilidades da vida cotidiana.",
    topics: [
      "Responsabilidade civil",
      "Obrigações",
      "Direitos da personalidade",
    ],
    confirmed: false,
  },
  {
    slug: "familia-e-sucessoes",
    title: "Família e Sucessões",
    description:
      "Sensibilidade para compreender os vínculos familiares e as questões patrimoniais.",
    topics: ["Relações familiares", "Inventários", "Planejamento sucessório"],
    confirmed: false,
  },
  {
    slug: "direito-trabalhista",
    title: "Direito Trabalhista",
    description:
      "Clareza sobre as relações de trabalho e os direitos envolvidos.",
    topics: [
      "Relações de trabalho",
      "Contratos de trabalho",
      "Orientação documental",
    ],
    confirmed: false,
  },
  {
    slug: "direito-empresarial",
    title: "Direito Empresarial",
    description: "Perspectiva jurídica para decisões e relações empresariais.",
    topics: [
      "Relações societárias",
      "Documentos empresariais",
      "Organização de negócios",
    ],
    confirmed: false,
  },
  {
    slug: "direito-do-consumidor",
    title: "Direito do Consumidor",
    description: "Atenção às relações entre consumidores e fornecedores.",
    topics: [
      "Relações de consumo",
      "Contratos de serviços",
      "Informação ao consumidor",
    ],
    confirmed: false,
  },
  {
    slug: "direito-previdenciario",
    title: "Direito Previdenciário",
    description: "Compreensão das questões ligadas à proteção previdenciária.",
    topics: [
      "Histórico contributivo",
      "Documentação",
      "Benefícios previdenciários",
    ],
    confirmed: false,
  },
  {
    slug: "direito-contratual",
    title: "Direito Contratual",
    description:
      "Cuidado com as condições e responsabilidades registradas em cada contrato.",
    topics: ["Análise de contratos", "Obrigações contratuais", "Negociações"],
    confirmed: false,
  },
  {
    slug: "direito-administrativo",
    title: "Direito Administrativo",
    description: "Informação sobre as relações com a administração pública.",
    topics: [
      "Processos administrativos",
      "Atos administrativos",
      "Contratações públicas",
    ],
    confirmed: false,
  },
  {
    slug: "direito-digital",
    title: "Direito Digital",
    description: "Um olhar jurídico sobre relações no ambiente digital.",
    topics: ["Relações digitais", "Privacidade", "Contratos digitais"],
    confirmed: false,
  },
];
