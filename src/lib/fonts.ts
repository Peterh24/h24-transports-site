import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Expressway — police de marque H24, réservée aux TITRES et aux grands chiffres
 * (`var(--font-display)` en CSS). Elle n'est plus utilisée pour le texte
 * courant, la navigation ni les boutons : en petit corps ses lettres étroites
 * et fermées rendaient les paragraphes illisibles.
 */
export const expressway = localFont({
  src: [
    { path: "../fonts/ExpresswayBk.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ExpresswaySb.woff2", weight: "600", style: "normal" },
    { path: "../fonts/ExpresswayRg-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/ExpresswayXb.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-expressway",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

/**
 * JetBrains Mono — détails techniques / labels / chiffres tabulaires.
 * Exposée en CSS sous `var(--font-mono)`.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Inter — tout sauf les titres : texte courant, navigation, boutons, libellés,
 * formulaires (`var(--font-ui)` et `var(--font-body)` en CSS).
 * Exposée en CSS sous `var(--font-inter)`.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});
