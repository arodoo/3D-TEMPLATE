/**
 * File location: prettier.config.mjs
 * File function:
 * Configuracion de formato de Prettier 3 para todo el repositorio, fijando el
 * ancho de linea en 80 caracteres y la coma final siempre, integrando el plugin
 * de ordenacion de clases de Tailwind CSS para mantener consistente el orden
 * alfabetico de las utilidades en las plantillas.
 * All Rights Reserved arodoo
 */
import * as tailwindcss from "prettier-plugin-tailwindcss";

const config = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  plugins: [tailwindcss],
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
