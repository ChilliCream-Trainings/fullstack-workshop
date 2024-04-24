module.exports = {
  schema: "schema/schema.docs.graphql",
  schemaExtensions: ["schema"],
  src: "app",
  eagerEsModules: true,
  language: "typescript",
  exclude: ["**/node_modules/**", "**/mocks/**"],
};
