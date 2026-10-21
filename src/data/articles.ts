export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string | null;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  readingTime: number;
  content: { id: string; heading: string; text: string }[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
}
const examples = [
  {
    slug: "documentos-do-imovel",
    title: "Seu imóvel tem uma história. Os documentos ajudam a contá-la.",
    category: "Direito Imobiliário",
    excerpt:
      "Um ponto de partida para organizar informações sobre um imóvel antes de buscar orientação.",
    sections: [
      [
        "O primeiro passo é organizar",
        "Contratos, comprovantes e registros podem ajudar a contextualizar a história de um imóvel. Organizar o que já está disponível facilita a apresentação inicial da situação.",
      ],
      [
        "Cada documento tem um contexto",
        "Documentos diferentes registram informações distintas. Este exemplo editorial não avalia a validade de qualquer documento nem apresenta requisitos para regularização.",
      ],
      [
        "A importância da análise individual",
        "A orientação sobre uma situação concreta exige avaliação profissional. Não há resultado ou prazo garantido a partir de uma lista genérica de documentos.",
      ],
    ],
  },
  {
    slug: "leitura-cuidadosa-dos-contratos",
    title: "Antes da assinatura, espaço para uma leitura cuidadosa.",
    category: "Direito Contratual",
    excerpt:
      "Por que reservar tempo para compreender um documento e registrar suas dúvidas.",
    sections: [
      [
        "Leia com atenção",
        "Uma leitura organizada começa pela identificação das partes, do objeto e das condições descritas no documento. Anote trechos que não estejam claros.",
      ],
      [
        "Transforme dúvidas em perguntas",
        "Prazos, responsabilidades e condições de encerramento merecem compreensão. Este texto é uma demonstração editorial e não substitui a análise do documento.",
      ],
      [
        "Busque orientação contextualizada",
        "A avaliação profissional considera o texto completo e a situação das pessoas envolvidas. Não assuma que modelos prontos se aplicam a qualquer relação.",
      ],
    ],
  },
  {
    slug: "preparar-primeiro-atendimento",
    title: "Uma boa conversa começa com as perguntas certas.",
    category: "Orientação jurídica",
    excerpt:
      "Como organizar o relato da sua situação para um primeiro atendimento jurídico.",
    sections: [
      [
        "Organize a sequência dos fatos",
        "Uma breve linha do tempo pode ajudar a apresentar o contexto com clareza. Registre datas e fatos, diferenciando o que sabe daquilo que precisa confirmar.",
      ],
      [
        "Preserve as informações sensíveis",
        "No contato inicial, compartilhe apenas o necessário para identificar o assunto. Combine um meio adequado antes de enviar documentos pessoais.",
      ],
      [
        "Converse sobre os próximos passos",
        "O primeiro contato permite compreender a demanda e esclarecer como funciona o atendimento. Este exemplo não representa uma promessa de contratação ou resultado.",
      ],
    ],
  },
];
export const articles: Article[] = examples.map((a, i) => ({
  id: String(i + 1),
  slug: a.slug,
  title: a.title,
  excerpt: a.excerpt,
  category: a.category,
  author: null,
  publishedAt: "2026-10-21",
  updatedAt: "2026-10-21",
  coverImage: `/images/editorial-${i + 1}.svg`,
  readingTime: 2,
  content: a.sections.map(([heading, text], j) => ({
    id: `secao-${j + 1}`,
    heading,
    text,
  })),
  seoTitle: a.title,
  seoDescription: a.excerpt,
  featured: i === 0,
}));
