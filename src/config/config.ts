export const config = {
  dev: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: "postgres",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  },
};
