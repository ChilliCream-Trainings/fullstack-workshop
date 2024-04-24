module.exports = {
  schema: "schema/schema.docs.graphql",
  schemaExtensions: ["schema"],
  src: "app",
  eagerEsModules: true,
  language: "typescript",
  exclude: ["**/node_modules/**", "**/mocks/**"],
  persistConfig: {
    file: "./persisted_queries.json", // this file HAS to exist (even when it's empty)
    algorithm: "MD5" // this can be one of MD5, SHA256, SHA1
  }
};
