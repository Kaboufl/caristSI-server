import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT ?? "3306"),
});

export const query = async <T>(queryString: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results as T);
      }
    });
  });
};
