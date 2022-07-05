// destructuring connect and connection from mongoose
const { connect, connection } = require('mongoose');

//connection config to connect to hosted mongo in atlas or to local
const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/socialNetDB';

//Establishing connection using connection string
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;