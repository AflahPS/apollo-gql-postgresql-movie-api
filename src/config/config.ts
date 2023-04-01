export const config = {
    "dev": {
      "username": 'postgres',
      "password":  'postgres',
      "database":   'postgres',
      "host": 'localhost',
      "port": 5432,
      "dialect": "postgres",
    },
    "jwt":{
      "secret": process.env.JWT_SECTRET
    }
  };
