# First Server

In this lesson, we will create our first GraphQL server using Hot Chocolate.

First, let's go to the lesson directory.

```bash
cd src/Chapter1/Lesson2/Begin
```

This directory is actually completely empty since we will start from scratch.

Next, we will install the Hot Chocolate templates for .NET.

```bash
dotnet new -i HotChocolate.Templates::14.0.0-p.106
```

You should now see the Hot Chocolate templates listed in the console output.

Now that we have the Hot Chocolate templates installed, we can create a new project using the Hot Chocolate GraphQL template.

```bash
dotnet new graphql
```

This will create a new project with the following structure:

```plaintext
.
├── Begin.csproj
├── Program.cs
└── Types
    ├── Author.cs
    ├── Book.cs
    └── Query.cs
```

Start the server by running the following command:

```bash
dotnet run
```

By default, the GraphQL server will listen on port 5000. According to the GraphQL over HTTP spec, a GraphQL server will by default listen on the `/graphql` endpoint. Open your web browser and enter the following address: `http://localhost:5095/graphql/`

## Tasks

1. Explore the schema in the Schema Reference tab.
2. Query the `book` field on the `Query` type.
3. Add an address object and expose it on the `Author` type.
4. Query the address of the author.
