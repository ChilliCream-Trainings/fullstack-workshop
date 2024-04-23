module.exports = {
  schema: "schema/schema.docs.graphql",
  schemaExtensions: ["schema"],
  src: "app",
  eagerEsModules: true,
  noFutureProofEnums: true,
  language: "typescript",
};
