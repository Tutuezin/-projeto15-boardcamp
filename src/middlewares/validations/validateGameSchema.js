import connection from "../../database/db.js";
import createGameSchema from "../../schemas/gameSchema.js";

async function validateGameSchema(req, res, next) {
  const { name, categoryId } = req.body;

  //JOI
  const { error } = createGameSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }

  //VALIDATIONS
  const { rows: gameExists } = await connection.query(
    `SELECT * FROM games 
    WHERE LOWER(name) = LOWER($1)
    `,
    [name]
  );

  if (gameExists.length > 0) {
    return res.status(409).send("JOGO JA EXISTE");
  }

  const { rows: categoriesExists } = await connection.query(
    `
    SELECT * FROM categories
    WHERE id = $1
    `,
    [categoryId]
  );

  if (categoriesExists.length === 0) {
    return res.status(409).send("CATEGORIA N EXISTE");
  }

  next();
}

export default validateGameSchema;
