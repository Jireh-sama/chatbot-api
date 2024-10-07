import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "module",
      globals: {
        ...globals.node,
        CustomError: "readonly",
      }
    } 
  },
  pluginJs.configs.recommended,
];
