import connection from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const { rows: categories } = await connection.query(
      "SELECT * FROM categories"
    );

    res.status(200).send(categories);
  } catch (error) {
    console.error(error);
  }
}

export async function createCategory(req, res) {
  const { name } = req.body;

  try {
    await connection.query(`INSERT INTO categories (name) VALUES ('${name}')`);

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
  }
}
