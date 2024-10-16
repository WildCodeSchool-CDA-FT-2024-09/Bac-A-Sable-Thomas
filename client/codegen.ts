import type { CodegenConfig } from "@graphql-codegen/cli";

// TODO - ENV
const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["./src/schema/*.ts"],
  generates: {
    "./src/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        // This isn't actually needed for refetch queries - have to use the raw query document for a refetch query with variables.
        // "named-operations-object",
      ],
      config: {
        withHooks: true,
      },
    },
  },
  overwrite: true,
};

export default config;
