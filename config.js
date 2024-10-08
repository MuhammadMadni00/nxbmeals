const config = {
    development: {
      apiUrl: 'http://localhost:5000/',
    },
    production: {
      apiUrl: 'https://66c4-116-58-42-68.ngrok-free.app/',
    },
  };
  
  const currentEnv = process.env.NODE_ENV || 'development';
  module.exports = config[currentEnv];
  