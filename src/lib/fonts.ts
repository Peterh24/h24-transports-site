import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

/**
 * Expressway — police de marque H24 (4 graisses), auto-hébergée via next/font/local.
 * Exposée en CSS sous `var(--font-expressway)`.
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
