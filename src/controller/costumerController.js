import connection from "../database/db.js";

export async function getCostumers(req, res) {
  try {
    const { rows: costumers } = await connection.query(
      "SELECT * FROM costumers;"
    );

    res.status(200).send(costumers);
  } catch (error) {
    console.error(error);
  }
}

export async function createCostumer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await connection.query(
      `INSERT INTO games (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [name, phone, cpf, birthday]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
  }
}
