export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marina S.",
    role: "Casa em Campos",
    quote:
      "As paredes ficaram impecáveis. Cumpriu o prazo e deixou tudo organizado no final.",
  },
  {
    id: "t2",
    name: "Carlos M.",
    role: "Comércio local",
    quote:
      "A fachada mudou o visual da loja. Clientes já comentaram a diferença.",
  },
  {
    id: "t3",
    name: "Ana P.",
    role: "Apartamento",
    quote:
      "O preparo das paredes fez toda a diferença. Acabamento bem acima do que eu esperava.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: "visita",
    title: "Conversa e orçamento",
    description: "Entendo o ambiente, o prazo e o acabamento que você deseja.",
  },
  {
    id: "preparo",
    title: "Preparo das superfícies",
    description: "Corrijo imperfeições, faço o lixamento e protejo móveis e pisos.",
  },
  {
    id: "execucao",
    title: "Pintura com cuidado",
    description: "Aplicação uniforme, atenção a cantos e detalhes.",
  },
  {
    id: "entrega",
    title: "Entrega limpa",
    description: "Revisão final e ambiente pronto para usar.",
  },
];

export const differentials = [
  "Acabamento limpo e uniforme",
  "Preparo correto antes de pintar",
  "Pontualidade e organização",
  "Orientação de cores",
  "Atendimento direto no WhatsApp",
  "Respeito ao seu espaço",
];
