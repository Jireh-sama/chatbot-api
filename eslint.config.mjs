import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
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
            ["@validators", "./src/validators/"],
            ["@controllers", "./src/nlp/controllers/"],
          ],
          extensions: [".js", ".mjs", ".json"],
        },
      },
    },
  },
];
