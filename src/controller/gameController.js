import connection from "../database/db.js";

export async function getGames(req, res) {
  const { name } = req.query;

  try {
    // const { rows: games } = await connection.query("SELECT * FROM games");

    const { rows: games } = name
      ? await connection.query(
          `
      SELECT games.*, categories.name AS "categoryName"
      FROM games JOIN categories
      ON "categoryId" = categories.id
      WHERE LOWER(games.name) LIKE LOWER($1)
      `,
          [`${name}%`]
        )
      : await connection.query("SELECT * FROM games");

    res.status(200).send(games);
  } catch (error) {
    console.error(error);
  }
}

export async function createGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  try {
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
  }
}
