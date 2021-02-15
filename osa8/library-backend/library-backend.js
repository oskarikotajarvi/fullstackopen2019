const { ApolloServer, UserInputError } = require('apollo-server');
const typeDefs = require('./typeDefs');
const mongoose = require('mongoose');
const Author = require('./models/author.model');
const Book = require('./models/book.model');
let { authors, books } = require('./data');

const MONGODB_URI =
  'mongodb+srv://fullstack:asdfasdf@librarytms.bqjzd.mongodb.net/librarytms?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).length,

    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },

    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.genres.includes(args.genre) && book.author === args.author
        );
      } else if (args.author) {
        return books.filter((book) => book.author === args.author);
      } else if (args.genre) {
        return Book.find({ genres: { $in: args.genre } });
      }

      return Book.find({});
    },

    allAuthors: () => Author.find({}),
  },

  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },

  Mutation: {
    addBook: async (root, args) => {
      let newBook = null;
      let newAuthor = null;
      const author = await Author.findOne({ name: args.author });

      if (author === null) {
        newAuthor = new Author({ name: args.author });
        newBook = new Book({ ...args, author: newAuthor._id });
      } else {
        newBook = new Book({ ...args, author: author._id });
      }

      try {
        if (newAuthor) {
          await newAuthor.save();
        }
        await newBook.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      return newBook;
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
