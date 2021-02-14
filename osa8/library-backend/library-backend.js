const { ApolloServer, gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');
let { authors, books } = require('./data');

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String, setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,

    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.genres.includes(args.genre) && book.author === args.author
        );
      } else if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }
      return books;
    },

    allAuthors: () => authors,
  },

  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuidv4() };
      books = books.concat(book);

      if (!authors.some((a) => a.name === args.author)) {
        authors.push({ name: args.author, born: null, id: uuidv4() });
      }

      return book;
    },

    editAuthor: (root, args) => {
      if (!authors.some((a) => a.name === args.name) || !args.setBornTo) {
        return null;
      }

      const authorToEdit = authors.filter(
        (author) => author.name === args.name
      )[0];
      const index = authors.indexOf(authorToEdit);
      authorToEdit.born = args.setBornTo;
      authors[index] = authorToEdit;
      return authorToEdit;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
