# Refactoring

In this chapter, we aim to introduce a simple service layer into our API, necessitating a refactor of our existing code to integrate one or more services.

We will cover the following topics in this chapter:

- Root type splitting
- Type extensions
- DataLoader
- Paging in a layered architecture

In this exercise, create one service per entity and transfer the relevant code there. Consider how you can achieve meaningful separation of concerns.

After this exercise, we will discuss the approach and then collaboratively address the challenges that arise.

This exercise has no definitive right or wrong solution. It focuses on understanding the challenges associated with introducing a service layer and exploring potential solutions.

Here are a few general GraphQL rules that you should always follow when building an evolvable and scalable API:

- **YAGNI (You Aren't Gonna Need It)**  
  Keep your API minimal. Expose new fields and use cases only when necessary.
  
- **Completeness**  
  Ensure your API is minimal yet complete, allowing clients to fully achieve their use cases.

- **Domain Knowledge**  
  Do you thoroughly understand the use case? Are there domain experts who could help you design this more effectively?

- **No Implementation Details**  
  Ensure your API is decoupled from internal implementation details (e.g., generated from a database schema, coupled to another API, uses internal naming).

- **Client First**  
  Does your API address a clear client use case? Avoid building APIs without a clear need: have a first client or practice dogfooding.

We will delve deeper into these rules after you have tackled this exercise.

## Tasks

1. Create a service for each entity.
2. Reflect on the separation of concerns. Do you think the separation is meaningful?
3. Identify potential problems with the current approach.
4. Consider whether the changes should reflect back to the schema.
