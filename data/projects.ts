import { mediaImages } from "./media";

export type Project = {
  id: string;
  name: string;
  category: "residencial" | "comercial";
  description: string;
  image: string;
  video?: string;
};

export const projects: Project[] = [
  {
    id: "sala-premium",
    name: "Sala com acabamento uniforme",
    category: "residencial",
    description:
      "Preparo completo das paredes e pintura com acabamento limpo, sem marcas de rolo.",
    image: mediaImages.salaResidencial,
    video: "/media/acabamento-1.mp4",
  },
  {
    id: "quarto-acolhedor",
    name: "Quarto com cor e conforto",
    category: "residencial",
    description:
      "Escolha de tom e aplicação cuidadosa para um ambiente mais aconchegante.",
    image: mediaImages.quartoSuave,
    video: "/media/acabamento-2.mp4",
  },
  {
    id: "fachada-comercial",
    name: "Fachada que chama atenção",
    category: "comercial",
    description:
      "Renovação visual para destacar o ponto comercial e reforçar a presença da marca.",
    image: mediaImages.fachadaComercial,
    video: "/media/acabamento-3.mp4",
  },
  {
    id: "escritorio-limpo",
    name: "Escritório com visual profissional",
    category: "comercial",
    description:
      "Pintura comercial organizada, com prazo e acabamento alinhados ao dia a dia da empresa.",
    image: mediaImages.escritorio,
    video: "/media/hero.mp4",
  },
];
