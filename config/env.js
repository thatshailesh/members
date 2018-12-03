module.exports = {
  dev: {
    jwtSecret: process.env.SECRET || 'crud',
    refreshtokenExpiresIn: 3600,
    accessTokenExpiresIn: 300,
  },
  prod: {},
  test: {
    jwtSecret: process.env.SECRET || 'crud_test',
    refreshtokenExpiresIn: 3600,
    accessTokenExpiresIn: 300,
  },
};
