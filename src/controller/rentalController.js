import connection from "../database/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    let filter;
    const query = [];

    if (customerId && gameId) {
      filter = 'WHERE "customerId" = $1 AND "gameId" = $2';
      query.push(customerId, gameId);
    } else if (customerId) {
      filter = 'WHERE "customerId" = $1';
      query.push(customerId);
    } else if (gameId) {
      filter = 'WHERE "gameId" = $1';
      query.push(gameId);
    } else {
      filter = "";
    }

    const { rows: rentals } = await connection.query(
      `
      SELECT rentals.*,
      json_build_object('id', customers.id, 'name', customers.name) AS customer,
      json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game
      FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
      JOIN categories ON games."categoryId" = categories.id
      ${filter}
      `,
      query
    );

    res.status(200).send(rentals);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createRental(req, res) {
  try {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format("YYYY-MM-DD");

    const { pricePerDay } = res.locals;

    const originalPrice = pricePerDay * daysRented;

    await connection.query(
      `
    INSERT INTO rentals
    ("customerId",
    "gameId","rentDate", "daysRented", "returnDate", "originalPrice","delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function finalizeRental(req, res) {
  const { id } = req.params;
  try {
    const { rows: rental } = await connection.query(
      ` SELECT * FROM rentals WHERE id = $1;`,
      [id]
    );

    const { rows: game } = await connection.query(
      `SELECT * FROM games WHERE id = $1`,
      [rental[0].gameId]
    );

    if (rental.length === 0) {
      return res.sendStatus(404);
    }

    if (rental[0].returnDate !== null) {
      return res.sendStatus(400);
    }

    const delayFee = dayjs().diff(rental[0].rentDate, "day");

    await connection.query(
      `
                UPDATE rentals 
                SET "returnDate" = $1, "delayFee" = $2
                WHERE id = $3
            `,
      [dayjs().format("YYYY-MM-DD"), delayFee * game[0].pricePerDay, id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export default async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const { rows: rental } = await connection.query(
      `
      SELECT * FROM rentals WHERE id = $1
      `,
      [id]
    );

    if (rental.length === 0) {
      return res.sendStatus(404);
    }

    if (rental[0].returnDate === null) {
      return res.status(400).send("Devolve ai pô! :P");
    }

    await connection.query(
      `
      DELETE FROM rentals WHERE id = $1
      `,
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
