import connection from "../../database/db.js";
import createCategorySchema from "../../schemas/categorySchema.js";

async function validateCategoySchema(req, res, next) {
  const { name } = req.body;

  const { error } = createCategorySchema.validate(
    { name },
    {
      abortEarly: false,
    }
  );

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }

  const { rows: categoryExists } = await connection.query(
    `SELECT * FROM categories WHERE LOWER(name) = LOWER($1);`,
    [name]
  );

  if (categoryExists.length > 0) {
    return res.sendStatus(409);
  }

  next();
}

export default validateCategoySchema;
