import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Le contenu est en français : apostrophes et guillemets dans le JSX sont attendus.
      "react/no-unescaped-entities": "off",
      // Le motif "// label" (ex. "// 01", "// IMAGE") fait partie de l'identité visuelle
      // technique du site — ce ne sont pas des commentaires JS égarés.
      "react/jsx-no-comment-textnodes": "off",
    },
  },
];

export default eslintConfig;
