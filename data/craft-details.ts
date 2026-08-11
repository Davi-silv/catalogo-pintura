import { mediaImages } from "./media";

export type CraftDetail = {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
};

/** Etapas e práticas reais da pintura profissional */
export const craftDetails: CraftDetail[] = [
  {
    id: "preparo-superficie",
    title: "Preparo da superfície",
    description:
      "Lixamento, correção de buracos e imperfeições. Sem preparo bom, o acabamento não fica uniforme.",
    image: mediaImages.preparoSuperficie,
    video: "/media/acabamento-1.mp4",
  },
  {
    id: "protecao-ambiente",
    title: "Proteção do ambiente",
    description:
      "Fita crepe, lonas e cuidado com piso, rodapé e móveis — para pintar sem sujar o que já está pronto.",
    image: mediaImages.protecaoAmbiente,
  },
  {
    id: "aplicacao-demao",
    title: "Aplicação com rolo",
    description:
      "Demãos bem distribuídas, sem marcas e com cobertura correta da tinta na parede.",
    image: mediaImages.aplicacaoRolo,
    video: "/media/hero.mp4",
  },
  {
    id: "acabamento-cantos",
    title: "Cantos e acabamento fino",
    description:
      "Pincel nos detalhes, encontros de parede e molduras — onde a diferença profissional aparece.",
    image: mediaImages.acabamentoCantos,
    video: "/media/acabamento-2.mp4",
  },
  {
    id: "materiais-tinta",
    title: "Tinta e material certo",
    description:
      "Escolha de tinta e acabamento (fosco, acetinado ou semibrilho) de acordo com o ambiente.",
    image: mediaImages.tintasMateriais,
  },
  {
    id: "revisao-entrega",
    title: "Revisão e entrega limpa",
    description:
      "Checagem de falhas, retoques finais e retirada da proteção — ambiente pronto para usar.",
    image: mediaImages.revisaoFinal,
    video: "/media/acabamento-3.mp4",
  },
];
