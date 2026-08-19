/** Flotte : quatre formats de véhicules avec leurs caractéristiques. */

export type Vehicle = {
  size: string;
  length: string;
  height: string;
  payload: string;
  tail: string;
  /** Vidéo du véhicule (rotation 360°) — fond sombre, sans audio. */
  video: string;
  /** Image poster affichée avant lecture. */
  poster: string;
  /** Chiffre géant en filigrane derrière le véhicule (volume). */
  figure: string;
  /** Échelle du décor (halo + chiffre) — plus grand = plus imposant. */
  stageScale: number;
};

export const VEHICLES: Vehicle[] = [
  {
    size: "20m³",
    length: "6,8m",
    height: "3,4m",
    payload: "700 kg",
    tail: "inclus",
    video: "/images/flotte/truck-20m3.mp4",
    poster: "/images/flotte/truck-20m3.jpg",
    figure: "20",
    stageScale: 1,
  },
  {
    size: "12-14m³",
    length: "6,8m",
    height: "2,6m",
    payload: "1300 kg",
    tail: "inclus",
    video: "/images/flotte/truck-14m3.mp4",
    poster: "/images/flotte/truck-14m3.jpg",
    figure: "14",
    stageScale: 0.9,
  },
  {
    size: "6-8m³",
    length: "4,9m",
    height: "1,9m",
    payload: "820 kg",
    tail: "—",
    video: "/images/flotte/truck-6m3.mp4",
    poster: "/images/flotte/truck-6m3.jpg",
    figure: "8",
    stageScale: 0.76,
  },
  {
    size: "3m³",
    length: "4,5m",
    height: "1,85m",
    payload: "415 kg",
    tail: "—",
    video: "/images/flotte/truck-3m3.mp4",
    poster: "/images/flotte/truck-3m3.jpg",
    figure: "3",
    stageScale: 0.62,
  },
];
