import { mediaImages } from "./media";

export type VideoItem = {
  id: string;
  title: string;
  src: string;
  poster?: string;
};

export const videos: VideoItem[] = [
  {
    id: "hero-trabalho",
    title: "Detalhe do acabamento",
    src: "/media/hero.mp4",
    poster: mediaImages.heroPoster,
  },
  {
    id: "acabamento-parede",
    title: "Acabamento de parede",
    src: "/media/acabamento-1.mp4",
    poster: mediaImages.posterAcabamento,
  },
  {
    id: "aplicacao-tinta",
    title: "Aplicação profissional",
    src: "/media/acabamento-2.mp4",
    poster: mediaImages.posterAplicacao,
  },
  {
    id: "resultado-final",
    title: "Resultado final",
    src: "/media/acabamento-3.mp4",
    poster: mediaImages.posterResultado,
  },
];
