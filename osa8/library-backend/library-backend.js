const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const typeDefs = require('./typeDefs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Author = require('./models/author.model');
const Book = require('./models/book.model');
const User = require('./models/user.model');
let { authors, books } = require('./data');

const MONGODB_URI =
  'mongodb+srv://fullstack:asdfasdf@librarytms.bqjzd.mongodb.net/librarytms?retryWrites=true&w=majority';

const JWT_SECRET = 'ok';

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
    bookCount: () => {
      try {
        return Book.find({}).length;
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },

    authorCount: async () => {
      try {
        const authors = await Author.find({});
        return authors.length;
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },

    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate(
          'author'
        );
        return books.filter((book) => {
          if (book.author) {
            return book.author.name === args.author;
          }
        });
      } else if (args.author) {
        const books = await Book.find({}).populate('author');
        return books.filter((book) => {
          if (book.author) {
            return book.author.name === args.author;
          }
        });
      } else if (args.genre) {
        return Book.find({ genres: { $in: args.genre } });
      }

      return Book.find({}).populate('author');
    },

    me: (context) => {
      return context.currentUser;
    },

    allAuthors: () => {
      try {
        return Author.find({});
      } catch (err) {
        throw new UserInputError(err.message);
      }
    },
  },

  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
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

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      if (!args.setBornTo) {
        throw new UserInputError('Born time needed');
      }

      const authorToEdit = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      ).catch((err) => {
        throw new UserInputError(err.message, { invalidArgs: args });
      });

      console.log(authorToEdit);

      return authorToEdit;
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('Wrong credentials');
      }

      const userForToken = { username: user.username, id: user._id };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
