# Schema Evolution

## Introduction
After learning about how to mutate data in Relay, we will now focus on a completely different topic: schema evolution. 
What do you do when you need to change your schema?

## Learning Objectives
In this lesson, you will learn how to:
- Setup the schema registry
- Understand the schema registry

## Preparation
In this chapter, you will need to install the dotnet tool [Barista](https://www.nuget.org/packages/Barista).

```bash
dotnet tool install -g Barista
```

Additionally, ensure you have access to an organization on [Banana Cake Pop](https://eat.bananancakepop.com/). You can use either your personal organization or the one provided for the workshop. If you're using the workshop organization, please create a subfolder with your name.

## Why do "schema breaks" happen?
The GraphQL schema is a the most important artifact of your GraphQL API, as it outlines the contract between the client and the server.

Modern applications often have to multiple consumers, such as web and mobile apps. Over time, it's natural for the schema to evolve as you add features and refine your application. This evolution changes the client-server contract.

If this would contract break that would be terrible. Unfortunately, it's easy to inadvertently break this contract, even with good intentions, like correcting a typo, which could unexpectedly disrupt a client.

## Why do we need a schema registry?
While storing your schema in a file and checking it into version control is recommended (and we do recommend it), it's essential to manually verify the schema's validity because changes to GraphQL can be complex. These changes typically fall into three categories:

- **Breaking Changes**: These are changes that disrupt the client-server contract, such as removing a field.
- **Non-Breaking Changes**: These changes do not disrupt the contract, like adding a new field.
- **Dangerous Changes**: These are modifications that might not break the contract but could pose risks, such as adding a member to an enum.

The schema registry acts as a central repository for your API's schema. 
Every schema that's uploaded is preserved, for effective version management and ensuring the integrity of client-server interactions over time.

### Integrating Schema Updates into CI Pipelines
During the CI pipeline process, a snapshot of your API schema is taken and sent to the registry. 
The registry then processes this schema, validating it against predefined rules. 
Upon successful validation, a detailed report of any changes is generated. 
This ensures that any updates to the schema are thoroughly reviewed before deployment.

### Schema Deployment and Versioning
When you tag your application for a new release, the updated schema is uploaded to the registry and tagged accordingly. 
This tagging mechanism supports different versions across multiple stages of your application lifecycle.

### Schema Management Across Environments
It's common to first deploy an application to a development environment, followed by a production deployment once stability and functionality are confirmed. 
Each environment can operate with a different active schema.

Before deploying your application to any stage, the corresponding schema is published and marked as active for that stage. 
This means that the version history and change logs can differ between stages, reflecting the unique deployment and testing processes of each environment.

## Setting up the Schema Registry

### Step 1: Create an Api in Banana Cake Pop 
Right click on a folder in BCP and create a new API.

### Step 2: Create a stage
You can just press the `Use Default` button on any of the api tabs.

### Step 3: Export the Schema  
Run the following command in the `Catalog.API`
```bash
dotnet run -- schema export 
```

### Step 4: Upload the Schema
First we upload the schema to the registry. 
```bash
barista schema upload --api-id <<api-id>>  --tag 0.0.1 --schema-file ./schema.graphql
```

### Step 5: Publish the Schema
```bash
barista schema publish --api-id <<api-id>>  --tag 0.0.1 --stage dev
```

### Task
1. Follow the steps outlined in this lesson and setup the schema registry for your API
1. Try to create a beaking change and try to publish it?
