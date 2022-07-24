import connection from "../../database/db.js";
import createCostumerSchema from "../../schemas/costumerSchema.js";

async function validateCostumerSchema(req, res, next) {
  const { error } = createCostumerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }

  next();
}

export default validateCostumerSchema;
