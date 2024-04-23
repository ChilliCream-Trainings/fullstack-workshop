# Query Patterns

In this chapter we will focus on GraphQL query patterns. We will start by discussing the Relay server specification, which is a set of conventions that Relay uses to communicate with a GraphQL server. The relay specification is Facbooks view on evolvable and scalable GraphQL schemas and has become the de facto standard in the GraphQL community. Apart from the relay specifications we will have a look at GraphQL error handling, non-nullability and domain errors in queries.

## Relay Specification

There are three main specification documents for relay that describe the expectations relay has for a GraphQL server. These are:

- [Connections](specs/Connections)
- [Global Object Identification](specs/ObjectIdentification)
- [Mutations](specs/Mutations)
