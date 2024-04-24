# Relay Skeleton

## Introduction
In the last lesson, we have optimized out queries by using prefetching. Now that we have seen and used so many features of Relay, it is time to understand a few more concepts.

## Learning Objectives
By the end of this lesson, you will be able to:
- Understand the Relay Environment and how it is used in the application
- Understand the network layer and how to customize it
- You know the `relay.config.js` file

## Preparation

Continue directly from where we left off in the last lesson or start fresh with the initial setup in the `src/Chapter7/Lesson3/Begin` folder.

Run `npm install` in the `src/Chapter7/Lesson3/Begin/` folder to install the necessary packages.


## Recap

:::info[Solutions from the last lesson]

1. -
2. Yes, in fact, it can be done by using the same pattern. 
3. In the best case, everything should be preloaded. 
4. We fetch the main chunk of the application initially with all the queries, though we really only need the ones of the current page

:::

From the beginning of this workshop, we have been using relay hooks to fetch data and everything has magically worked.
There are a few things in the background that we have not yet looked at. In this lesson, we will look at the Relay Environment and the network layer.

## Relay Environment
Everytime we used `useLazyQuery`, relay was fetching data and storing it in the relay store. 
The relay store is managed by the Relay Environment. The environment is a singleton instance that holds the configuration for the network layer, store, and other settings. 
It is the central place where all the relay magic happens.

You can access the relay environment by using the `useRelayEnvironment` hook.

You do not need to use `useLazyQuery` , `useMutation` or any other hooks to interact with the environment.
On the environment you can execute queries, mutations directly and you can even manually write to the store or subscribe to changes.

The relay environment is passed down through the component hirearchy via the `RelayEnvironmentProvider`. 
This provider usually sits near the root of the application, but you can also have multiple environments in your application. Not that you should, but you could.

The relay environment is created by us and then passed into the `RelayEnvironmentProvider`. To create the environment, we need to create a network layer and a store. The `createEnvironment` function in `relay-network.ts` demonstrates how to create an environment. This is also the place where the relay store is created and can be customized.

## Network Layer
Relay is network agnostic, meaning that you can use any network library you want. 
There is no default network layer, you always have to implement it yourself.
But do not worry, the simplest network layer is just a fetch function. 

In the relay network you can fully cutomize how you request is composed and how it is sent to the server. 
In the fetch function you can add headers, change the method, add authentication and so on. 
You can also implement caching, retries, and other features like service workers, offline support and so on.

The fetch function of the network, returns an observable.  This observable is a stream of data that you can subscribe to for each request.  
The second parameter of the `Network.create` function is the subscribe function that is used for subscriptions.

A simple fetch function could look like this:

```js
function fetchFunction(params, variables) {
  const response = fetch("http://my-graphql/api", {
    method: "POST",
    headers: [["Content-Type", "application/json"]],
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return Observable.from(response.then((data) => data.json()));
};

/**
 * Creates a new Relay environment instance for managing (fetching, storing) GraphQL data.
 */
function createEnvironment() {
  const network = Network.create(fetchFunction);
  const store = new Store(new RecordSource());
  return new Environment({ store, network });
}

const environment = createEnvironment();

function Root() {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <App />
    </RelayEnvironmentProvider>
  );
}
```

## Relay Config
The Relay compiler requires specific information to function correctly, such as the location of the schema, how to generate the types, and where to store the generated files.

You can specify these settings in the `relay.config.js` file.

A basic configuration file for Relay might look like this:

```js
// relay.config.js
module.exports = {
  // point to the source folder
  src: "./src", 
  // "javascript" | "typescript" | "flow"
  language: "javascript", 
  // the schema file
  schema: "./data/schema.graphql", 
  // exclude folders
  excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"], 
}
```

## Tasks
1. Checkout the `src/relay-network.ts` file and understand how the relay environment is created
1. Our backend needs a header with the client version. Add this header to each request to the server.




