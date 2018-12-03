const mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

process.env.DATABASE_URL = 'mongodb://localhost:27017/crud';

const establishConn = async () => {
  await mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, replicaSet: 'rs' }
  );
};

establishConn();
