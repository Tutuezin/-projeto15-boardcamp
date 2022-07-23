import connection from "../../database/db.js";
import createGameSchema from "../../schemas/gameSchema.js";

async function validateGameSchema(req, res, next) {
  const { name, categoryId } = req.body;

  const { error } = createGameSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }

  // const { rows: gameExists } = await connection.query(
  //   `SELECT * FROM games WHERE LOWER(name) = '${req.body.name.toLowerCase()}'`
  // );

  if (categoryExists.length > 0) {
    return res.sendStatus(409);
  }

  next();
}

export default validateGameSchema;
