export type Udhetim = {
  id: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  vendtakimi: string;
  vende: number;
  shoferi: string;
  vetura: string;
};

export const udhetimet: Udhetim[] = [
  {
    id: "1",
    nisja: "Prishtinë",
    destinacioni: "Kampusi AAB",
    ora: "08:00",
    vendtakimi: "Biblioteka Kombëtare",
    vende: 2,
    shoferi: "Arta K.",
    vetura: "Toyota Yaris",
  },
  {
    id: "2",
    nisja: "Fushë Kosovë",
    destinacioni: "Kampusi AAB",
    ora: "08:15",
    vendtakimi: "Stacioni i trenit",
    vende: 1,
    shoferi: "Luan M.",
    vetura: "Volkswagen Golf",
  },
  {
    id: "3",
    nisja: "Lipjan",
    destinacioni: "Kampusi AAB",
    ora: "07:45",
    vendtakimi: "Sheshi i qytetit",
    vende: 0,
    shoferi: "Drita B.",
    vetura: "Škoda Fabia",
  },
];

export function gjejUdhetimin(id: string): Udhetim | undefined {
  return udhetimet.find((udhetim) => udhetim.id === id);
}
