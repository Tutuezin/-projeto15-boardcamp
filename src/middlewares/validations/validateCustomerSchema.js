import createCustomerSchema from "../../schemas/customerSchema.js";

async function validateCustomerSchema(req, res, next) {
  const { error } = createCustomerSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const messageError = error.details.map((item) => item.message);
    return res.status(422).send(messageError);
  }

  next();
}

export default validateCustomerSchema;
