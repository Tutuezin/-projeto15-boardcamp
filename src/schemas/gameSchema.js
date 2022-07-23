import joi from "joi";

const createGameSchema = joi.object({
  name: joi.string().required(),
  image: joi
    .string()
    .regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)
    .required(),
  stockTotal: joi.number().min(1).required(),
  categoryId: joi.number().required(),
  pricePerDay: joi.number().min(1).required(),
});

export default createGameSchema;
