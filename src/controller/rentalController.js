import connection from "../database/db.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  try {
    //const { rows: rentals } = await connection.query("SELECT * FROM rentals;");

    const { rows: rentals } = await connection.query(
      `
      
      `
    );

    res.status(200).send(rentals);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export async function createReantal(req, res) {
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
