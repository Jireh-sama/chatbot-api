import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  // Add this section for path alias support
  {
    overrides: [
      {
        files: ["tests/**/*"],
        env: {
          jest: true,
        },
      },
    ],
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@", "."],
            ["@knowledge", "./src/knowledge/"],
            ["@nlp", "./src/nlp/"],
            ["@controllers", "./src/nlp/controllers/"],
          ],
          extensions: [".js", ".mjs", ".json"], // Add other extensions if necessary
        },
      },
    },
  },
];
