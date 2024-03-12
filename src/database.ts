import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "esicad-carist-si",
  port: 3306,
});

export const query = async <T>(queryString: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
