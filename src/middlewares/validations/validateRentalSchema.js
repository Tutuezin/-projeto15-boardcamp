import connection from "../../database/db.js";
import createRentalSchema from "../../schemas/rentalSchema.js";

async function validateRentalSchema(req, res, next) {
  const { customerId, gameId } = req.body;

  //JOI
  const { error } = createRentalSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }

  //VALIDATIONS
  const { rows: customerExists } = await connection.query(
    `
    SELECT * FROM customers WHERE id = $1;
    `,
    [customerId]
  );

  const { rows: gameExists } = await connection.query(
    `
    SELECT * from games WHERE id = $1;
    `,
    [gameId]
  );

  if (gameExists.length === 0 || customerExists.length === 0) {
    return res.status(400).send("Jogo ou cliente nao existe!");
  }

  const { rows: rentals } = await connection.query(
    `
    SELECT * FROM rentals WHERE "gameId" = $1;
    `,
    [gameId]
  );

  if (gameExists[0].stockTotal === rentals.length) {
    res.status(400).send("Jogo alugado");
  }

  res.locals.pricePerDay = gameExists[0].pricePerDay;

  next();
}

export default validateRentalSchema;
