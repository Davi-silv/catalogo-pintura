import { mediaImages } from "./media";

export type Service = {
  id: string;
  name: string;
  ctaContext: "residential" | "commercial";
  problem: string;
  outcome: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "pintura-residencial",
    name: "Pintura residencial",
    ctaContext: "residential",
    problem: "Ambiente cansado, manchas ou cor desatualizada.",
    outcome: "Casa renovada, limpa e com acabamento durável.",
    image: mediaImages.servicoResidencial,
  },
  {
    id: "pintura-comercial",
    name: "Pintura comercial",
    ctaContext: "commercial",
    problem: "Espaço sem presença visual ou com aspecto desgastado.",
    outcome: "Fachada e interiores com visual profissional.",
    image: mediaImages.servicoComercial,
  },
];
