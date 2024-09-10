import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    settings: {
      "import/resolver": {
        alias: {
          map: [
            ["@", "."],
            ["@knowledge", "./src/knowledge/"],
            ["@entities", "./src/entities/KnowledgeEntry.js"],
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
