import getEnvVars from "./environment";
const { apiUrl } = getEnvVars();

module.exports = {
  fitpet: {
    input: {
      target: apiUrl + "/api-docs-json",
    },
    output: {
      mode: "tags-split",
      target: "./src/api/endpoints",
      schemas: "./src/api/schemas",
      client: "react-query",
      mock: true,
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/mutator/customAxios.ts",
          name: "customAxios",
        },
        query: {
          useQuery: true,
          useInfinite: true,
        },
      },
    },
  },
};
