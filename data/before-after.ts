import { mediaImages } from "./media";

export type BeforeAfterItem = {
  id: string;
  label: string;
  before: string;
  after: string;
};

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: "transformacao-ambiente",
    label: "Transformação de ambiente",
    before: mediaImages.antesAmbiente,
    after: mediaImages.depoisAmbiente,
  },
];
